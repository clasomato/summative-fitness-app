import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userFirstName: '',
    userLastName: '',
    userEmail: '',
    userPicture: '',
    isLoggedIn: false,
    userWorkouts: ''
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
    },
    getLoginStatus: function (state) {
      return state.isLoggedIn
    },
    getUserWorkouts: function (state) {
      return state.userWorkouts
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
    },
    setLoggedIn (state, payload) {
      state.isLoggedIn = payload
    },
    setUserWorkouts (state, payload) {
      state.userWorkouts = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
