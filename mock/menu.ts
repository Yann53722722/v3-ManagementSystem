import { MockMethod } from 'vite-plugin-mock'
// import { getToken } from '../src/utils/auth' // 正常通过token获取，mock无需动态改变，故注释

export default [
  {
    url: '/system/getInfo',
    method: 'get',
    timeout: 1000,
    response: () => {
      return {
        code: 200,
        data: {
          userInfo: {},
          roles: ['admin'],
          permission: ['*:*:*']
        },
      }
    },
  },
  {
    url: '/system/getRouters',
    method: 'get',
    timeout: 1000,
    response: () => {
      // const token = getToken()
      return {
        code: 200,
        data: {
          account: {
            component: 'ParentView',
            title: '账户管理',
            children: {
              role: {
                component: 'account/role',
                title: '角色管理',
              },

              user: {
                component: 'account/user',
                title: '用户管理',
              },
            },
          },
          customer: {
            component: 'ParentView',
            title: '客户管理',
            children: {
              checkIn: {
                component: 'customer/checkIn',
                title: '入住管理',
              },
              order: {
                component: 'customer/order',
                title: '客户订单',
              },
            },
          },
          room: {
            component: 'ParentView',
            title: '客房管理',
            children: {
              roomStyle: {
                component: 'room/roomStyle',
                title: '房型管理',
              },
              roomInfo: {
                component: 'room/roomInfo',
                title: '房间管理',
              },
            },
          },
          system: {
            component: 'ParentView',
            title: '系统管理',
            children: {
              dictionary: {
                component: 'system/dictionary',
                title: '字典管理',
              },
              menu: {
                component: 'system/menu',
                title: '菜单管理',
              },
            },
          },
        },
      }
    },
  },
] as MockMethod[]
