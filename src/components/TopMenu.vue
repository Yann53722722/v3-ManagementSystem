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
import { removeToken } from '@/utils/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
let isCollapse = ref(false)

const handleCommand = (command: string) => {
  console.log('route to:' + command)
  switch (command) {
    case 'profile': // 路由到个人中心
    case 'settings': // 路由到设置页面
      router.replace('/' + command)
      break
    case 'logout':
      // 执行退出登录逻辑
      location.href = '/login'
      removeToken()
      break
  }
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
