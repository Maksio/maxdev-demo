import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css';
import 'normalize.css';
import "@fontsource/poppins";
import { createPinia } from "pinia";

createApp(App).use(createPinia()).use(router).use(ElementPlus).mount('#app')
