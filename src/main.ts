import {createApp} from 'vue'
import './style/index.css'
import App from './App.vue'
import createUI from './components/index'
const app = createApp(App)
app.use(createUI)
app.mount('#app')
