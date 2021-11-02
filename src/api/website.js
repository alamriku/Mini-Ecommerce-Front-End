import website from './api'
const URL = process.env.VUE_APP_API+'/website'
export default {
    products () {
        return website.get(`${URL}/products`)
    },
    showProduct(name){
        return website.get(`${URL}/products/${name}`)
    }
}