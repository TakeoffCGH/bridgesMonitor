import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/reset.css'
import './assets/css/iconfont.css'
import api from './api/index'
Vue.prototype.$api = api;
import i18n from './lang/index'
import './router/permission'
import './utils/localStorage'
//echarts
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false

// import VueAMap from 'vue-amap';
// Vue.use(VueAMap);
// // 初始化vue-amap
// VueAMap.initAMapApiLoader({
//     key: 'c1e1c5fc799f581569bec001bce3cc32'
// });


console.log('process.env.NODE_ENV ',process.env.NODE_ENV );

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
