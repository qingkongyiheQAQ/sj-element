import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import SjElement,{en} from 'sj-element'
import 'sj-element/dist/index.css'

createApp(App).use(SjElement,{locale: en }).mount('#app')
