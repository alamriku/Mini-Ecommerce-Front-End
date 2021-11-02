import Vue from 'vue'
import VueRouter from 'vue-router'
import Website from '../components/website/master'
import Items from '../components/website/Product/Index'
import ProductShow from '../components/website/Product/Show'
import Orders from '../components/website/Order/Index'
import Register from "../components/auth/register";
import Login from "../components/auth/login";
import Forbidden from "../components/Error/Forbidden";
Vue.use(VueRouter)
import Admin from "./admin";
import middleware from './middleware'

const routes = [
  {
    path: '/',
    component: Website,
    name: 'Website',
    children: [
      {
        path: '/',
        name: 'Items',
        component: Items,
      },
      {
        path: 'products/show/:name',
        name:'ProductShow',
        component: ProductShow
      },
      {
        path: '/orders',
        name: 'Orders',
        component: Orders
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: middleware.guest,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: middleware.guest,
  },
  Admin,
  {
      path: '/403',
      name: 'Forbidden',
      component: Forbidden,
  },

]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
