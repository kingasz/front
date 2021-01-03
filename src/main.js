import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import store from './store/index'
import acl from './acl'

Vue.config.productionTip = false

new Vue({
  router,
  axios,
  store,
  acl,
  render: h => h(App)
}).$mount('#app')
