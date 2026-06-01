import { MockMethod } from 'vite-plugin-mock'
import { decrypt } from '../src/utils/forgeEncrypt'
import { getToken, removeToken } from '../src/utils/auth'

export default [
  {
    // 登录
    url: '/api/login',
    method: 'post',
    timeout: 1000, // 模拟网络延迟
    response: ({ body }: { body: { userId: string; password: string } }) => {
      const { userId, password } = body
      const decryptedPassword = decrypt(password)
      if (userId === 'admin' && decryptedPassword === '123456') {
        return {
          code: 200,
          data: {
            token: new Date().getTime().toString(), // 模拟生成一个token
          },
        }
      } else {
        return {
          code: 500,
          msg: '账号或密码错误',
        }
      }
    },
  },
  {
    // 登出
    url: '/api/logout',
    method: 'post',
    timeout: 500,
    response: () => {
      if (getToken()) {
        removeToken() // 移除token
        return {
          code: 200,
          msg: '登出成功',
        }
      } else {
        return {
          code: 401,
          msg: '未登录',
        }
      }
    },
  },
] as MockMethod[]
