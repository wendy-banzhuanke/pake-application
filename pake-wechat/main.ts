/*
 * @Author: zhangjian
 * @Date: 2023-04-07 15:12:06
 * @LastEditTime: 2024-08-14 15:21:04
 * @LastEditors: zhangjian
 * @Description: 描述
 */
import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import uviewPlus from 'uview-plus'
export function createApp() {
  const app = createSSRApp(App)
  app.use(uviewPlus)
  return {
    app
  }
}
// #endif