const store = require('./store/index.js')

var storageObj = {
  checkLocalStorage: function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    console.log(isLoggedIn)
    if (isLoggedIn === 'true') {
      console.log(store)
      store.commit('setLoggedIn', true)
      store.commit('setUserFirstName', localStorage.getItem('userFirstName'))
      store.commit('setUserLastName', localStorage.getItem('userLastName'))
      store.commit('setUserEmail', localStorage.getItem('userEmail'))
      console.log('working')
    } else {
      console.log('connected')
    }
  }
}

module.exports = storageObj
