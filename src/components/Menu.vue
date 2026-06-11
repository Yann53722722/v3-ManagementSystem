<template>
  <el-menu
    background-color="#0c4a6e"
    class="el-menu-vertical"
    text-color="#f0f0f0"
    active-text-color="#0ea5e9"
    :router="true"
    :default-active="route.path"
    unique-opened
  >
    <template v-for="item in menus" :key="item.routeKey">
      <!-- 有子菜单（父级分组） -->
      <el-sub-menu v-if="item.children?.length" :index="item.routeKey">
        <template #title>
          <el-icon><component :is="getIcon(item.routeKey)" /></el-icon>
          <span>{{ item.title }}</span>
        </template>
        <el-menu-item
          v-for="child in item.children"
          :key="child.routeKey"
          :index="child.path!"
        >
          <template #title>{{ child.title }}</template>
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { Discount, House, User, Setting } from '@element-plus/icons-vue'
import { useRoleStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import type { Component } from 'vue'

const route = useRoute()
const roleStore = useRoleStore()
const { menus } = storeToRefs(roleStore)

/** 菜单 routeKey → Element Plus 图标映射 */
const iconMap: Record<string, Component> = {
  account: Discount,
  room: House,
  customer: User,
  system: Setting,
}

function getIcon(routeKey: string): Component {
  return iconMap[routeKey] || Discount
}

</script>

<style scoped lang="scss">
.el-menu {
  border: none;
}
</style>
