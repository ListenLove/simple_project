import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import { Icon } from 'element-ui'
import Loading from './plugins/loading'
/* eslint-disable-next-line */
import 'element-ui/lib/theme-chalk/icon.css'
// const VConsole = require('vconsole/dist/vconsole.min')
// const vConsole = new VConsole()
// Vue.use(vConsole)
fastclick.attach(document.body)
// VueLazyLoad options
Vue.use(VueLazyload, {
  // preLoad: 1.3,
  // 加载时默认显示图片
  loading: require('./assets/images/loading.gif')
  // attempt: 1
})
// 使用 element ui 的图标组件
Vue.use(Icon)
Vue.use(Loading)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
