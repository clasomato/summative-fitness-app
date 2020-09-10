<template lang="html">
  <div class="container d-flex bgColor p-4">
    <div class="my-auto col-12">
      <div class="text-left headingStyle">
        <h2>Sign In...</h2>
        <p v-if="errorMessage">{{errorMessage}}</p>
      </div>
      <div class="row justify-content-center">
        <form class="col col-12">
          <div class="form-group text-left formTextStyle formPadding">
            <label for="email">Email address</label>
            <input type="email" class="form-control" placeholder="myfitness@gmail..." v-model="userEmail">
          </div>
          <div class="form-group text-left formTextStyle formPadding">
            <label for="password">Password</label>
            <input type="password" class="form-control" placeholder="********" v-model="userPw">
          </div>
          <button type="button" class="btn text-center" @click="logUserIn">Continue</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '../firebase.js'

export default {
  name: 'Login',
  // components: {
  //   SignIn
  // },
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

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
.btn {
  width: 150px;
  color: #FFFFFF;
  background-color: #343A40;
  border-radius: 30px;
  margin-top: 30px;
  margin-bottom: 12px;
}
.headingStyle {
  font-family: 'Roboto', sans-serif;
  font-size: 30px;
  color: #343A40;
  padding-bottom: 30px;
}
.formTextStyle {
  font-family: 'Roboto', sans-serif;
  color: #6C757D;
  font-size: 20px;
}
.bgColor {
  background-color: #DADADA;
  height: 100vh;
}
.formPadding{
  padding-top: 12px;
  padding-bottom: 12px;
}
</style>
