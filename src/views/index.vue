<template>
  <div class="index">
    <div class="left">
      <h2>
        <el-icon><Memo /></el-icon><span>酒店管理系统</span>
      </h2>
      <Menu />
    </div>
    <div class="right">
      <div class="topbar">
        <Breadcrumb />
        <TopMenu />
      </div>
      <div class="content">
        <router-view :key="$route.path" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Breadcrumb from '@/components/Breadcrumb.vue'
import Menu from '@/components/Menu.vue'
import TopMenu from '@/components/TopMenu.vue'
</script>
<style scoped lang="scss">
.index {
  height: 100vh;
  width: 100vw;
  display: flex;
  padding: 8px;
  color: #111;
  .left,
  .right {
    border-radius: 20px;
    overflow: hidden;
  }
  .left {
    width: 240px;
    min-width: 240px;
    background-color: #0c4a6e;
    margin-right: 8px;
    padding: 0 4px;
    h2 {
      height: 60px;
      line-height: 1;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px dashed #fff;
    }
  }
  .right {
    flex: 1;
    background-color: #f0f0f0;
    display: flex;
    flex-direction: column;
    min-width: 800px;
    .topbar {
      height: 60px;
      line-height: 60px;
      background-color: #0c4a6e;
      color: #f0f0f0;
      padding: 0 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .content {
      flex: 1;
      padding: 16px;
    }
  }
}
</style>
