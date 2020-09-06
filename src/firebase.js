var firebase = require('firebase')

var firebaseObj = {
  firebaseConfig: {
    apiKey: "AIzaSyBxGEXCa6vD1bQeWkIDEUa1CNfGA3BkvK4",
    authDomain: "core-ece90.firebaseapp.com",
    databaseURL: "https://core-ece90.firebaseio.com",
    projectId: "core-ece90",
    storageBucket: "core-ece90.appspot.com",
    messagingSenderId: "870367759286",
    appId: "1:870367759286:web:9aa353f2b3c6a743224f17",
    measurementId: "G-6W0ZG54EQC"
  },
  getDb: function () {
    const firebaseApp = firebase.initializeApp(firebaseObj.firebaseConfig)
    const db = firebaseApp.firestore()
    return db
  }
}

module.exports = firebaseObj.getDb()
