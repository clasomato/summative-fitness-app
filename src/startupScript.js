const store = require('./store')
// const router = require('./router/index.js')
// import store from './store/index.js'

var storageObj = {
  checkLocalStorage: function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (isLoggedIn === 'true') {
      store.default.commit('setLoggedIn', true)
      store.default.commit('setUserFirstName', localStorage.getItem('userFirstName'))
      store.default.commit('setUserLastName', localStorage.getItem('userLastName'))
      store.default.commit('setUserEmail', localStorage.getItem('userEmail'))
      return true
    } else {
      // router.push('login')
      return false
    }
  }
}

module.exports = storageObj
