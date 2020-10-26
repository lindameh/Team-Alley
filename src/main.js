/*!

 =========================================================
 * Vue Now UI Kit - v1.1.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/now-ui-kit
 * Copyright 2019 Creative Tim (http://www.creative-tim.com)

 * Designed by www.invisionapp.com Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import Vue from 'vue';
import App from './App.vue';
import router from './starterRouter';
import NowUiKit from './plugins/now-ui-kit';
import * as firebase from "firebase";

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyAnivbRInwjLMGThsUEX_Xqh2X4g1pXb90",
  authDomain: "final-project-609a0.firebaseapp.com",
  databaseURL: "https://final-project-609a0.firebaseio.com",
  projectId: "final-project-609a0",
  storageBucket: "final-project-609a0.appspot.com",
  messagingSenderId: "381682991098",
  appId: "1:381682991098:web:bee494d3d872cd5e5a2e43",
  measurementId: "G-XN27NVRKTQ"
};

firebase.initializeApp(firebaseConfig);

Vue.use(NowUiKit);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
