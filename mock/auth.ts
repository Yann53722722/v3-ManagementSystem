import { MockMethod } from 'vite-plugin-mock'
import { decrypt } from '../src/utils/forgeEncrypt'

export default [
  {
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
] as MockMethod[]
