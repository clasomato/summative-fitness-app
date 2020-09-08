<template lang="html">
  <div class="login-cont">
    <h2>Login</h2>
    <p class="error-message" v-if="errorMessage">{{errorMessage}}</p>
    <input type="email" placeholder="Email" v-model="userEmail">
    <input type="password" placeholder="Password" v-model="userPw">
    <button type="button" @click="logUserIn">Login</button>
  </div>
</template>

<script>
// import store from '../store'

import firebase from 'firebase'

export default {
  name: 'Login',
  data () {
    return {
      userEmail: false,
      userPw: false,
      errorMessage: false
    }
  },
  methods: {
    logUserIn () {
      const v = this
      firebase.auth().signInWithEmailAndPassword(v.userEmail, v.userPw).then(function () {
        // NOTE: Get users first and last names plus profile image here
        //       Then add uncomment:
        // v.$store.commit('setUserFirstName', v.userFirstName)
        // v.$store.commit('setUserLastName', v.userLastName)
        // v.$store.commit('setUserPicture', v.userPicture)
        v.$store.commit('setUserEmail', v.userEmail)
        v.$router.push('profile-setup')
      }, function (error) {
        v.errorMessage = error.message
      })
    }
  }
}
</script>

<style scoped lang="scss">
.error-message {
  text-transform: capitalize;
}
</style>
