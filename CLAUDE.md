# 酒店管理系统 (Hotel Management System) - 前端项目规范

## 技术栈
- Vue 3 (Composition API + `<script setup>` 语法)
- TypeScript (严格模式)
- Pinia (状态管理)
- Vite (构建工具)
- Vue Router (路由)
- Element Plus (UI组件库，ToB风格)

## 项目结构

```
v3-project/
├── public/                    # 静态资源（不经过构建处理）
│   └── favicon.ico
├── mock/                      # Mock 数据（本地开发模拟接口）
│   ├── auth.ts                #   认证相关 mock
│   └── menu.ts                #   菜单数据 mock
├── types/                     # 全局类型声明（自动生成）
│   ├── auto-imports.d.ts      #   unplugin-auto-import 类型
│   └── components.d.ts        #   组件库注册类型
├── src/                       # 项目源码
│   ├── api/                   # API 请求层
│   │   ├── login.ts           #   登录相关接口
│   │   └── menu.ts            #   菜单相关接口
│   ├── assets/                # 静态资源（经过构建处理）
│   │   └── style.css          #   全局样式
│   ├── components/            # 通用组件
│   │   ├── Breadcrumb.vue     #   面包屑导航
│   │   ├── Menu.vue           #   侧边菜单
│   │   └── TopMenu.vue        #   顶部菜单
│   ├── router/                # 路由配置
│   │   └── index.ts           #   路由定义及权限守卫
│   ├── stores/                # Pinia 状态管理
│   │   └── auth.ts            #   认证状态（用户/token/菜单）
│   ├── utils/                 # 工具函数
│   │   ├── auth.ts            #   认证工具（token 存取）
│   │   ├── forgeEncrypt.ts    #   Forge 加密工具
│   │   ├── jsencrypt.ts       #   JSEncrypt 加密工具
│   │   ├── menu.ts            #   菜单数据处理工具
│   │   └── request.ts         #   Axios 请求封装（拦截器）
│   ├── views/                 # 页面视图
│   │   ├── account/           #   账号管理模块
│   │   │   ├── role.vue       #     角色管理
│   │   │   └── user.vue       #     用户管理
│   │   ├── customer/          #   客户管理模块
│   │   │   ├── checkIn.vue    #     入住登记
│   │   │   └── order.vue      #     订单管理
│   │   ├── room/              #   房态管理模块
│   │   │   ├── roomInfo.vue   #     房间信息
│   │   │   └── roomStyle.vue  #     房型管理
│   │   ├── system/            #   系统管理模块
│   │   │   ├── dictionary.vue #     数据字典
│   │   │   └── menu.vue       #     菜单管理
│   │   ├── user/              #   个人中心模块
│   │   │   ├── profile.vue    #     个人信息
│   │   │   └── settings.vue   #     个人设置
│   │   ├── home.vue           #   首页/仪表盘
│   │   ├── index.vue          #   布局容器（侧边栏+顶栏+主内容区）
│   │   └── login.vue          #   登录页
│   ├── App.vue                # Vue 根组件
│   └── main.ts                # 应用入口
├── .env.development           # 开发环境变量
├── .env.production            # 生产环境变量
├── index.html                 # HTML 入口模板
├── vite.config.ts             # Vite 构建配置
├── tsconfig.json              # TypeScript 根配置
├── tsconfig.app.json          # TypeScript 应用配置
├── tsconfig.node.json         # TypeScript Node 配置
└── package.json               # 依赖与脚本
```

## 代码规范（AI必须遵守）
1. **Vue组件**：强制使用 `<script setup lang="ts">`，禁止 `export default { ... }` 写法。
2. **命名**：
   - 组件名：PascalCase (例如 `RoomTable.vue`)
   - 文件名：kebab-case (例如 `room-table.vue`，但组件文件保持PascalCase)
   - 变量/函数：camelCase
   - 常量：UPPER_SNAKE_CASE
   - 类型/接口：PascalCase，接口名前不加 `I`
3. **TypeScript**：
   - 禁止使用 `any`；未知类型使用 `unknown` 配合类型守卫。
   - 所有函数必须明确参数和返回值类型。
   - Props 和 Emits 必须使用 `defineProps<T>()` 和 `defineEmits<T>()` 泛型语法。
4. **Pinia Store**：
   - 使用 `defineStore` 和 `setup` 语法（与Composition API一致）。
   - 所有状态必须显式声明类型。
   - 异步操作放在 `actions` 中，使用 `async/await`。
5. **API 请求**：
   - 所有API调用必须在 `api/modules/` 下定义函数，组件中直接导入调用。
   - 使用统一的 `request` 实例（已配置拦截器处理token和错误）。
   - API函数返回 `Promise<T>`，T为业务数据格式（不含code/message等外层）。
6. **样式**：
   - 使用 `<style scoped lang="scss">`。
   - 全局变量定义在 `styles/variables.scss`。
   - 优先使用Element Plus的CSS变量，避免硬编码颜色。
7. **路由**：
   - 动态路由权限在 `router/permission.ts` 中统一处理。
   - 路由meta必须包含 `title` 和 `requiresAuth`。

## 常用命令
- `npm run dev`：启动开发服务器
- `npm run build`：生产构建
- `npm run test`：运行Vitest单元测试
- `npm run lint`：ESLint检查
- `npm run format`：Prettier格式化

## 业务术语表（ToB酒店管理系统）
- **房型(Room Style)**：房间类别（标准间、大床房等），包含价格、床型、可住人数。
- **房间(Room Info)**：具体房间号，关联房型，有状态（空闲/入住/维修/预定）。
- **订单(Order)**：用户预订记录，包含入住/离店日期、房间号、订单状态（待付款/已确认/已入住/已完成/已取消）。
- **PMS**：物业管理系统，对接酒店前台业务。
- **渠道(Channel)**：订单来源（OTA直连、官网、线下）。

## 常见任务提示词模板（供AI参考）
- 新增一个表格页面：要求包含分页、搜索、新增/编辑弹窗、删除确认。使用Element Plus的`el-table`和`el-dialog`。
- 调用后端API：根据后端Swagger文档，在`api/modules/xxx.ts`中生成请求函数，并在组件中使用`try/catch`处理loading和错误。
- 写组合式函数：例如`useTable`封装分页和查询逻辑。