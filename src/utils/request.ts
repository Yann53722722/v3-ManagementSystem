import axios from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
  Axios,
} from 'axios'

import { getToken, removeToken } from './auth'
import { ElLoading, ElMessage } from 'element-plus'

let loadingInstance: ReturnType<typeof ElLoading.service> | null = null

// xinhua-h5源码：判断环境
// const url = window.decodeURIComponent(location.search);
// if (url == "?id=sit") {
//   console.log("这是" + url.slice(4) + "环境")
// } else if (url == "?id=uat") {
//   console.log("这是" + url.slice(4) + "环境")
// }

// 初始化一个axios实例
const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // 基础URL，来自环境变量
  timeout: 5000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=UTF-8', // 设置请求头
  },
  withCredentials: true, // 跨域携带 cookie
})

// ex1.定义额外参数接口（扩展config, 控制loadin、是否取消重复请求）
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  showLoading?: boolean // 是否显示加载动画
  cancelDuplicate?: boolean // 是否取消重复请求
  // 其他自定义参数...retry、retryDelay等
}
// ex2.1.管理取消请求的Map
const pendingRequestsMap = new Map<string, CancelTokenSource>()
// ex2.2.生成请求唯一key（根据method、url、params、data）
function generateReqKey(config: AxiosRequestConfig): string {
  const { method, url, params, data } = config
  return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&')
}
// ex2.3.添加待处理请求
// 将请求对应的{请求唯一key，cancel令牌}键值对添加到Map中
function addPendingRequest(config: AxiosRequestConfig) {
  const requestKey = generateReqKey(config) // 生成请求对应的唯一Key
  const source = axios.CancelToken.source() // 生成取消令牌
  config.cancelToken = source.token // 将取消令牌添加到请求的config中
  if (!pendingRequestsMap.has(requestKey)) {
    pendingRequestsMap.set(requestKey, source) // 存储到Map中,key是请求唯一Key，value是取消令牌
  }
}
// ex2.4.移除并取消已有请求（用于重复请求时）
// 将请求对应先取消，然后再将对应的{请求唯一key，cancel令牌}键值对从Map中移除
function removeAndCancelPendingRequest(config: AxiosRequestConfig) {
  const requestKey = generateReqKey(config) // 生成请求对应的唯一Key
  const source = pendingRequestsMap.get(requestKey) // 从Map中获取对应的取消令牌
  if (source) {
    source.cancel(`重复请求已取消: ${requestKey}`) // 取消请求
    pendingRequestsMap.delete(requestKey) // 从Map中移除该请求
  }
}

// // ex3.清除所有待处理请求（例如路由跳转时）
// export function clearPendingRequests() {
//   pendingRequestsMap.forEach((source, key) => {
//     source.cancel(`路由跳转取消请求: ${key}`);
//   });
//   pendingRequestsMap.clear();
// }

// 请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const customConfig = config as CustomAxiosRequestConfig // 将config断言为CustomAxiosRequestConfig类型，以访问自定义参数
    if (customConfig.showLoading) {
      // 发送请求，开启加载
      loadingInstance = ElLoading.service({
        lock: true,
        text: '加载中...',
        background: 'rgba(0, 0, 0, 0.7)',
      })
    }
    // 处理重复请求
    if (customConfig.cancelDuplicate !== false) {
      removeAndCancelPendingRequest(config) // 先取消并从Map中移除上一个相同请求
      addPendingRequest(config) // 添加当前请求到待处理请求Map中
    }
    // 是否需要token
    const isToken: boolean = config.headers?.isToken === false
    if (getToken() && !isToken) {
      // 获取token
      config.headers.Authorization = `Bearer ${getToken()}`
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const config = response.config as CustomAxiosRequestConfig
    if (config.showLoading) {
      // 请求成功，关闭加载
      loadingInstance?.close()
    }
    // 请求完成，从pending Map中移除
    const requestKey = generateReqKey(config)
    pendingRequestsMap.delete(requestKey)
    // 统一处理响应数据
    const { code, msg, data } = response.data
    if (code === 200) {
      // 成功，剥离外层包装，直接返回业务数据data
      console.log('拦截resolve', data)
      return data
    } else if (code === 401) {
      // token过期或无效，重置token并刷新页面
      removeToken()
      // Toast.fail('登录状态已过期，请重新登录')
      ElMessage.error('登录状态已过期，请重新登录')
      window.location.href = '/login'
      return Promise.reject(new Error('登录状态已过期，请重新登录'))
    } else {
      ElMessage.error(msg || '请求失败')
      console.log('拦截reject', msg)
      return Promise.reject(response.data)
    }
  },
  (error) => {
    const config = error.config as CustomAxiosRequestConfig
    if (config.showLoading) {
      // 请求失败，关闭加载
      loadingInstance?.close()
    }
    // 请求出错时，也从pending Map中移除
    if (config) {
      const requestKey = generateReqKey(config)
      pendingRequestsMap.delete(requestKey)
    }
    console.log('拦截error', error)
    let { message } = error
    if (message === 'Network Error') {
      message = '接口网络异常'
    } else if (message.includes('timeout')) {
      message = '接口请求超时'
    } else if (message.includes('Request failed with status code')) {
      message = `接口${message.substr(message.length - 3)}异常`
    }
    if (axios.isCancel(error)) {
      // 取消请求，不提示错误
      console.warn('请求已取消:', error.message)
    } else {
      // 错误提示弹框，20毫秒后显示，避免和加载动画冲突
      setTimeout(() => {
        ElMessage.error(message || '请求失败')
      }, 20)
    }
    return Promise.reject(error)
  },
)

// 3.0.封装基础请求方法（支持泛型）
function request<T = any>(config: CustomAxiosRequestConfig): Promise<T> {
  // 拦截器已经处理了响应数据并提取出了data，所以这里断言为Promise<T>类型即可
  return instance(config) as Promise<T>
}

// 3.1.get请求方法，接受URL和可选的参数对象（get获取资源）
export function get<T = any>(
  url: string,
  params?: object,
  options?: Omit<CustomAxiosRequestConfig, 'url' | 'method' | 'params'>,
): Promise<T> {
  return request<T>({
    url,
    method: 'GET',
    params,
    ...options,
  })
}
// 3.2.post请求方法，接受URL和可选的参数对象（post创建资源）
export function post<T = any>(
  url: string,
  data?: object,
  options?: Omit<CustomAxiosRequestConfig, 'url' | 'method' | 'data'>,
): Promise<T> {
  return request<T>({
    url,
    method: 'POST',
    data,
    ...options,
  })
}
// 3.3.put请求方法，接受URL和可选的参数对象（put更新完整资源）
export function put<T = any>(
  url: string,
  data?: object,
  options?: Omit<CustomAxiosRequestConfig, 'url' | 'method' | 'data'>,
): Promise<T> {
  return request<T>({
    url,
    method: 'PUT',
    data,
    ...options,
  })
}
// 3.4.delete请求方法，接受URL和可选的参数对象（delete删除资源）
export function del<T = any>(
  url: string,
  params?: object,
  options?: Omit<CustomAxiosRequestConfig, 'url' | 'method' | 'params'>,
): Promise<T> {
  return request<T>({
    url,
    method: 'DELETE',
    params,
    ...options,
  })
}

export default instance
