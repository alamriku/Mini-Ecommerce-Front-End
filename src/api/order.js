import order from './api'
const URL = process.env.VUE_APP_API
export default {
    makeOrder (payload) {
        return order.post(`${URL}/website/orders`, payload)
    },
    orders () {
        return order.get(`${URL}/website/orders`)
    },
    adminOrders() {
        return order.get(`${URL}/orders`)
    }
}