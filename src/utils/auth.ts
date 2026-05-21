import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const ExpiresInKey = 'Admin-Expires-In'

// 设置token，并设置过期时间，过期时间单位为秒
export function setToken(token: string, time: number): void {
  Cookies.set(TokenKey, token)
  Cookies.set(ExpiresInKey, new Date(Date.now() + time * 1000).toISOString())
  return
}

// 获取token
export function getToken(): string | undefined {
  return Cookies.get(TokenKey)
}

// 获取token过期时间
export function getTokenExpireTime(): string | undefined {
  return Cookies.get(ExpiresInKey)
}

// 移除token,并清除过期时间
export function removeToken(): void {
  Cookies.remove(TokenKey)
  Cookies.remove(ExpiresInKey)
  return
}
