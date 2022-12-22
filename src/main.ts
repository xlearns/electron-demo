import { createApp } from 'vue'
import './style.css'
import "./assets/style/emoji.scss";
import App from './App.vue'
import Router from './router/index'
import { store } from './store/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "./assets/style/index.scss";

const app = createApp(App)
app.use(Router)
app.use(store)
app.use(ElementPlus)
app.mount('#app')
