const state = {
    sideBarOpen: false
};
const getters = {
    sideBarOpen: state => {
        return state.sideBarOpen
    }
};
const mutations = {
    toggleSidebar (state) {
        state.sideBarOpen = !state.sideBarOpen
    }
};
const actions = {
    toggleSidebar(context) {
        context.commit('toggleSidebar')
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}