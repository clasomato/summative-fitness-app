<template lang="html">
  <!-- <div class="login-cont">
    <h2>Login</h2>
    <p v-if="errorMessage">{{errorMessage}}</p>
    <input type="email" placeholder="Email" v-model="userEmail">
    <input type="password" placeholder="Password" v-model="userPw">
    <button type="button" @click="logUserIn">Login</button>
  </div> -->
  <SignIn/>
</template>

<script>
// import store from '../store'

import firebase from 'firebase'
import SignIn from '@/components/SignIn.vue'

export default {
  name: 'Login',
  components: {
    SignIn
  },
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
        // this.$store.commit('setUserFirstName', v.userFirstName)
        // this.$store.commit('setUserLastName', v.userLastName)
        // this.$store.commit('setUserPicture', v.userPicture)
        this.$store.commit('setUserEmail', v.userEmail)
      }).catch(function (error) {
        v.errorMessage = error.message
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
