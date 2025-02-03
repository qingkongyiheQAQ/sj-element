import { SjButton } from "../components"; 
import type {Plugin} from 'vue'
// Plugin[]表示一个 Vue 插件数组。 告诉 TS 这个[SjButton]数组是 Plugin[]
export default [SjButton] as Plugin[];