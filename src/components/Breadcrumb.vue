<template>
  <div class="top-left">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbItems"
        :key="index"
        class="breadcrumb-static"
      >
        {{ item.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'
import { useRoleStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const route = useRoute()
const roleStore = useRoleStore()
const { menus } = storeToRefs(roleStore)

interface BreadcrumbItem {
  title: string
}

const breadcrumbItems = computed<BreadcrumbItem[]>(() => {
  const currentPath = route.path

  // 首页本身不追加额外的项
  if (currentPath === '/index/home' || currentPath === '/index') {
    return []
  }

  // 在菜单树中查找当前路由匹配的父级 → 子级
  for (const parent of menus.value) {
    if (!parent.children) continue
    for (const child of parent.children) {
      if (child.path === currentPath) {
        return [
          { title: parent.title }, // 父级分组（不可点击）
          { title: child.title },  // 当前功能
        ]
      }
    }
  }

  // 未在菜单树中匹配到，使用路由元信息中的 title
  const metaTitle = route.meta?.title
  if (metaTitle && typeof metaTitle === 'string') {
    return [{ title: metaTitle }]
  }

  return []
})
</script>

<style scoped lang="scss">
.top-left {
  flex: 1;
  :deep(.el-breadcrumb) {
    --el-text-color-regular: #f0f0f0;
    --el-text-color-primary: #0ea5e9;
    --el-text-color-placeholder: #f0f0f0;

    .breadcrumb-static .el-breadcrumb__inner {
      cursor: text;
    }
  }
}
</style>
