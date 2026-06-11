import { get } from '@/utils/request' // 注意使用具名导入，使用封装的方法

interface RouteNode {
  component: string
  title: string
  children?: Record<string, RouteNode>
}

// 获取用户可访问的菜单列表
export const getRouters = (): Promise<Record<string, RouteNode>> => {
  return get<Record<string, RouteNode>>('/system/getRouters')
}

export interface getInfoResponse {
  roles: string[]
  permission: string[]
}

// 获取用户信息
export const getInfo = (): Promise<getInfoResponse> => {
  return get<getInfoResponse>('/system/getInfo')
}
