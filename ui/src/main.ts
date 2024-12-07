import './style.css'
import 'primeicons/primeicons.css'
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import primevue from './plugins/primevue'
import ToastService from 'primevue/toastservice'

createApp(App).use(router).use(createPinia()).use(ToastService).use(primevue).mount('#app')
