import repository from "../../api/repository";
const state = {
    products: [],
    Pagination: {},
    product: {},
}

const mutations = {
    PRODUCTS(state, products){
        state.products = products;
    },
    SET_PAGINATION(state, Pagination){
        state.Pagination = Pagination
    },
    EDIT_PRODUCT(state, product) {
        state.product = product;
    }
}

const actions = {
    STORE_PRODUCT: async (_, formData) => {
        return await repository.storeProduct(formData)
    },
    PRODUCTS: async ({ commit, dispatch }) => {
        try {
            const { data } = await repository.products()
            const { products } = data
            commit('PRODUCTS', products.data)
            dispatch('PAGINATION', products)
        } catch (e) {
            console.log(e)
        }
    },
    PAGINATION: ({ commit }, payload) => {
        commit('SET_PAGINATION', payload)
    },
    PAGINATE: async ({ commit, dispatch }, page) => {
        try {
            const { data } = await repository.paginateProducts(page)
            const { products } = data
            commit('PRODUCTS', products.data)
            dispatch('PAGINATION', products)
        } catch (e) {
            console.log(e)
        }
    },
    async EDIT_PRODUCT({ commit }, id) {
        try {
            const { data } = await repository.edit(id)
            const { product } = data
            await commit('EDIT_PRODUCT', product)
        } catch (e) {
            console.log(e)
        }
    },
    async UPDATE_PRODUCT(_, { product, formData }){
        return  await repository.updateProduct(product, formData)
    },
    async DESTROY({ state }, product){
        const response = await repository.destroyProduct(product)
        for(const [index, p] of state.products.entries()){
            if(p.id === product){
                state.products.splice(index, 1);
                break;
            }
        }
        return response
    }
}
const getters = {
    products(state) {
        return state.products
    },
    PAGINATION(state) {
        return state.Pagination
    },
    product (state) {
        return state.product
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}