import ConfigProvider from "./ConfigProvider.vue";
import { withInstall } from '@sj-element/utils'

export const SjConfigProvider = withInstall(ConfigProvider)

export * from './types'
export * from './hooks'
