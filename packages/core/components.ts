// core/components.ts 主要用于 全局组件注册，通常用于 Vue 组件库提供 install 方法时，批量注册所有组件。
import { SjButton, SjIcon,SjButtonGroup,SjCollapse,SjCollapseItem,SjAlert,SjTooltip,SjPopconfirm} from "../components"; 
import type {Plugin} from 'vue'
// Plugin[]表示一个 Vue 插件数组。 告诉 TS 这个[SjButton]数组是 Plugin[]
export default [SjButton,SjIcon,SjButtonGroup,SjCollapse,SjCollapseItem,SjAlert,SjTooltip,SjPopconfirm] as Plugin[];