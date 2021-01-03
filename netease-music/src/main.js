import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

// const VConsole = require('vconsole/dist/vconsole.min')

fastclick.attach(document.body)
// VueLazyLoad options
Vue.use(VueLazyload, {
  // preLoad: 1.3,
  // 加载时默认显示图片
  loading: require('./assets/images/loading.gif')
  // attempt: 1
})
// const vConsole = new VConsole()
// Vue.use(vConsole)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')