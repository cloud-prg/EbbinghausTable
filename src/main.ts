import {createApp} from 'vue'
import './style/index.css'
import App from './App.vue'
import createUI from './components/index'

createApp(App).use(createUI).mount('#app')
