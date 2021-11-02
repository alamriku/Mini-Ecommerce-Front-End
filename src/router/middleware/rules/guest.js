import store from "../../../store";

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.IS_AUTHENTICATED) {
        next()
        return
    }
    next('/')
}

export default ifNotAuthenticated