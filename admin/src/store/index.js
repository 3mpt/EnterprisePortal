import { createStore } from "vuex";

export default createStore({
  state: {
    isGetterRouter: false
  },
  getters: {},
  mutations: {
    changeGetterRouter(state, data) {
      state.isGetterRouter = data;
    },
  },
  actions: {},
  modules: {},
});
