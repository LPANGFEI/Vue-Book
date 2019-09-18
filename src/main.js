import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyload from 'vue-lazyload'
import FastClick from 'fastclick'
import BookHeader from "./components/BookHeader";
import Spin from './components/Spin'
import Message from './components/Message'
import antDesign from './antDesign.config.js'
import './assets/css/reset.css'
import './assets/js/rem'

// import './assets/js/vconsole.js'

Vue.use(VueAxios, axios)
axios.defaults.baseURL = '/api'

FastClick.attach(document.body)



Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: require('@/assets/logo.png'),
    loading: require('@/assets/logo.png'),
    attempt: 1
})

Vue.filter('changeNumber', (value) => {
    if (value == undefined) {
        return 0;
    } else if (value > 100000000) {
        return (value / 100000000).toFixed(1) + "亿";
    } else {
        return (value / 10000).toFixed(1) + "万";
    }
})

Vue.component(BookHeader.name, BookHeader)
Vue.component(Spin.name, Spin)
Vue.component(Message.name, Message)

Vue.use(antDesign)
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
