<template>
  <div class="dashboard">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <h1 style="">Choose your <br> workout today, {{userFirstName}}</h1>
    <div class="cards">
      <div class="card">
        <router-link to="/create-workout"><i class="fas fa-plus" style="font-size:5em; color:#FE5864;"></i></router-link>
      </div>

      <!-- <div class="card">
        <h3>Workout <br> <span>legblast</span> </h3>
      </div> -->

      <div v-for="item in items" :key="item.workoutName" class="card" @click="showWorkout($event, item.id, item.workoutName, item.workouts)">
        <h3>Workout <br> <span>{{ item.workoutName }}</span> </h3>
        <!-- <p>{{ item.id }}</p> -->
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
          <div class="circle"></div>
          <h2>{{ item.name }}</h2>
          <h3>{{ item.timePerSet }} Sec</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import store from '../store/index.js'
import db from '../firebase.js'

export default {
  name: 'Dashboard',
  components: {
    HelloWorld
  },
  data () {
    return {
      userFirstName: false,
      items: false,
      selectedWorkout: false,
      selectedWorkoutItems: false
    }
  },
  methods: {
    showWorkout: function (e, id, workoutName, workouts) {
      const v = this
      // console.log(id)
      // console.log(workouts)

      var i
      // var array = workouts
      var blankArray = []
      for (i = 0; i < 1; i++) {
        db.collection('users').doc('jason@climostudios.online').collection('workouts').doc(workoutName).collection('workoutDetails').get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            const eachDoc = doc.data()
            blankArray.push(eachDoc)
          })
        })
      }
      v.selectedWorkoutItems = blankArray
    }
  },
  created () {
    this.userFirstName = store.getters.getUserFirstName
  },
  mounted () {
    const v = this
    var data = []
    // var user = store.getters.getUserEmail
    db.collection('users').doc('jason@climostudios.online').collection('workouts').get().then(function (querySnapshot) {
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
  #app {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  body {
    background-color: #FFFFFF;
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
    border: 1px solid black;
    width: 35%;
    float: left;
    margin: 1%;
    border-radius: 1em;
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

  .workout {
    padding: 5%;
  }

  .workoutItems {
    width: 100%;
    // float: right;

  }

  .workoutItem {
    width: 100%;
    background-color: darkgrey;
    padding: 3%;
    margin: 5% 0%;
    border-bottom-left-radius: 10em;
    border-top-left-radius: 10em;

    border-bottom-right-radius: 10em;
    border-top-right-radius: 10em;

    display: flex;
    justify-content: space-between;
    align-items: center;

    h2,h3 {
      padding: 0;
      margin: 0;
    }
  }

  .circle {
    padding: 4%;
    border-radius: 100em;
    background-color: #FE5864;
    width: 1%
  }
</style>
