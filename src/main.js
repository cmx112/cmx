// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import store from '@/store/index.js'

import axios from "axios"

Vue.config.productionTip = false

import "@/assets/common.css"

import {MessageBox} from "element-ui";

import "element-ui/lib/theme-chalk/index.css";

Vue.prototype.$alert=MessageBox.alert;
Vue.prototype.$http=axios;



/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
