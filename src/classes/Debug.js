import store from '@/store/store'

class Debug {
    constructor() {
    }

    logMessage(...messages) {
        store.getters["appModule/isDebugEnabled"] && console.log(messages);
    }
}

export default Debug;
