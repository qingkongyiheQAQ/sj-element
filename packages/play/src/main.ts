import { createApp } from 'vue'
import 'sj-element/dist/index.css'
import App from './App.vue'
import SjElement,{en} from 'sj-element'
import 'sj-element/dist/index.css'
const app = createApp(App)
// app.config.globalProperties.$message = app.config.globalProperties.$message;
app.use(SjElement,{locale: en }).mount('#app')

console.log("Global Properties:", app.config.globalProperties);