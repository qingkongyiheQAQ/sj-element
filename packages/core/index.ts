//  管理和注册组件库的所有核心功能
import components from './components'
import makeInstaller from './makeInstaller'
import '@sj-element/theme/index.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from "@fortawesome/free-solid-svg-icons"
import printLogo from './printLogo'

printLogo()

library.add(fas)
// 这样 Vue 可以 app.use(installer) 来一次性安装所有组件
const installer=makeInstaller(components)


// 批量导出所有组件，让用户可以按需引入：
export * from '@sj-element/components'
export * from '@sj-element/locale'
// 默认导出 installer，支持 app.use(组件库) 形式安装所有组件：
export default installer;