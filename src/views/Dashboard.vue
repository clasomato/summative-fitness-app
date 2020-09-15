<template>
  <div class="dashboard">
    <div v-if="isLoggedIn">
      <h1 style="">Choose your <br> workout today, {{userFirstName}}</h1>
      <div class="cards">
        <div class="card">
          <router-link to="/create-workout"><i class="fas fa-plus" style="font-size:5em; color:#FE5864;"></i></router-link>
        </div>

        <div v-for="item in items" :key="item.workoutName" class="card" @click="showWorkout($event, item.id, item.workoutName, item.workouts)">
          <a class="editButton">Edit</a>
          <h3>Workout <br> <span>{{ item.workoutName }}</span> </h3>
        </div>
      </div>

    <!-- This is the workout master container -->
      <div class="workout">
        <!-- Name of selected workout -->
        <h2>Workout <span id="workoutName" style="font-weight:bold">{{selectedWorkout.name}}</span></h2>

        <!-- Container for the workout items -->
        <div class="workoutItems">
          <!-- Individual workout item -->
          <div class="workoutItem" v-for="item in selectedWorkoutItems" :key="item.name">
            <div style="display:flex; justify-content:space-between;">
              <div class="circle" style="margin-right:2%"></div>
              <i class="far fa-edit" style="padding:5%"></i>
            </div>
            <h2>{{ item.name }}</h2>
            <h3>{{ item.timePerSet }} Sec</h3>
          </div>
        </div>
      </div>
      <p else>You must <router-link to="/login">Login</router-link> or <router-link to="/sign-up">Signup</router-link> to view this page.</p>
    </div>
  </div>
</template>

<script>
import store from '../store/index.js'
import db from '../firebase.js'
import startupScript from '../startupScript.js'

export default {
  name: 'Dashboard',
  data () {
    return {
      userFirstName: false,
      isLoggedIn: false,
      items: false,
      selectedWorkout: false,
      selectedWorkoutItems: false,
      userEmail: this.$store.getters.getUserEmail
    }
  },
  created () {
    this.checkLoggedIn()
  },
  updated () {
    this.checkLoggedIn()
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
    })
    v.items = data
  },
  methods: {
    checkLoggedIn () {
      this.isLoggedIn = this.$store.getters.getLoginStatus
      if (this.isLoggedIn === false) {
        startupScript.checkLocalStorage()
        this.isLoggedIn = true
      }
      this.userFirstName = this.$store.getters.getUserFirstName
    },
    showWorkout: function (e, id, workoutName, workouts) {
      const v = this
      var i
      var blankArray = []
      var user = store.getters.getUserEmail
      for (i = 0; i < 1; i++) {
        db.collection('users').doc(user).collection('workouts').doc(workoutName).collection('workoutDetails').get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            const eachDoc = doc.data()
            blankArray.push(eachDoc)
          })
        })
      }
      v.selectedWorkoutItems = blankArray
    }
  }
}
</script>

<style scoped lang="scss">
#app {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  background-color: #F0F4F7;
  margin: 0;
}
p, h1, h2, h3, h4 {
  color: #6C757D;
}
span {
  color:#343A40;
}
.dashboard {
  box-sizing: border-box;
  text-align: left;
  // padding: 5%;

  h1 {
    padding-left: 5%;
  }
}

.cards {
  overflow: hidden;
  // width: 100%;
  padding-left: 5%;
}

.card {
  // padding: 21% 6%;
  border: 0px solid black;
  width: 35%;
  float: left;
  margin: 5%;
  border-radius: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  padding: 3%;
  overflow: hidden;
  -webkit-box-shadow: 10px 10px 36px -16px rgba(0,0,0,0.75);
  -moz-box-shadow: 10px 10px 36px -16px rgba(0,0,0,0.75);
  box-shadow: 10px 10px 36px -16px rgba(0,0,0,0.75);

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    padding: 3%;

    a {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    img {
      width: 70%;
      padding: 5%;
    }
  }

  img {
    width: 70%;
    padding: 5%;
  }
}

.workout {
  padding: 5%;
}

.workoutItems {
  width: 100%;
}

.workoutItem {
  width: 100%;
  background-color: white;
  padding: 3%;
  margin: 5% 0%;
  border-bottom-left-radius: 10em;
  border-top-left-radius: 10em;

  border-bottom-right-radius: 10em;
  border-top-right-radius: 10em;

  display: flex;
  justify-content: space-between;
  align-items: center;

  -webkit-box-shadow: 10px 10px 19px -16px rgba(0,0,0,0.75);
  -moz-box-shadow: 10px 10px 19px -16px rgba(0,0,0,0.75);
  box-shadow: 10px 10px 19px -16px rgba(0,0,0,0.75);

  h2,h3 {
    padding: 0;
    margin: 0;
  }
}

  .circle {
    padding: 80%;
    border-radius: 100em;
    background-color: #FE5864;
    width: 100%;
    margin-right: 10%;
  }

  .editButton {
    position: absolute;
    bottom: 0;
    left: 0;
    height: auto !important;
    width: 100%;
    background-color: #FE5864;
    // border-top-right-radius: 10em;
    // border-top-left-radius: 10em;
    color: white;
  }
</style>
