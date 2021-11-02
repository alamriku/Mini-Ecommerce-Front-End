
import order from "../../api/order";



const state = {
    orders: []
}

const mutations = {
    ORDERS: (state, payload) => {
        state.orders = payload
    }
}

const actions = {
    MAKE_ORDER: async (_, payload) => {
        return await order.makeOrder(payload)
    },
    ORDERS: async ({ commit, dispatch }) => {
        const { data } = await order.orders()
        const { resource } = data
        commit('ORDERS', resource.data)
        dispatch('PAGINATION', resource)
    },
    ADMIN_ORDERS: async ({ commit, dispatch}) => {
        const { data } = await order.adminOrders()
        const { resource } = data
        commit('ORDERS', resource.data)
        dispatch('PAGINATION', resource)
    },
}

const getters = {
    ORDERS(state){
        return state.orders
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}