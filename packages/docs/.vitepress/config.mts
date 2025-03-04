import { defineConfig } from 'vitepress'
import {
  containerPreview,
  componentPreview,
} from "@vitepress-demo-preview/plugin";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Sj-Element",
  description: "组件库",
  // github域名后跟base 
  base:"/sj-element/",
  appearance:false,//明暗主题的切换开关
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [//右上角
      { text: '快速开始', link: '/get-started' },
      { text: "组件", link: "/components/button" }
    ],
    search: {
      provider: "local",//搜索框
    },
    sidebar: [//左侧导航
      {
        text: "指南",
        collapsed: false,
        items: [{ text: "快速开始", link: "/get-started" }],
      },
      {
        text: "基础组件",
        collapsed: false,
        items: [{ text: "Button 按钮", link: "components/button" }],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/qingkongyiheQAQ/sj-element' }
    ]
  },
  markdown: {
    config: (md) => {
      md.use(containerPreview);
      md.use(componentPreview);
    },
  },
})
