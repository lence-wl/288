import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
// 引入axios
import vueAxios from './utils/request/http'
// 按需加载 ant
import 'ant-design-vue/dist/antd.css';
import './config/use'

Vue.config.productionTip = false

Vue.use(vueAxios);

Vue.prototype.setSession = (key, value) => {

    sessionStorage.setItem(key, JSON.stringify(value));
}

Vue.prototype.getSession = (key) => {
    return JSON.parse(sessionStorage.getItem(key))
}


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
