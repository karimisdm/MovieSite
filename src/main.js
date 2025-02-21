import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'


const store = createPinia();

createApp(App).use(router).use(store).mount('#app')
