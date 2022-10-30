import { createApp } from 'vue'
import 'ant-design-vue/dist/antd.css'

import App from './App.vue'
import router from './router'
import store from './store.ts'

import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(store)
app.mount('#app')
