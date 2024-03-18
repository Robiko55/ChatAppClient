import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showLogin: false,
    isLoggedIn: false
  },
  getters: {
    getShowLogin: state => state.showLogin,
    getIsLoggedIn: state => state.isLoggedIn
  },
  mutations: {
    toggleLoginModal(state) {
      state.showLogin = !state.showLogin;
      // console.log(state.showLogin)
    },
    setLoggedIn(state,value) {
      state.isLoggedIn = value;
    }
  },
  actions: {
    toggleLoginModal({ commit }) {
      commit('toggleLoginModal');
    },
    loginUser({commit}) {
      commit('setLoggedIn',true);
    },
    logoutUser({commit}) {
      commit('setLoggedIn',false);
    }
  },
  modules: {
  }
})
