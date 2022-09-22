import {createApp} from 'vue'
import './style/index.css'
import App from './App.vue'
import createUI from './components/index'
import dayjs from 'dayjs' // 导入本地化语言
import 'dayjs/locale/zh-cn' // 导入本地化语言
dayjs.locale('zh-cn')

const app = createApp(App)
app.use(createUI)
app.mount('#app')
