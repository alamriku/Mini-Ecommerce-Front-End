import store from "../../../store";

const isAdmin = (to, from, next) => {
    console.log(store.getters.IS_AUTHENTICATED)
    console.log(store.getters.IS_ADMIN)
    if (store.getters.IS_AUTHENTICATED && store.getters.IS_ADMIN) {
        next()
        return
    }
    next({ name: 'Forbidden'})
}

export default isAdmin