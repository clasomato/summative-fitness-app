<template lang='html'>
  <div class='container' v-if='isLoggedIn'>
    <div class='oswaldSemiBold text-center p-4'>
      <h2>{{userFirstName}}</h2>
    </div>
    <div class='row ralewayReg highlightPoints'>
      <div class='col-6 d-flex justify-content-end'>
        <div class='boxes borderRadius boxShadow'>
          <p class='highlightText oswaldSemiBold'>{{usersGoal}}</p>
          <p>Goal (in kg)</p>
        </div>
      </div>
      <div class='col-6 d-flex justify-content-start'>
        <div class='boxes borderRadius boxShadow'>
          <p class='highlightText oswaldSemiBold'>{{totalWorkouts}}</p>
          <p>Workouts</p>
        </div>
      </div>
    </div>

    <div class='workoutList ralewayReg'>
      <p>Your Workouts</p>
      <div class='fullBox borderRadius'>
        <div class='col-12 row p-3'>
          <div class='col-6 text-left'>
            <h5>Cardio Burn</h5>
            <p class='workoutText text-left'>Cardio</p>
          </div>
          <div class='col-6'>
            <p class='workoutText text-right'>20 mins</p>
          </div>
        </div>
        <div class='col-12 row'>
          <div class='col-6 text-left'>
            <h5>Leg Blast</h5>
            <p class='workoutText text-left'>Strength</p>
          </div>
          <div class='col-6'>
            <p class='workoutText text-right'>20 mins</p>
          </div>
        </div>
      </div>
    </div>
    <div class='row justify-content-center'>
      <button type='button' class='btn borderRadius text-center ralewayReg'>Create Workout </button>
    </div>
  </div>
</template>

<script>
import store from '../store/index.js'
import db from '../firebase.js'
import startupScript from '../startupScript.js'
console.log(db)

export default {
  name: 'ProfilePage',
  data () {
    return {
      userFirstName: false,
      isLoggedIn: false,
      usersGoal: '65',
      usersWorkouts: '',
      items: false,
      totalWorkouts: false
    }
  },
  mounted () {
    const v = this
    var data = []
    var user = store.getters.getUserEmail
    db.collection('users').doc(user).collection('workouts').get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        const eachDoc = doc.data()
        data.push(eachDoc)
      })
      console.log(data.length)
      v.totalWorkouts = data.length
    })
    v.items = data
    console.log(v.items)
  },
  created () {
    this.checkLoggedIn()
  },
  updated () {
    this.checkLoggedIn()
  },
  methods: {
    checkLoggedIn () {
      this.isLoggedIn = this.$store.getters.getLoginStatus
      if (this.isLoggedIn === false) {
        startupScript.checkLocalStorage()
        this.isLoggedIn = true
      }
      this.userFirstName = this.$store.getters.getUserFirstName
    }
  }
}
</script>
