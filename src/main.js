import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import VueClipboard from 'vue-clipboard2'
import './icons'

import { Toast, Notify } from 'vant';

Vue.use(Toast, Notify);
Vue.use(VueClipboard);

Vue.config.productionTip = false

//添加全局的前置路由守卫,用来判断本地存储中是否有token
router.beforeEach((to, from, next) => {

    if (to.path == '/send' || to.path == '/cart' || to.path == '/order') {
        let token = localStorage.getItem('authorization');
        if (token) {
            //放行
            return next();
        } else {
            Notify({
                message: '您尚未登录,请先登录!',
                type: 'warning',
                duration: 1500,
            });
            setTimeout(() => {
                return router.replace('/login');
            }, 1500);
            return;
        }
    }
    next();
});

//把axios挂载到原型
Vue.prototype.$axios = Axios
Axios.defaults.baseURL = '/api'

// Axios.defaults.withCredentials = false;

// 网络请求拦截
Axios.interceptors.request.use(function(config) {
        let token = localStorage.getItem('authorization');
        if (token) {
            config.headers['Authorization'] = token;
        }
        return config;
    })
    // 2.2.响应拦截
Axios.interceptors.response.use(res => {
    return res
}, err => {
    console.log(err);
})

//添加事件总线
Vue.prototype.$bus = new Vue()
    //安装图片懒加载

// or with options
const loadimage = require('assets/img/common/lazyload-loading.jpg')
const errorimage = require('assets/img/common/loading.jpg')

Vue.use(VueLazyLoad, {
    preLoad: 1.3,
    // error: errorimage,
    loading: loadimage,
    attempt: 1
})

//解决移动端300ms延迟
FastClick.attach(document.body)

new Vue({
    render: h => h(App),
    router,
    store,
    data: {
        // 空的实例放到根组件下，所有的子组件都能调用
        Bus: new Vue()
    }
}).$mount('#app')