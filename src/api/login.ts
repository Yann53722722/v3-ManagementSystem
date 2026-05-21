import request from '@/utils/request'

// 登录接口的参数类型
export interface LoginData {
  userId: string
  password: string
}
// 登录接口
export const login = (data: LoginData) => {
  return request.post('/api/login', data)
}
