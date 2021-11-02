import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import admin from './modules/admin'
import product from "./modules/product";
import website from "./modules/website";
import order from "./modules/order";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    token: null,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    admin,
    product,
    website,
    order,
  }
})
