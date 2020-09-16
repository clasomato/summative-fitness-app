<template lang="html">
  <div class="container d-flex bgColor p-4">
    <div class="col-12 justifyEvenly flex-column">
      <div class="text-left headingStyle oswaldReg formPadding">
        <h2>Sign Up...</h2>
        <p v-if="errorMessage">{{errorMessage}}</p>
      </div>
      <div class="row d-flex justify-content-center">
        <form class="col col-12">
          <div class="row formPadding">
            <div class="form-group col col-6  text-left formTextStyle ralewayReg">
              <label for="firstName">First Name:</label>
              <input type="text" class="form-control formFontSize" placeholder="First Name" v-model="userFirstName">
            </div>
            <div class="form-group col col-6  text-left formTextStyle ralewayReg">
              <label for="lastName">Last Name:</label>
              <input type="text" class="form-control formFontSize" placeholder="Last Name" v-model="userLastName">
            </div>
          </div>
          <div class="form-group text-left formTextStyle formPadding ralewayReg">
            <label for="email">Email address:</label>
            <input type="email" class="form-control formFontSize" placeholder="e.g. john.smith@gmail.com" v-model="userEmail">
          </div>
          <div class="form-group  text-left formTextStyle formPadding ralewayReg">
            <label for="password">Password:</label>
            <input type="password" class="form-control formFontSize" placeholder="Password" v-model="userPw">
          </div>
          <div class="form-group text-left formTextStyle formPadding ralewayReg">
            <label for="confirmPassword">Confirm Password:</label>
            <input type="password" class="form-control formFontSize" placeholder="Confirm Password" v-model="userPwConfirm">
          </div>
        </form>
      </div>
      <div class="row justify-content-center">
        <button type="button" class="btn text-center ralewayReg borderRadius" @click="signUp">Continue</button>
      </div>
    </div>
  </div>
</template>

<script>
// Imports the firebase plugin
import firebase from 'firebase'
// Imports the database (defined in firebase.js)
import db from '../firebase.js'

export default {
  name: 'SignUp',
  data () {
    return {
      userFirstName: '',
      userLastName: '',
      userPicture: '',
      userPw: '',
      userPwConfirm: '',
      userEmail: '',
      errorMessage: false
    }
  },
  methods: {
    signUp () {
      // Establishes this in a constant variable
      const v = this

      if (v.userPw === v.userPwConfirm) {
        // Creates a user with the input email and password with firebase.auth()
        firebase.auth().createUserWithEmailAndPassword(v.userEmail, v.userPw).then(function () {
          // Creates a firestore document for this user to store their data
          db.collection('users').doc(v.userEmail).set({
            firstName: v.userFirstName,
            lastName: v.userLastName,
            userEmail: v.userEmail,
            signUpDate: firebase.firestore.Timestamp.fromDate(new Date())
          })
          // Creates a firestore collection called workouts and sets an example workout
          db.collection('users').doc(v.userEmail).collection('workouts').doc('Example Workout').set({
            workoutName: 'Example Workout',
            repetitions: 8,
            sets: 4,
            timePerSet: 60,
            breakTime: 30,
            totalTime: (60 * 4) + (30 * (4 - 1)),
            picture: ''
          })
          // Changes the users page to the login page
          v.$router.push('/login')
        }, function (error) {
          v.errorMessage = error.message
        })
      } else {
        v.errorMessage = 'Passwords do not match.'
      }
    }
  }
}
</script>

<style scoped lang="scss">
// @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

</style>
