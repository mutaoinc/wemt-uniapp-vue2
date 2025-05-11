# @wemt/uniapp-vue2

基于 uni-app 和 Vue2 的快速开发框架

## 特性

- 基于 Vue2 和 uni-app
- 内置状态管理
- 支持 SCSS
- 支持 Vue2 和 Vue3 双版本

## 安装

```bash
npm install @wemt/uniapp-vue2
```

## 使用方法

### 1. 在 main.js 中引入

```javascript
import weremt from '@wemt/uniapp-vue2'
import store from '@wemt/uniapp-vue2/store'

// 使用 weremt
Vue.use(weremt)

// #ifndef VUE3
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    store,
    ...App
})
app.$mount()
// #endif
```

### 2. 在 App.vue 中引入样式

```vue
<style lang="scss">
/* 每个页面公共css */
@import '@wemt/uniapp-vue2/index.scss';
</style>
```

## 目录结构

```
├── components/     # 组件目录
├── modules/        # 模块目录
├── libraries/      # 库文件目录
├── style/          # 样式文件目录
├── index.js        # 入口文件
├── store.js        # 状态管理
├── mixins.js       # 混入文件
├── settings.js     # 配置文件
└── language.js     # 语言文件
```

## 依赖

- Vue 2.6.0+
- @dcloudio/uni-app 2.0.0+

## 许可证

MIT 