import request from '@/utils/request'
import { encrypt } from '@/utils/forgeEncrypt'

// 登录接口的参数类型
export interface LoginData {
  userId: string
  password: string
}
// 登录接口
export const login = (data: LoginData) => {
  data.password = encrypt(data.password) // 加密密码
  return request.post('/api/login', data)
}
