import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
export default createStore({
  state: {
    isGetterRouter: false,
    isCollapsed: false
  },
  plugins: [createPersistedState({
    paths: ["isCollapsed"] // 控制是否持久化
  })], // integrate the plugin
  getters: {},
  mutations: {
    changeGetterRouter(state, data) {
      state.isGetterRouter = data;
    },
    changeCollapsed(state) {
      state.isCollapsed = !state.isCollapsed
    }
  },
  actions: {},
  modules: {},
});
