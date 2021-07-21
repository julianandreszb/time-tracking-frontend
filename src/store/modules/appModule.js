const state = {
    isDebugEnabled: true,
    isCsrfCookieSettled: false,
};

const mutations = {
    setCsrfCookieSettled(state, payload) {
        state.isCsrfCookieSettled = payload;
    },
}

const getters = {
    isDebugEnabled: state => state.isDebugEnabled,
    isCsrfCookieSettled: state => state.isCsrfCookieSettled,
}

const actions = {}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}
