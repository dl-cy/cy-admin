import '@/plugin/element-ui'
import { imagesRouter } from '@/router/image-router'
import '@/styles/index.scss'
import Vue from 'vue'
import App from './App.vue'
import * as filters from './filters'
import router from './router'
import store from './store'

Vue.prototype.$images = imagesRouter
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
