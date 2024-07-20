import Vue from 'vue'
import App from './App.vue'
import router from './router'
import FastClick from 'fastclick'

import VueAwesomeSwiper from 'vue-awesome-swiper'
// import style
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

Vue.config.productionTip = false
FastClick.attach(document.body);

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload);

import VueClipBoard from 'vue-clipboard2'

Vue.use(VueClipBoard);

new Vue({
  data: () => {
    return {
      system: '',
      env: 'pc',
      domain: 'cn',
      ready: false,
      fromHistory: false
    }
  },
  router,
  render: h => h(App)
}).$mount('#app')