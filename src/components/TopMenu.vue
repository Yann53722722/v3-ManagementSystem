<template>
  <div class="top-right-menu">
    <el-avatar src=""></el-avatar>
    <el-dropdown trigger="click" @command="handleCommand">
      <span @click="isCollapse = !isCollapse">
        <el-icon class="arrow-right-icon" :class="{ 'is-rotate': isCollapse }"
          ><arrow-down
        /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :icon="User" command="profile">个人中心</el-dropdown-item>
          <el-dropdown-item :icon="Setting" command="settings">设置</el-dropdown-item>
          <el-dropdown-item :icon="SwitchButton" command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup lang="ts">
import { User, Setting, SwitchButton } from '@element-plus/icons-vue'
import { ref } from 'vue'
let isCollapse = ref(false)

const handleCommand = (command: string) => {
  console.log('route to:' + command)
}
</script>
<style scoped lang="scss">
.top-right-menu {
  width: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-dropdown {
    color: #fff;
    .arrow-right-icon {
      display: inline-block;
      transition: transform 0.3s;
    }
    .is-rotate {
      transform: rotate(180deg);
    }
  }
}
</style>
