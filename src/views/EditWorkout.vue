<template lang="html">
  <div class="edit-workout">
    <div v-if="isLoggedIn">
      <h1>Edit Workout</h1>
    </div>
    <p else>You must <router-link to="/login">Login</router-link> or <router-link to="/sign-up">Signup</router-link> to view this page.</p>

    <div v-for="item in items" :key="item.workoutName" class="card" @click="editWorkout($event, item.id, item.workoutName, item.workouts)">
      <a class="editButton">Edit</a>
      <h3>Workout <br> <span>{{ item.workoutName }}</span> </h3>
    </div>

    <div class="editModal" id="editModal">
      <!-- Container for the workout items -->
      <div class="workoutItems">
        <!-- Individual workout item -->
        <div class="workoutItem" v-for="item in selectedWorkoutItems" :key="item.name">
          <div style="display:flex; justify-content:space-between;">
            <!-- <div class="circle" style="margin-right:2%"></div> -->
            <i class="fas fa-times"></i>
          </div>
          <h2>{{ item.name }}</h2>
          <h3>{{ item.timePerSet }} Sec</h3>
        </div>
      </div>

      <div class="">
        <button type="button" name="button">Add Another Item</button>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store/index.js'
import $ from 'jquery'
import db from '../firebase.js'
import startupScript from '../startupScript.js'

// console.log(startupScript)

export default {
  name: 'EditWorkout',
  data () {
    return {
      isLoggedIn: false,
      items: false,
      selectedWorkoutItems: false
    }
  },
  methods: {
    editWorkout: function (e, id, workoutName, workouts) {
      const v = this
      var i
      var blankArray = []
      var user = store.getters.getUserEmail
      // console.log(user)
      for (i = 0; i < 1; i++) {
        db.collection('users').doc(user).collection('workouts').doc(workoutName).collection('workoutDetails').get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            const eachDoc = doc.data()
            blankArray.push(eachDoc)
            $('#editModal').show(100)
          })
        })
      }
      v.selectedWorkoutItems = blankArray
    },
    checkLoggedIn () {
      this.isLoggedIn = this.$store.getters.getLoginStatus
      if (this.isLoggedIn === false) {
        startupScript.checkLocalStorage()
        this.isLoggedIn = true
      }
      this.userFirstName = this.$store.getters.getUserFirstName
    }
  },
  created () {
    this.checkLoggedIn()
  },
  mounted () {
    const v = this
    var data = []
    var user = store.getters.getUserEmail
    // console.log(user)
    db.collection('users').doc(user).collection('workouts').get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        const eachDoc = doc.data()
        data.push(eachDoc)
      })
    })
    v.items = data
    // console.log(v.items)
  }
}
</script>

<style scoped lang="scss">
.editModal {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
}

.workoutItem {
  border-bottom: 3px solid white;
  margin-bottom: 10%;
  width: 90%;
}
</style>
