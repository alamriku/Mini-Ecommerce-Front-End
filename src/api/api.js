import axios from 'axios'
import store from '../store/index'
import router from "../router";

const instance = axios.create({
  withCredentials: true
})
instance.interceptors.request.use(request => {
  request.headers.common.Accept = 'application/vnd.simpleEcommerce.v1+json'
  request.headers.common['Content-Type'] = 'application/json'
  const token = localStorage.getItem('token')
  if (token) {
    request.headers.common['Authorization'] = 'Bearer '+token
  }
  return request
}, error => {
  return Promise.reject(error)
})

instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    switch (error.response.status) {
      case 401: // Not Logged in or token is not provided
        store.dispatch('AUTH_LOGOUT')
          router.push({ name: 'Login'})
       // console.log(error.response.data.message)
        // localStorage.removeItem('user')
        // window.location.reload()
        break
      case 419: // session expire
        //console.log(error.response.data.message)
        // store.dispatch('logout')
        break
      case 403: // session expire
        router.push({ name: 'Forbidden'})
        // store.dispatch('logout')
        break

      case 503: // down for maintenance
        console.log('test')
        // window.location.reload()
        break
      case 500: // mostly database error or server error or htaccess error
        //console.log('from axios interceptor: ' + error.response.data.message)
        break

      default:
        return Promise.reject(error)
    }
  }
)
export default instance