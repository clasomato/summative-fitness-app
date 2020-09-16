<template>
  <div class="dashboard">
    <!-- <Navigation/> -->
    <div v-if="isLoggedIn">
      <h1 style="">Choose your <br> workout today, {{userFirstName}}</h1>
      <div class="cards">
        <div class="inner">
          <div class="card">
            <router-link to="/create-workout"><i class="fas fa-plus" style="font-size:5em; color:#FE5864;"></i></router-link>
          </div>
          <div v-for="item in items" :key="item.workoutName" class="card">
            <a class="editButton" @click="showWorkout($event, item.id, item.workoutName, item.workouts)">Edit</a>
            <h3>Workout <br> <span>{{ item.workoutName }}</span> </h3>
          </div>
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
              <a @click="deleteIndividualActivity(item.name)"><i class="fas fa-times-circle" style="color:#FE5864; font-size:2em"></i></a>
              <!-- <div class="circle" style="margin-right:2%"></div> -->
              <!-- <i class="far fa-edit" style="padding:5%"></i> -->
            </div>
            <h2>{{ item.name }}</h2>
            <h3>{{ item.timePerSet }} Sec</h3>
          </div>
          <a @click="showAddNewActivity()"><i id="addButton" class="fas fa-plus-circle" style="color:#FE5864; font-size:3.5em; display:none"></i></a>
        </div>
      </div>
      <p else>You must <router-link to="/login">Login</router-link> or <router-link to="/sign-up">Signup</router-link> to view this page.</p>

      <div class="addActivityModalContainer" style="display:none" id="activityContainerP">
        <div class="addActivityModal">
          <div class="searchForActivity" id="activityContainer">
            <div class="searchArea">
              <button type="button" name="button" @click="closeAndSendActivitys()">Close</button>
              <input type="text" id="myInput" name="" value="" v-on:keyup="search()" placeholder="Search...">
            </div>

            <div class="searchResults" style="margin-top:20%">
              <ul id="myUL">
                <li>
                    <label for=""><a>Back Squat</a></label>
                    <input type="checkbox" name="Back Squat" id="check1" value="0" @click="bigger($event)"> <br>
                </li>

                <li>
                  <label for=""><a>Quail</a></label>
                  <input type="checkbox" name="Quail" id="check1" value="1" @click="bigger($event)"> <br>
                </li>

                <li>
                  <label for=""><a>Side Lunge</a></label>
                  <input type="checkbox" name="Side Lunge" id="check1" value="2" @click="bigger($event)"> <br>
                </li>

                <li>
                  <label for=""><a>Chest Press</a></label>
                  <input type="checkbox" name="Chest Press" id="check1" value="3" @click="bigger($event)"> <br>
                </li>

                <li>
                  <label for=""><a>Skipping</a></label>
                  <input type="checkbox" name="Skipping" id="check1" value="4" @click="bigger($event)"> <br>
                </li>

                <li>
                  <label for=""><a>Chest Fly</a></label>
                  <input type="checkbox" name="Chest Fly" id="check1" value="5" @click="bigger($event)"> <br>
                </li>

                <li>
                  <label for=""><a>Bicep Curl</a></label>
                  <input type="checkbox" name="Bicep Curl" id="check1" value="6" @click="bigger($event)"> <br>
                </li>

                <li>
                  <label for=""><a>Burpee</a></label>
                  <input type="checkbox" name="Burpee" id="check1" value="7" @click="bigger($event)"> <br>
                </li>

                <li>
                  <label for=""><a>Horizontal Row</a></label>
                  <input type="checkbox" name="Horizontal Row" id="check1" value="8" @click="bigger($event)"> <br>
                </li>

                <li>
                  <label for=""><a>Squat Jumps</a></label>
                  <input type="checkbox" name="Squat Jumps" id="check1" value="9" @click="bigger($event)"> <br>
                </li>

                <li>
                  <label for=""><a>Crunch</a></label>
                  <input type="checkbox" name="Crunch" id="check1" value="10" @click="bigger($event)"> <br>
                </li>

                <li>
                  <label for=""><a>Running the stairs</a></label>
                  <input type="checkbox" name="Running the stairs" id="check1" value="11" @click="bigger($event)"> <br>
                </li>

                <li>
                  <label for=""><a>Shoulder Press</a></label>
                  <input type="checkbox" name="Shoulder Press" id="check1" value="12" @click="bigger($event)"> <br>
                </li>

                <li>
                  <label for=""><a>Leg Raise</a></label>
                  <input type="checkbox" name="Leg Raise" id="check1" value="13" @click="bigger($event)"> <br>
                </li>

                <li>
                  <label for=""><a>Push Ups</a></label>
                  <input type="checkbox" name="Push Ups" id="check1" value="14" @click="bigger($event)"> <br>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store/index.js'
import db from '../firebase.js'
import startupScript from '../startupScript.js'
import $ from 'jquery'

export default {
  name: 'Dashboard',
  data () {
    return {
      userFirstName: false,
      isLoggedIn: false,
      items: false,
      selectedWorkout: false,
      selectedWorkoutItems: false,
      userEmail: this.$store.getters.getUserEmail,
      workoutActivitys: [],
      workoutDefaultRefrence: []
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
      v.selectedWorkout = workoutName
      for (i = 0; i < 1; i++) {
        db.collection('users').doc(user).collection('workouts').doc(workoutName).collection('workoutDetails').get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            const eachDoc = doc.data()
            blankArray.push(eachDoc)
          })
        })
      }
      v.selectedWorkoutItems = blankArray
      $('#addButton').show()
    },
    deleteIndividualActivity: function (name) {
      var v = this
      var user = store.getters.getUserEmail
      var workoutName = v.selectedWorkout
      console.log(name)
      db.collection('users').doc(user).collection('workouts').doc(workoutName).collection('workoutDetails').doc(name).delete().then(function () {
        console.log('Document successfully deleted!')
        v.onChange()
      }).catch(function (error) {
        console.error('Error removing document: ', error)
      })
    },
    showAddNewActivity: function () {
      console.log('add item')
      window.scrollTo(0, 0)
      $('#activityContainerP').show(100)
    },
    search: function () {
      // Declare variables
      var input, filter, ul, li, a, i, txtValue
      input = document.getElementById('myInput')
      filter = input.value.toUpperCase()
      ul = document.getElementById('myUL')
      li = ul.getElementsByTagName('li')

      // Loop through all list items, and hide those who don't match the search query
      for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName('a')[0]
        txtValue = a.textContent || a.innerText
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = ''
        } else {
          li[i].style.display = 'none'
        }
      }
    },
    bigger: function (e) {
      // getting Vue
      var v = this
      // This gets the checked item and appends it to the vue data array
      if (e.target.checked === true) {
        v.workoutActivitys.push(e.target.name)
        v.workoutDefaultRefrence.push(e.target.value)
      } else {

      }
    },
    closeAndSendActivitys: function () {
      console.log('add item')
      var i
      var v = this
      var array = v.workoutActivitys
      var user = store.getters.getUserEmail
      // var workoutName = document.getElementById('userNameOfWorkout').value
      for (i = 0; i < array.length; i++) {
        db.collection('users').doc(user).collection('workouts').doc(v.selectedWorkout).collection('workoutDetails').doc(array[i]).set({
          picture: '',
          repetitions: 2,
          sets: 4,
          timePerSet: 4,
          name: v.workoutActivitys[i]
        })
      }
      $('#activityContainerP').hide(100)
      this.onChange()
    },
    onChange: function () {
      console.log('updating local data')
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
      this.$forceUpdate()
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
  overflow-x: scroll;
  // width: 100%;
  padding-left: 5%;
  & > .inner {
    padding-bottom: 8%;
    width: 216%;
    display: flex;
    flex-wrap: nowrap;
  }
}

::-webkit-scrollbar {
  overflow: -moz-scrollbars-none;
  width: 0px !important;
  display: none !important;
  -ms-overflow-style: none !important;
  scrollbar-width: none !important;
}

.card {
  // padding: 21% 6%;
  border: 0px solid black;
  width: 35%;
  float: left;
  margin: 1%;
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

  #addButton {
    width: 100%;
    text-align: center;
    font-size: 3em;
  }

  .addActivityModalContainer {
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10000;
  }

  .addActivityModal {
    width: 80%;
    height: 90vh;
    background-color: white;
    margin: 10%;
    overflow: scroll;
    border-radius: 1em;
    padding: 5%;
  }

  .searchArea {
    display: flex;
    justify-content: space-between;

    button, input {
      color: white;
      background-color: #FE5864;
      border: none;
      font-size: 1.25em;
      padding: 1%;
      border-radius: 0.5em;
    }
  }

  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: white;
    opacity: 1; /* Firefox */
  }

  .searchResults {
    ul {
      margin: 0;
      padding: 0;
    }
    li {
      list-style: none;
      margin: 1%;
      border-bottom: 2px solid pink;
      font-size: 2em;
      display: flex;
      justify-content: space-between;
      align-items: center;

      input {
        zoom: 1.5;
      }
    }
  }
</style>
