---
search: false
next:
  link: /components/button
  text: Button 按钮
---

# 最新 Vue3 + TS 高仿 ElementPlus 打造自己的组件库

## 安装

```bash
npm i @sj-element --save
```

## 开始使用

**全局使用**

```js
// 引入所有组件
import SjUI from "sj-element";
// 引入样式
import "sj-element/dist/index.css";

import App from "./App.vue";
// 全局使用
createApp(App).use(SjElement).mount("#app");
```

```vue
<template>
  <sj-button>我是 Button</sj-button>
</template>
```

**单个导入**

sj-element 提供了基于 ES Module 的开箱即用的 Tree Shaking 功能。

```vue
<template>
  <sj-button>我是 Button</sj-button>
</template>
<script>
import { SjButton } from " sj-element";
export default {
  components: { SjButton },
};
</script>
```


<!-- ::: preview
api-table src=components/Button/types.ts
::: -->

## 亮点

::: details

使用 Vite + Vitest + Vitepress 构建工具链，支持快速开发与测试。
monorepo 分包管理，简化多包管理。
GitHub Actions 实现 CI/CD 自动化部署。
大模型辅助开发：利用大模型进行需求分析、设计思路构建与组件实现，提升开发效率。
发布开箱即用的 npm 包，简化用户使用流程。
  :::
