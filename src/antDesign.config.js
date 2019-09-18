import {
    Carousel,
    Spin,
    AutoComplete
} from 'ant-design-vue'

const antdComponentsArr = [Carousel, Spin, AutoComplete]

export default {
    install(Vue) {
        antdComponentsArr.forEach(Component => Vue.use(Component))
    }
}
