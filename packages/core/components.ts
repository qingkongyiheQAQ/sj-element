// core/components.ts 主要用于 全局组件注册，通常用于 Vue 组件库提供 install 方法时，批量注册所有组件。 通过use注册到Vue实例中 这样就可以直接不用引入组件就可以使用了
import { SjButton, SjIcon,SjButtonGroup,SjCollapse,SjCollapseItem,SjAlert,SjTooltip,SjPopconfirm,SjDropdown,SjDropdownItem,SjConfigProvider} from "../components"; 
import type {Plugin} from 'vue'
// Plugin[]表示一个 Vue 插件数组。 告诉 TS 这个[SjButton]数组是 Plugin[]
export default [SjButton,SjIcon,SjButtonGroup,SjCollapse,SjCollapseItem,SjAlert,SjTooltip,SjPopconfirm,SjDropdown,SjDropdownItem,SjConfigProvider] as Plugin[];