import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { MenuItem } from '@/utils/menu'

export const useRoleStore = defineStore('role', () => {
  // state
  const role = ref<string[]>([])
  /** 动态菜单树，由路由守卫加载完路由后构建 */
  const menus = ref<MenuItem[]>([])
  // actions
  function setRole(newVal: string[]): void {
    role.value = newVal
  }
  function setMenus(newMenus: MenuItem[]): void {
    menus.value = newMenus
  }
  return { role, menus, setRole, setMenus }
})
