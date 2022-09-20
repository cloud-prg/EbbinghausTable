import header from './header/index.vue'
import table from './table/index.vue'
import {App} from 'vue'

const componentsArr = [header, table]

const createUI = {
    install: (app: App) => {
        componentsArr.forEach(component => {
            app.component(component.name, component)
        })
    }
}

export default createUI