import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from '@/utils/auth'
import Layout from '@/views/index.vue'

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
    },
    {
      path: '/index',
      component: Layout,
      children: [
        {
          path: '/',
          redirect: '/home',
        },
        {
          path: '/home',
          component: () => import('@/views/home.vue'),
        },
        {
          path: '/profile',
          component: () => import('@/views/user/profile.vue'),
        },
        {
          path: '/settings',
          component: () => import('@/views/user/settings.vue'),
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
    if (to.path === '/login') {
      return '/index' // 如果已登录并准备进入登录页，则重定向到主页
    } else {
      return // 否则正常导航
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
