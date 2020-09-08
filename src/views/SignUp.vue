<template lang="html">
  <div class="sign-up-cont">
    <h2>Sign Up</h2>
    <p class="error-message" v-if="errorMessage">{{errorMessage}}</p>
    <input type="text" placeholder="First Name" v-model="userFirstName">
    <input type="text" placeholder="Last Name" v-model="userLastName">
    <input type="email" placeholder="Email" v-model="userEmail">
    <input type="password" placeholder="Password" v-model="userPw">
    <input type="password" placeholder="Confirm Password" v-model="userPwConfirm">
    <button type="button" @click="signUp">Sign Up!</button>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'SignUp',
  data () {
    return {
      userFirstName: '',
      userLastName: '',
      userPw: '',
      userPwConfirm: '',
      userEmail: '',
      errorMessage: false
    }
  },
  methods: {
    signUp () {
      const v = this
      if (v.userPw === v.userPwConfirm) {
        firebase.auth().createUserWithEmailAndPassword(v.userEmail, v.userPw).then(function () {
          v.errorMessage = 'Success!'
          v.$router.push('login')
        }, function (error) {
          v.errorMessage = error.message
        })
      } else {
        v.errorMessage = 'Passwords do not match.'
        setTimeout(function () {
          v.errorMessage = ''
        }, 4000)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.error-message {
  text-transform: capitalize;
}
</style>
