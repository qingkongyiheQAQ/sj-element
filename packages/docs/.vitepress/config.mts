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
    nav: [
      { text: "开始使用", link: "/get-started" },
      { text: "组件", link: "/components/button" },
    ],
    search: {
      provider: "local",
    },
    sidebar: [
      {
        text: "指南",
        collapsed: false,
        items: [{ text: "快速开始", link: "/get-started" }],
      },
      {
        text: "基础组件",
        collapsed: false,
        items: [
          { text: "Button 按钮", link: "components/button" },
          { text: "Collapse 折叠面板", link: "components/collapse" },
          { text: "Dropdown 下拉菜单", link: "components/dropdown" },
        ],
      },
      {
        text: "反馈组件",
        collapsed: false,
        items: [
          { text: "Alert 提示", link: "components/alert" },
          { text: "Message 消息提示", link: "components/message" },
          { text: "Popconfirm 气泡确认框", link: "components/popconfirm" },
          { text: "Tooltip 文字提示", link: "components/tooltip" },
        ],
      }
    ],
    socialLinks: [
      { icon: "github", link: "https://qingkongyiheqaq.github.io/sj-element/" },
    ],
  },
  markdown: {
    config: (md) => {
      md.use(containerPreview);
      md.use(componentPreview);
    },
  },
})
