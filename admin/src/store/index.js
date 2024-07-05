import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
export default createStore({
  state: {
    isGetterRouter: false,
    isCollapsed: false,
    userInfo: {}
  },
  plugins: [createPersistedState({
    paths: ["isCollapsed","userInfo"] // 控制是否持久化
  })], // integrate the plugin
  getters: {},
  mutations: {
    changeGetterRouter(state, data) {
      state.isGetterRouter = data;
    },
    changeCollapsed(state) {
      state.isCollapsed = !state.isCollapsed
    },
        /**
     * 清空用户信息
     * 这个函数用于清空用户信息，将用户信息对象重置为一个空对象
     * @param {Object} state - 包含用户信息的 state 对象
     */
    clearUserInfo(state) {
      state.userInfo = {}
    },

    changeUserInfo(state, data) {
      state.userInfo = {
        ...state.userInfo,
        ...data
      }
    }
  },
  actions: {},
  modules: {},
});
