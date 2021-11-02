
import website from "../../api/website";
import pagination from "../../api/paginate";

const state = {
    websiteProducts: [],
    Pagination: {},
    singleProduct: {},
}

const mutations = {
    WEBSITE_PRODUCTS(state, payload){
        state.websiteProducts = payload;
    },
    SET_PAGINATION(state, Pagination){
        state.Pagination = Pagination
    },
    WEBSITE_PRODUCT(state, Product){
        state.singleProduct = Product
    }
}

const actions = {
    WEBSITE_PRODUCTS: async ({ commit }) => {
        try {
            const { data } = await website.products()
            const { resource } = data
            commit('WEBSITE_PRODUCTS', resource.data)
            commit('SET_PAGINATION', resource)
        } catch (e) {
            console.log(e)
        }
    },
    // WEBSITE_PAGINATION: ({ commit }, items) => {
    //     commit('SET_PAGINATION', items)
    // },
    WEBSITE_PAGINATE: async (_, payload) => {
        try {
            const { data } = await pagination.paginate(payload)
            const { resource } = data
            return resource
            // commit('WEBSITE_PRODUCTS', products.data)
            // commit('SET_PAGINATION', products)
        } catch (e) {
            console.log(e)
        }
    },
    WEBSITE_PRODUCT: async ({ commit }, name) => {
        try {
            const { data } = await website.showProduct(name)
            const { product } = data
            await commit('WEBSITE_PRODUCT', product)
        } catch (e) {
            console.log(e)
        }
    }
}

const getters = {
    WEBSITE_PRODUCTS(state) {
        return state.websiteProducts
    },
    WEBSITE_PAGINATE(state) {
        return state.Pagination
    },
    WEBSITE_PRODUCT (state) {
        return state.singleProduct
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}