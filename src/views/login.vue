<template>
  <div class="login">
    <div class="box">
      <h2>酒店系统管理平台</h2>
      <el-form ref="formRef" :model="ruleForm" :rules="rules" label-width="auto">
        <el-form-item label="账号" prop="userId">
          <el-input v-model="ruleForm.userId" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(formRef)">登录</el-button>
          <el-button @click="resetForm(formRef)">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup lang="ts">
// 导入Vue3的reactive和ref函数，以及Element Plus的FormInstance和FormRules类型
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import { ElLoading } from 'element-plus'
import { login } from '@/api/login'

// 定义路由实例
const router = useRouter()
// 定义一个ref来引用表单实例
const formRef = ref<FormInstance>()
// 定义一个reactive对象来存储表单数据
const ruleForm = reactive({
  userId: '', // 账号，admin
  password: '', // 密码，123456
})
// 验证账号
const validateLoginId = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('请输入账号'))
  } else {
    callback()
  }
}
// 验证密码
const validatePassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    callback()
  }
}
// 定义表单验证规则
const rules = reactive<FormRules<typeof ruleForm>>({
  password: [{ validator: validatePassword, trigger: 'blur' }],
  userId: [{ validator: validateLoginId, trigger: 'blur' }],
})
// 登录按钮，提交表单
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      // 全屏加载
      const loading = ElLoading.service({
        lock: true,
        text: '登录中...',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      login({ userId: ruleForm.userId, password: ruleForm.password })
        .then((res) => {
          loading.close()
          console.log('res:', res)
          router.push('/index')
        })
        .catch((err) => {
          loading.close()
          console.log('err:', err)
        })
    } else {
      console.log('登录失败!')
    }
  })
}
// 取消按钮，重置表单
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
<style scoped lang="scss">
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(45deg, skyblue, #1e90ff, skyblue);
  display: flex;
  justify-content: center;
  align-items: center;
  .box {
    width: 400px;
    height: 200px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
    padding: 16px;
    h2 {
      line-height: 1;
      text-align: center;
      margin-bottom: 16px;
    }
  }
}
:deep(.el-loading-mask) {
  position: absolute;
}
</style>
