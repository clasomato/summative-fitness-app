<template lang="html">
  <div class="create-workout">
    <div v-if="isLoggedIn">
      <div class="specificNav">
        <span><router-link to="/">Go Back</router-link></span>
      </div>

      <div class="createWorkoutContainer">
        <h1>Create Workout</h1>

        <input type="text" name="" value="" id="userNameOfWorkout" placeholder="Name">

        <input type="text" name="" value="" id="userDescriptionOfWorkout" placeholder="Description">
      </div>

      <div class="activitySection">
        <div class="activityHeaders">
          <h3>Level</h3>
          <select class="" name="options" id="dificultyOptions">
            <option value="0">Beginner</option>
            <option value="1">Intermediate</option>
            <option value="2">Advanced</option>
          </select>
        </div>

        <div class="activityContent">
          <!-- <h3>Your Workout</h3> <br> -->
          <br>
          <h4 id="noActivitysInWorkout">No Activities In Workout</h4> <br>
          <!-- <h4 style="display:none" id="activityList">{{workoutActivitys}}</h4> -->
          <ul id="activityList">
            <li v-for="item in workoutActivitys" :key="item.name">
              {{ item }}
              <hr>
            </li>
          </ul> <br>

          <!-- <img src="../assets/plus-solid.svg" alt="" > -->
          <a @click="openAddActivity"><i class="fas fa-plus" style="font-size:5em; color:#FE5864;"></i></a>
        </div>
      </div>

      <!-- Buttons to confirm changes or to delete the workout set -->
      <div class="buttons">
        <button type="button" name="button" @click="openDeleteConfirmModal()" id="deleteWorkoutButton">Delete</button>
        <button type="button" name="button" @click="confirmWorkoutChnages()" id="confirmWorkoutButton">Confirm</button>
      </div>

      <!-- Modals -->
      <div class="modalBackgroundContainer" id="confirmDeleteModal">
        <div class="customModal">
          <h1>Are you sure you want to delete this?</h1>

          <button type="button" name="button" @click="deleteCurrentItem">Yes</button>
          <button type="button" name="button" @click="deleteModalGoBack">No</button>
        </div>
      </div>

      <!-- Search for new activity modal -->
      <div class="searchForActivity" id="activityContainer">
        <div class="searchArea">
          <button type="button" name="button" @click="goBackToCreateWorkout">Close</button>
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
    <p else>You must <router-link to="/login">Login</router-link> or <router-link to="/sign-up">Signup</router-link> to view this page.</p>
  </div>
</template>

<script>
// Imports
import $ from 'jquery'
import db from '../firebase.js'
import store from '../store/index.js'

console.log(db, store)

export default {
  name: 'CreateWorkout',
  data () {
    return {
      i: 0,
      checkBoxes: false,
      workoutActivitys: [],
      workoutDefaultRefrence: [],
      isLoggedIn: false,
      noActivitys: true,
      oActivitys: false
    }
  },
  created () {
    this.isLoggedIn = store.getters.getLoginStatus
  },
  methods: {
    // Hide/show STARTS
    openAddActivity: function () {
      $('#activityContainer').show(100)
    },
    openDeleteConfirmModal: function () {
      $('#confirmDeleteModal').show(100)
    },
    deleteModalGoBack: function () {
      $('#confirmDeleteModal').hide(100)
    }, // Hide/show ENDS
    deleteCurrentItem: function () {
      // console.log('delete please')

      $('#confirmDeleteModal').hide(100)
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
    confirmWorkoutChnages: function () {
      // Grbbing Vue
      const v = this

      // Getting the required variables
      var user = store.getters.getUserEmail
      var workoutName = document.getElementById('userNameOfWorkout').value
      var workoutDescripton = document.getElementById('userDescriptionOfWorkout').value
      var userWorkouts = v.workoutActivitys
      var userDifficultyChoice = document.getElementById('dificultyOptions').value

      function getRandomInt (max) {
        return Math.floor(Math.random() * Math.floor(max))
      }

      var id = getRandomInt(10000)
      // console.log(id)

      // console.log(v)

      // Checking if the user has added the name and description
      if (workoutName !== '' && workoutDescripton !== '') {
        // Adding the data to firebase
        db.collection('users').doc(user).collection('workouts').doc(workoutName).set({
          id: id,
          workoutName: workoutName,
          description: workoutDescripton,
          workouts: userWorkouts,
          userDifficultyChoice: userDifficultyChoice,
          breakTime: 30,
          totalTime: (60 * 4) + (30 * (4 - 1))
        })

        var i
        var array = v.workoutActivitys
        for (i = 0; i < array.length; i++) {
          db.collection('users').doc(user).collection('workouts').doc(workoutName).collection('workoutDetails').doc(array[i]).set({
            picture: '',
            repetitions: 2,
            sets: 4,
            timePerSet: 4,
            id: id,
            name: v.workoutActivitys[i]
          })
        }
      } else {
        alert('No mf name or desc')
      }
    },
    goBackToCreateWorkout: function () {
      var v = this

      $('#activityContainer').hide(100)
      var array = v.workoutActivitys
      if (array.length > 0) {
        console.log('fasdasas')
        console.log(array)
        $('#noActivitysInWorkout').hide()
        $('#activityList').show()
      }
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
    testFunction: function () {
      // console.log(document.getElementById('dificultyOptions').value)
    }
  }
}
</script>

<style scoped lang="scss">
  * {
    text-align: left;
  }

  input {
    border: none;
    background-color: inherit;
    font-size: 2em;
    border-bottom: 2px solid #FE5864;
    margin-bottom: 10%;
  }

  select {
    border: none;
    background-color: inherit;
    font-size: 1.2em;
    border-bottom: 2px solid #FE5864;
    margin-bottom: 10%;
  }

  button {
    background-color: white;
    color:#FE5864;
    border: 0;
    width: 80%;
    text-align: center;
    border-radius: 100px;
    font-size: 1.5em;
    margin-top: 5%;
    -webkit-box-shadow: 10px 10px 19px -16px rgba(0,0,0,0.75);
    -moz-box-shadow: 10px 10px 19px -16px rgba(0,0,0,0.75);
    box-shadow: 10px 10px 19px -16px rgba(0,0,0,0.75);
  }

  #confirmDeleteModal {
    display: none;
  }

  .create-workout {
    padding: 5%;
  }

  .createWorkoutContainer {

  }

  .activityHeaders {
    display: flex;
    justify-content: space-between;
    // align-items: flex-start;\
    column-rule-color: green;

    h3 {
      padding: 0;
      margin: 0;
    }
  }

  .activityContent {
    width: 100%;
    background-color: white;
    padding: 5%;
    border-radius: 0.5em;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    -webkit-box-shadow: 10px 10px 19px -16px rgba(0,0,0,0.75);
    -moz-box-shadow: 10px 10px 19px -16px rgba(0,0,0,0.75);
    box-shadow: 10px 10px 19px -16px rgba(0,0,0,0.75);

    h3 {
      background-color: blue;
      padding: 0;
      margin: 0;
      width: 100%;
      position: absolute;
      top: 0;
    }

    img {
      width: 25%;
      border: 1px solid black;
      padding: 5%;
      border-radius: 1em;
    }

    ul {
      width: 100%;
      margin: 0 !important;
      padding: 0 !important;
    }

    li {
      list-style: none;
      font-size: 1.5em;
    }

    hr {
      color:#FE5864;
    }
  }

  .buttons {
    width: 100%;
    display: flex;
    justify-content: space-between;

    button {
      width: 45%;
      font-size: 1.4em;
      -webkit-box-shadow: 10px 10px 19px -16px rgba(0,0,0,0.75);
      -moz-box-shadow: 10px 10px 19px -16px rgba(0,0,0,0.75);
      box-shadow: 10px 10px 19px -16px rgba(0,0,0,0.75);
    }
  }

  .modalBackgroundContainer {
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);
    position: absolute;
    top: 0;
    left: 0;
  }

  .customModal {
    width: 80%;
    height: 80vh;
    padding: 5%;
    margin: 10%;
    background-color: lightgrey;
  }

  .searchForActivity {
    width: 100%;
    height: 100vh;
    overflow: scroll;
    background-color: white;
    position: absolute;
    top: 0;
    left: 0;
    padding: 5%;
    display: none;
    z-index: 10000;
  }

  .searchArea {
    padding:5%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: white;
    width: 100%;

    display: flex;
    justify-content: space-between;

    button, input {
      margin:0;
      padding-right: 3%;
      width: 40%;
    }
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

    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: white;
      opacity: 1; /* Firefox */
    }
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
