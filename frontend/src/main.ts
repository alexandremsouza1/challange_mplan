import { createApp } from 'vue'
import { createPinia } from 'pinia';
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import i18n from "./config/i18n";

import './assets/main.css'
import "element-plus/theme-chalk/index.css";
import ptBR from "element-plus/es/locale/lang/pt-br";

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)
app.use(ElementPlus, { locale: ptBR });
app.use(i18n);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(pinia)
app.mount('#app')
