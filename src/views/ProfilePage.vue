<template lang='html'>
  <div class='container' v-if='isLoggedIn'>
    <div class='oswaldSemiBold text-center p-4'>
      <h2>{{userFirstName}}</h2>
    </div>
    <div class='row ralewayReg highlightPoints'>
      <div class='col-6 d-flex justify-content-end'>
        <div class='boxes borderRadius boxShadow'>
          <p class='highlightText oswaldSemiBold'>{{userGoalWeight}}</p>
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
          <div class='col-6 text-left' v-for="item in items" :key="item.workoutName">
            <h5>{{ item.workoutName }}</h5>
            <!-- <p class='workoutText text-left'>{{item.sets}} sets</p> -->
          </div>
          <div class='col-6' v-for="item in items" :key="item.timePerSet">
            <p class='workoutText text-right'>{{item.sets}} sets</p>
            <p class='workoutText text-right'>{{item.timePerSet}} seconds per set</p>
          </div>
        </div>
      </div>
    </div>
    <div class='row justify-content-center'>
      <button type='button' class='btn borderRadius text-center ralewayReg'>Create Workout </button>
    </div>
  </div>
</template>

<!-- Zoe's Javascript and Vue Code, updating the profile page with their name-->
<!-- how many workouts and will give them a list of their workouts underneath with some information on it. -->
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
      userGoalWeight: '65',
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
      this.userGoalWeight = this.$store.getters.getUserGoalWeight
    },
    showWorkout: function (workoutName) {
      const v = this
      var i
      var blankArray = []
      var user = store.getters.getUserEmail
      v.selectedWorkout = workoutName
      for (i = 0; i < 1; i++) {
        db.collection('users').doc(user).collection('workouts').doc(workoutName).collection('workoutDetails').get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            const eachDoc = doc.data()
            blankArray.push(eachDoc)
          })
        })
      }
    }
  }
}
</script>
