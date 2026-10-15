import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { installReveal } from './reveal'
import '@/assets/styles/main.css'

const app = createApp(App)
app.use(router)
installReveal(app)
app.mount('#app')
