const store = require('./store')
// import store from './store/index.js'

var storageObj = {
  checkLocalStorage: function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    console.log(store)
    if (isLoggedIn === 'true') {
      console.log(store)
      store.default.commit('setLoggedIn', true)
      store.default.commit('setUserFirstName', localStorage.getItem('userFirstName'))
      store.default.commit('setUserLastName', localStorage.getItem('userLastName'))
      store.default.commit('setUserEmail', localStorage.getItem('userEmail'))
      console.log('working b')
    } else {
      console.log('connected c')
    }
  }
}

module.exports = storageObj
