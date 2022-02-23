import Vue from 'vue'

const modulesFiles = require.context('@/directives', true, /\.js$/)
modulesFiles.keys().forEach((modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath).default
  Vue.directive(moduleName, value)
})
