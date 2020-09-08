<template lang="html">
  <div class="sign-up-cont">
    <h2>Sign Up</h2>
    <p v-if="errorMessage">{{errorMessage}}</p>
    <input type="text" placeholder="First Name" v-model="userFirstName">
    <input type="text" placeholder="Last Name" v-model="userLastName">
    <input type="email" placeholder="Email" v-model="userEmail">
    <input type="password" placeholder="Password" v-model="userPw">
    <button type="button" @click="signUp">Sign Up!</button>
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
      userEmail: '',
      errorMessage: false
    }
  },
  methods: {
    signUp () {
      // Establishes this in a constant variable
      const v = this
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
    }
  }
}
</script>

<style scoped lang="scss">

</style>
