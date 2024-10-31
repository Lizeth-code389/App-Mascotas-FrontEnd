import { createApp } from 'vue'
import ElemenPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/dist/index.css'
//import './style.css'
//estos estilos los puedes revisar pero se sobreponen a todo por qu estan en App

import App from './App.vue'
import router from './router'

createApp(App).mount('#app')


const app = createApp(App) 

app.use(router)
app.use(ElemenPlus)
app.mount('#app') 




