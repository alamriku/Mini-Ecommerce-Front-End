import store from "../../../store";

const ifAuthenticated = (to, from, next) => {
    if (store.getters.IS_AUTHENTICATED) {
        next()
        return
    }
    next('/login')
}

export default ifAuthenticated