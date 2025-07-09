import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'

// 引入 uv-ui - 必须在 Vue 实例创建之前
import uvUI from '@climblee/uv-ui'
Vue.use(uvUI)

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import uvUI from '@climblee/uv-ui'

export function createApp() {
  const app = createSSRApp(App)
  app.use(uvUI)
  return {
    app
  }
}
// #endif