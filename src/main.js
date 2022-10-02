import {createApp} from 'vue'
import './style/index.css'
import App from './App.vue'
import createUI from './components/index'
// 导入Unocss
import 'uno.css'

import moment from "moment"
import "moment/dist/locale/zh-cn";
moment.suppressDeprecationWarnings = true // moment不提示警告

const app = createApp(App)

app.config.globalProperties.$moment = moment

app.use(createUI)
app.use(moment)
app.mount('#app')
