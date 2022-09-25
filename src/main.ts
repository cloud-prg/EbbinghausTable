import {createApp} from 'vue'
import './style/index.css'
import App from './App.vue'
import createUI from './components/index'

// 导入Unocss
import 'uno.css'

const app = createApp(App)
app.use(createUI)
app.mount('#app')
