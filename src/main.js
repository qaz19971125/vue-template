import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// 样式
import '@/styles/index.scss'
// 图标
import '@/icons/index.css'
// 路由权限
import '@/permission'
// 小部件
import '@/widgets/element-ui'
import '@/widgets/directives'
import '@/widgets/components'
import '@/widgets/mixins'
import '@/widgets/bus'

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})
