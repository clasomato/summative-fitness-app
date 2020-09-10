import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userFirstName: false,
    userLastName: false,
    userEmail: false,
    userPicture: false
  },
  getters: {
    getUserFirstName: function (state) {
      return state.userFirstName
    },
    getUserLastName: function (state) {
      return state.userLastName
    },
    getUserEmail: function (state) {
      return state.userEmail
    },
    getUserPicture: function (state) {
      return state.userPicture
    }
  },
  mutations: {
    setUserFirstName (state, payload) {
      state.userFirstName = payload
    },
    setUserLastName (state, payload) {
      state.userLastName = payload
    },
    setUserPicture (state, payload) {
      state.userPicture = payload
    },
    setUserEmail (state, payload) {
      state.userEmail = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
