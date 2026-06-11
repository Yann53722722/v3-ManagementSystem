<template>
  <div class="top-left">
    <!-- 暂时写死，后续改为动态加载 -->
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>一级菜单</el-breadcrumb-item>
      <el-breadcrumb-item>二级菜单</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
</script>
<style scoped lang="scss">
.top-left {
  flex: 1;
  .el-breadcrumb {
    --el-text-color-regular: #f0f0f0;
    --el-text-color-primary: #0ea5e9;
    --el-text-color-placeholder: #f0f0f0;
  }
}
</style>
