import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import fastclick from 'fastclick';
import VueLazyLoad from 'vue-lazyload';
import store from './store';

import 'common/stylus/index.styl';

Vue.config.productionTip = false;

// 解决移动端300ms延时的问题
fastclick.attach(document.body);

Vue.use(VueLazyLoad, {
  loading: require('common/image/loading.png')
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
