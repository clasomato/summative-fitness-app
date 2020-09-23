<template lang="html">
  <div class="container d-flex bgColor p-4">
    <div class="col-12 justifyEvenly flex-column">
      <div class="text-left headingStyle oswaldReg">
        <h2>Sign In...</h2>
        <p v-if="errorMessage">{{errorMessage}}</p>
      </div>
      <div class="row justify-content-center">
        <form class="col col-12">
          <div class="form-group text-left formTextStyle ralewayReg formPadding">
            <label for="email">Email</label>
            <input type="email" class="form-control inputFormFont" v-model="userEmail" placeholder="Enter Email">
          </div>
          <div class="form-group text-left formTextStyle ralewayReg formPadding">
            <label for="password">Password</label>
            <input type="password" class="form-control inputFormFont" placeholder="Password" v-model="userPw">
          </div>
        </form>
      </div>
      <div class="row justify-content-center">
        <button type="button" class="btn borderRadius text-center ralewayReg" @click="logUserIn">Continue</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '../firebase.js'

export default {
  name: 'Login',
  data () {
    return {
      userEmail: '',
      userPw: '',
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
          // v.$store.commit('setUserFirstName', v.userData.firstName)
          // v.$store.commit('setUserLastName', v.userData.lastName)
          // v.$store.commit('setUserPicture', v.userPicture)
          // v.$store.commit('setUserEmail', v.userData.userEmail)
          // v.$store.commit('setLoggedIn', true)
          localStorage.setItem('userFirstName', v.userData.firstName)
          localStorage.setItem('userLastName', v.userData.lastName)
          localStorage.setItem('userEmail', v.userData.userEmail)
          localStorage.setItem('isLoggedIn', 'true')
          var blankArray = []
          db.collection('users').doc(v.userEmail).collection('workouts').get().then(function (snapshot) {
            snapshot.forEach(function (doc) {
              const eachDoc = doc.data()
              blankArray.push(eachDoc)
            })
            v.$store.commit('setUserWorkouts', blankArray)
            // localStorage.setItem('userWorkouts', blankArray)
          })
          v.$router.push('/')
          // location.reload()
        })
      }).catch(function (error) {
        v.errorMessage = error.message
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
</style>
