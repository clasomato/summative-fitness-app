<template lang="html">
  <div class="login-cont">
    <h2>Login</h2>
    <p v-if="errorMessage">{{errorMessage}}</p>
    <input type="email" placeholder="Email" v-model="userEmail">
    <input type="password" placeholder="Password" v-model="userPw">
    <button type="button" @click="logUserIn">Login</button>
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '../firebase.js'

export default {
  name: 'Login',
  data () {
    return {
      userEmail: false,
      userPw: false,
      errorMessage: false,
      userData: false
    }
  },
  methods: {
    logUserIn () {
      const v = this
      firebase.auth().signInWithEmailAndPassword(v.userEmail, v.userPw).then(function () {
        db.collection('users').doc(v.userEmail).get().then(function (doc) {
          v.userData = doc.data()
          v.$store.commit('setUserFirstName', v.userData.firstName)
          v.$store.commit('setUserLastName', v.userData.lastName)
          // v.$store.commit('setUserPicture', v.userPicture)
          v.$store.commit('setUserEmail', v.userData.userEmail)
        })
      }).catch(function (error) {
        v.errorMessage = error.message
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
