import header from './header/index.vue'
import table from './table/index.vue'

const componentsArr = [header, table]

const createUI = {
    install: app => {
        componentsArr.forEach(component => {
            app.component(component.name, component)
        })
    }
}

export default createUI