import Vue from 'vue';
import App from './app.vue';
import routes from './route';
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';


document.addEventListener('DOMContentLoaded', function() {
  if (window.FastClick) window.FastClick.attach(document.body);
}, false);

Vue.use(Mint);
Vue.use(VueResource);
Vue.use(VueRouter);

Vue.component('mt-footer', {
  props: ['tobuid'],
  template: '<div class="page-fixed-bottom"><p class="page-footer-links"><a href="http://www.vronline.com" class="page-footer-link">由VR助手提供</a></p><p class="page-footer-copyright">Copyright © 2016-2017 vronline.com {{ tobuid }}</p></div></div>'
})


const router = new VueRouter({
  base: __dirname,
  routes
});


var vm = new Vue({
  el: '#app',
  render: h => h(App),
  router
});