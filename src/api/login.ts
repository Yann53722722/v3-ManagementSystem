import { post } from '@/utils/request' // 注意使用具名导入，使用封装的方法
import { encrypt } from '@/utils/forgeEncrypt'

// 登录接口的参数类型
export interface LoginData {
  userId: string
  password: string
}
// 登录接口返回的数据类型
export interface LoginResponse {
  token: string
}

// 登录接口
export const login = (data: LoginData): Promise<LoginResponse> => {
  data.password = encrypt(data.password) // 加密密码
  return post<LoginResponse>('/api/login', data)
}

// 登出接口，不需要传参，后端根据token识别用户身份并进行登出处理
export const logout = (): Promise<void> => {
  return post<void>('/api/logout')
}
