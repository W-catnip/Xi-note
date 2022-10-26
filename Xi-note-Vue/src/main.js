import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as echarts from 'echarts'
import Cropper from 'cropperjs'

// css
import './assets/css/reset.css'
import './assets/css/common.less'
import './assets/icons'
import 'cropperjs/dist/cropper.css';
// 引入全局弹窗生成函数
import Message from './components/Message/Message'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$cropper = Cropper
Vue.prototype.$message = Message

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
