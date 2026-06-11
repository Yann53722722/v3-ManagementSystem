import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useRoleStore = defineStore('role', () => {
  // state
  const role = ref<string[]>([])
  // actions
  function setRole(newVal: string[]): void {
    role.value = newVal
  }
  return { role, setRole }
})
