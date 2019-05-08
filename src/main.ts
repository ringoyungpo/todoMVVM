import 'todomvc-app-css/index.css'
import Vue from 'vue'
import TodoMVVM from './views/TodoMVVM.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(TodoMVVM)
}).$mount('#app')
