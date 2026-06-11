import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from '@/utils/auth'
import { getRouters, getInfo } from '@/api/menu'
import { useRoleStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import Layout from '@/views/index.vue'
import { generateRoutes, buildMenuTree } from '@/utils/menu'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 静态路由，无需判断权限就能访问
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: () => import('@/views/login.vue'),
      meta: { title: '登录' },
    },
    {
      path: '/index',
      component: Layout,
      redirect: '/index/home',
      children: [
        {
          path: 'home',
          component: () => import('@/views/home.vue'),
          meta: { title: '主页' },
        },
        {
          path: 'profile',
          component: () => import('@/views/user/profile.vue'),
          meta: { title: '个人资料' },
        },
        {
          path: 'settings',
          component: () => import('@/views/user/settings.vue'),
          meta: { title: '设置' },
        },
      ],
    },
  ],
})

// 路由白名单，防止跳转死循环
const whiteList = ['/login', '/register', '/error']
// 全局前置路由守卫，未登录自动跳转到登录页
router.beforeEach((to, from) => {
  const token = getToken()
  console.log(token, '路由守卫：', to.path)
  if (token) {
    // 已登录
    const roleStore = useRoleStore()
    const { role } = storeToRefs(roleStore)
    const { setRole } = roleStore
    if (!role.value.length) {
      // 未拉取过用户信息，发请求获取登录用户信息
      return getInfo()
        .then((data) => {
          // 存储登录用户信息
          setRole(data.roles)
          // 获取路由并动态添加
          return getRouters().then((routes) => {
            generateRoutes(routes, router)
            // 构建菜单树并存储，供侧边栏动态渲染
            const menuTree = buildMenuTree(routes)
            roleStore.setMenus(menuTree)
            // 动态路由已添加，重试导航到目标路由（解决刷新白屏）
            return to.fullPath
          })
        })
        .catch(() => {
          return '/error'
        })
    } else {
      if (to.path === '/login') {
        return '/index' // 如果已登录并准备进入登录页，则重定向到主页
      } else {
        return // 否则正常导航
      }
    }
  } else {
    // 未登录
    if (whiteList.includes(to.path)) {
      return // 如果在白名单中，允许访问
    } else {
      return '/' // 否则重定向到登录页
      // next({path: '/', query: { redirect: to.fullPath } }) // 可选：将要访问的页面路径作为参数传到登录页，登录成功后可以用replace重定向到该页面
    }
  }
})

export default router
