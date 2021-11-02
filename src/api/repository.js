import api from './api'
import auth from './auth'
const URL = process.env.VUE_APP_API
export default {
  axiosInstance: api,
  authInstance: auth,
  register (params) {
    return auth.post(`${URL}/sign-up`, params)
  },
  login (params) {
    return auth.post(`${URL}/auth/login`, params)
  },
  logout () {
    return api.post(`${URL}/auth/logout`)
  },
  users(){
    return api.get(`${URL}/users`)
  },
  getRefreshToken (saver) {
    return api.post(`${URL}/auth/refresh-token`, { carry: saver })
  },
  products () {
    return api.get(`${URL}/products`)
  },
  paginateProducts(page) {
    return api.get(`${URL}/products?page=${page}`)
  },
  storeProduct (params) {
    return api.post(`${URL}/products`, params)
  },

  edit (id) {
    return api.get(`${URL}/products/${id}`)
  },

  updateProduct (product, params) {
    return api.post(`${URL}/products/${product}`, params)
  },

  destroyProduct (product) {
    return api.delete(`${URL}/products/${product}`)
  }
}
