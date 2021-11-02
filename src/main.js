import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/tailwind.css'
import Toasted from 'vue-toasted'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css'

//import './main.css'



import VueTailwind from 'vue-tailwind'
import { TTable,TDropdown }  from  'vue-tailwind/dist/components'
const settings = {
  't-table': {
    component: TTable,
    props: {
      classes: {
        table: 'min-w-full divide-y divide-gray-100 shadow-sm border-gray-200 border',
        thead: '',
        theadTr: '',
        theadTh: 'px-3 py-2 font-semibold text-left bg-gray-100 border-b',
        tbody: 'bg-white divide-y divide-gray-100',
        tr: '',
        td: 'px-3 py-2 whitespace-no-wrap',
        tfoot: '',
        tfootTr: '',
        tfootTd: ''
      },
      variants: {
        thin: {
          td: 'p-1 whitespace-no-wrap text-sm',
          theadTh: 'p-1 font-semibold text-left bg-gray-100 border-b text-sm'
        }
      }
    }
  },
  't-dropdown':TDropdown,
}

Vue.use(VueTailwind, settings)
Vue.use(Loading);
Vue.config.productionTip = false
Vue.use(Toasted)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
