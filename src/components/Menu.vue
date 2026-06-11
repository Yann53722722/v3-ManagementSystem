<template>
  <!-- 暂时写死，后续改为动态加载 -->
  <el-menu
    background-color="#0c4a6e"
    class="el-menu-vertical"
    text-color="#f0f0f0"
    active-text-color="#0ea5e9"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><Discount /></el-icon>
        <span>账户管理</span>
      </template>
      <el-menu-item index="1-1" @click ="$router.push('/account/user')">用户管理</el-menu-item>
      <el-menu-item index="1-2" @click="$router.push('/account/role')">角色管理</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><House /></el-icon>
        <span>客房管理</span>
      </template>
      <el-menu-item index="2-1" @click="$router.push('/room/roomStyle')">房型管理</el-menu-item>
      <el-menu-item index="2-2" @click="$router.push('/room/roomInfo')">房间管理</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        <el-icon><User /></el-icon>
        <span>客户管理</span>
      </template>
      <el-menu-item index="3-1" @click="$router.push('/customer/checkIn')">入住管理</el-menu-item>
      <el-menu-item index="3-2" @click="$router.push('/customer/order')">客户订单</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="4">
      <template #title>
        <el-icon><Setting /></el-icon>
        <span>系统管理</span>
      </template>
      <el-menu-item index="4-1" @click="$router.push('/system/menu')">菜单管理</el-menu-item>
      <el-menu-item index="4-2" @click="$router.push('/system/dictionary')">字典管理</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>
<script setup lang="ts">
import { Discount } from '@element-plus/icons-vue'

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
<style scoped lang="scss">
.el-menu {
  border: none;
}
</style>
