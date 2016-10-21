import Vue from 'vue'
import App from './App'
import LocalStorage from 'vue-localstorage';

Vue.use(LocalStorage);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
});
