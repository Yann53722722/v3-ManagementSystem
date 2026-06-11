import Layout from '@/views/index.vue'
import type { RouteRecordRaw, Router } from 'vue-router'

interface RouteNode {
  component: string
  title: string
  children?: Record<string, RouteNode>
}

// 使用 Vite 的 glob 预加载所有视图组件（解决动态 import 多层路径问题）
const viewModules = import.meta.glob('/src/views/**/*.vue')

// 将接口返回的路由列表转换为真实路由
export const generateRoutes = (routes: Record<string, RouteNode>, router: Router) => {
  for (const key in routes) {
    const routeNode = routes[key]
    if (!routeNode) continue
    if (routeNode.children) {
      generateRoutes(routeNode.children, router)
    }
    if (routeNode.component !== 'ParentView') {
      const [pathParent, pathChild] = routeNode.component.split('/')
      const componentPath = `/src/views/${routeNode.component}.vue`
      const componentLoader = viewModules[componentPath]
      if (!componentLoader) {
        console.warn(`未找到视图组件: ${componentPath}`)
        continue
      }
      const loadRoute: RouteRecordRaw = {
        path: `/${pathParent}`,
        component: Layout,
        children: [
          {
            path: pathChild as string,
            component: componentLoader,
            meta: {
              title: routeNode.title,
            },
          },
        ],
      }
      console.log('add route:' + routeNode.title)
      router.addRoute(loadRoute)
    }
  }
  return
}
