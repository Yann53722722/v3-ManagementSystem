import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from '@/utils/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: () => import('../views/login.vue'),
    },
    {
      path: '/index',
      component: () => import('../views/index.vue'),
    },
  ],
})

// 路由白名单，防止跳转死循环
const whiteList = ['/login', '/register', '/error']
// 全局前置路由守卫，未登录自动跳转到登录页
router.beforeEach((to, from, next) => {
  const token = getToken()
  console.log(token, '路由守卫：', to.path)
  if (token) {
    // 已登录
    if (to.path === '/login') {
      next('/index') // 如果已登录并准备进入登录页，则重定向到主页
    } else {
      next() // 否则正常导航
    }
  } else {
    // 未登录
    if (whiteList.includes(to.path)) {
      next() // 如果在白名单中，允许访问
    } else {
      next('/') // 否则重定向到登录页
      // next({path: '/', query: { redirect: to.fullPath } }) // 可选：将要访问的页面路径作为参数传到登录页，登录成功后可以用replace重定向到该页面
    }
  }
})

export default router
