import Vue from 'vue'
import App from './App'
import api from '@/http/api'
import MinRequest from '@/http/min-request'
import uView from 'uview-ui'
import ErrorHandler from './utils/error-handler'

Vue.config.productionTip = false

Vue.use(MinRequest)
Vue.use(uView)
Vue.use(ErrorHandler)

App.mpType = 'app'

const app = new Vue({
  ...App,
  api
})
app.$mount()
