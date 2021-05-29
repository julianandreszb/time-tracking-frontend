import Vue from 'vue'
import Vuex from 'vuex'
import appModule from "@/store/modules/appModule";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        appModule
    },
})
