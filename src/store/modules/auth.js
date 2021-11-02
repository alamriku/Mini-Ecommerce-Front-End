
const state = {
    user: JSON.parse(localStorage.getItem('user') )|| '',
    token: localStorage.getItem('token') || '',
    status: '',
    tokenExpire: localStorage.getItem('tokenExpire') || '',
    isAdmin: JSON.parse(localStorage.getItem('isAdmin')) || false,
}

const mutations = {
    SET_USER (state, user){
        state.user = user
    },
    SET_TOKEN (state, token){
        state.token = token
    },
    SET_TOKEN_EXPIRE(state, expire){
        state.tokenExpire = expire
    },
    SET_STATUS(state, status){
        state.status = status
    },
    SET_IS_ADMIN(state, isAdmin){
        state.isAdmin = isAdmin
    }
}
const actions = {
    SET_TOKEN: ({ commit }, { access_token }) => {
        localStorage.token = access_token
        commit('SET_TOKEN', access_token)
    },
    SET_EXPIRE: ({ commit }, { expires_in }) => {
        const expiryTime = new Date(new Date().getTime() + expires_in * 1000)
        localStorage.tokenExpire = expiryTime
        commit('SET_TOKEN_EXPIRE', expiryTime)
    },
    SET_USER: ({ commit }, { user }) => {
        localStorage.user = JSON.stringify(user)
        commit('SET_USER', user)
    },
    SET_IS_ADMIN({commit}, { isAdmin }){
        localStorage.isAdmin = isAdmin
        commit('SET_IS_ADMIN', isAdmin)
    },
    SET_STORAGE: async ({dispatch}, data) => {
        await dispatch('SET_TOKEN', data)
        await dispatch('SET_USER', data)
        await dispatch('SET_EXPIRE', data)
        await dispatch('SET_IS_ADMIN', data)
    },
    AUTH_LOGOUT({commit}){
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('tokenExpire')
        localStorage.removeItem('isAdmin')
        commit('SET_TOKEN', '')
        commit('SET_IS_ADMIN', false)
    },
    LOGOUT({commit}){
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('tokenExpire')
        localStorage.removeItem('isAdmin')
         commit('SET_TOKEN', '')
         commit('SET_IS_ADMIN', false)
    }
}

const getters = {
    IS_AUTHENTICATED: state => !!state.token,
    IS_ADMIN: state => !!state.isAdmin,
    USER: state => state.user,
}

export default {
    state,
    mutations,
    actions,
    getters
}