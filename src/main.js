import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入rem适配文件
import 'amfe-flexible'

import Vant from 'vant'
import 'vant/lib/index.css'

Vue.config.productionTip = false

Vue.use(Vant)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
