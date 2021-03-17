import Vue from 'vue'
import App from './App'
import api from '@/http/api'
import MinRequest from '@/http/min-request'
import uView from 'uview-ui'

Vue.config.productionTip = false

Vue.use(MinRequest)
Vue.use(uView)

App.mpType = 'app'

const app = new Vue({
  ...App,
  api
})
app.$mount()
