import { createApp } from 'vue'
import 'sj-element/dist/index.css'
import App from './App.vue'
import SjElement,{ zhCn } from 'sj-element'

const app = createApp(App)
// app.config.globalProperties.$message = app.config.globalProperties.$message;
app.use(SjElement,{ locale: zhCn }).mount('#app')

// console.log("Global Properties:", app.config.globalProperties);