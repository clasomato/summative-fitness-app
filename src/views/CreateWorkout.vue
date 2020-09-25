<template lang="html">
  <div class="create-workout">
    <div v-if="isLoggedIn">
      <div class="specificNav">
        <span @click="purgeLocalStorage()"><router-link to="/">Go Back</router-link></span>
      </div>

      <div class="createWorkoutContainer">
        <h1>Create Workout</h1>
        <label for="name">Name</label>
        <input type="text" name="name" id="userNameOfWorkout" v-model="nameOfWorkout">
        <label for="desc">Description</label>
        <input type="text" name="desc" id="userDescriptionOfWorkout">
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
          <div class="header-cont">
            <h4>{{nameOfWorkout}}</h4>
          </div>

          <ul id="activityList">
            <li v-for="item in workoutActivitys" :key="item.name">
              <div class="inner-cont">
                <div class="activityImage"></div>
                <div class="activityTitle">
                  <h5 v-on:click="navigate()">{{ item }}</h5>
                  <p>Category</p>
                </div>
              </div>
              <p>60 sec</p>
            </li>
          </ul>

          <!-- <img src="../assets/plus-solid.svg" alt="" > -->
          <div class="add-activity-cont" @click="openAddActivity">
            <i class="fas fa-plus"></i>
            <h5>Add Activity</h5>
          </div>
          <h4 id="noActivitysInWorkout">No Activities In Workout</h4>
        </div>
      </div>

      <!-- Buttons to confirm changes or to delete the workout set -->
      <div class="buttons">
        <button type="button" name="button" @click="openDeleteConfirmModal()" id="deleteWorkoutButton"><i class="fas fa-trash"></i>Delete</button>
        <button type="button" name="button" @click="confirmWorkoutChanges()" id="confirmWorkoutButton">Confirm</button>
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
          <input type="text" id="myInput" name="" value="" v-on:keyup="search()">
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
</template>

<script>
// Imports
import $ from 'jquery'
import db from '../firebase.js'
import store from '../store/index.js'
import startupScript from '../startupScript.js'
import router from '../router'

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
      userFirstName: '',
      noActivitys: true,
      oActivitys: false,
      nameOfWorkout: 'Your Workout',
      tempStore: []
    }
  },
  created () {
    var v = this
    this.checkLoggedIn()
    var retrievedData = localStorage.getItem('tempArray')
    v.workoutActivitys = JSON.parse(retrievedData)
  },
  updated () {
    this.checkLoggedIn()
  },
  methods: {
    purgeLocalStorage: function () {
      localStorage.removeItem('tempArray')
    },
    checkLoggedIn () {
      this.isLoggedIn = this.$store.getters.getLoginStatus
      if (this.isLoggedIn === false) {
        startupScript.checkLocalStorage()
        this.isLoggedIn = true
      }
      this.userFirstName = this.$store.getters.getUserFirstName
    },
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
    // ---- delete function for deleting a workout - Alex Bull's code STARTS ---
    deleteCurrentItem: function () {
      // setting variables for function to grab
      // var workoutName = document.getElementById('userNameOfWorkout').value
      // var workoutName =
      var user = store.getters.getUserEmail
      // deleting the wokout that the user has created
      db.collection('users').doc(user).collection('workouts').doc(this.nameOfWorkout).delete().then(function () {
        //  consloe message commuincating that the workout has been deleted
        console.log('Workout has been successfully deleted!')
      }).catch(function (error) {
        console.error('Error removing workout', error)
        //  consloe catch message commuincating that there has been an error in deleting the workout
        // --- Alex Bull's code ENDS -----
      })
      $('#confirmDeleteModal').hide(100)
    },
    bigger: function (e) {
      // getting Vue
      var v = this
      // This gets the checked item and appends it to the vue data array
      if (e.target.checked === true) {
        v.workoutActivitys.push(e.target.name)
        v.tempStore.push(e.target.name)
        v.workoutDefaultRefrence.push(e.target.value)
      } else {

      }
    },
    confirmWorkoutChanges: function () {
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
    // Sophie's Code
    navigate () {
      var v = this
      var tempArray = v.tempStore
      localStorage.setItem('tempArray', JSON.stringify(tempArray))

      function dgasjksa () {
        router.push({ name: 'EditActivity' })
      }
      setTimeout(dgasjksa(), 2000)
    }
    // Sophie's Code ENDS
  }
}
</script>

<style scoped lang="scss">
  * {
    text-align: left;
  }

  .createWorkoutContainer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  input {
    border: none;
    border-bottom: 1px solid darkgrey;
    background: transparent;
    font-size: 1em;
    padding: 0px 20px 12px 0px;
    margin-bottom: 10%;
    width: 100%;
    color: #000000;
  }

  label {
    color: #000000;
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
    // padding: 5%;
    border-radius: 1em;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    -webkit-box-shadow: 10px 10px 19px -16px rgba(0,0,0,0.75);
    -moz-box-shadow: 10px 10px 19px -16px rgba(0,0,0,0.75);
    box-shadow: 10px 10px 19px -16px rgba(0,0,0,0.75);
    & .header-cont {
      border-radius: 1em 1em 0 0;
      background-color: #E65A6E;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      padding: 2% 0;
      & h4 {
        margin: 0;
        color: #ffffff;
      }
    }
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
      background-color: #f6f6f6;
      border-radius: 100px;
      list-style: none;
      font-size: 1.5em;
      margin: 2%;
      padding: 2%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      & .inner-cont {
        flex-basis: 50%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        & div.activityImage {
          border-radius: 100%;
          background: url('../assets/background.jpg') no-repeat center center;
          background-size: cover;
          width: 2em;
          height: 2em;
          margin-right: 10%;
        }
        & div.activityTitle {
          & > * {
            margin: 0;
          }
          & h5 {
            font-size: 18px;
            font-weight: 500;
          }
          & p {
            font-size: 16px;
            color: grey;
          }
        }
      }
      & > p {
        flex-basis: 50%;
        font-size: 16px;
        color: grey;
        text-align: right;
      }
      & > * {
        // width: 100%;
        margin: 0;
      }
    }

    .add-activity-cont {
      opacity: 1;
      cursor: pointer;
      margin: 5% 0;
      display: flex;
      align-items: center;
      transition: all 0.3s ease;
      & svg {
        font-size: 26px;
        color: #2c3e50;
        margin-right: 8px;
      }
      & h5 {
        color: #2c3e50;
        font-size: 16px;
        text-transform: uppercase;
        font-weight: 600;
        margin: 0;
      }
      &:hover {
        opacity: 0.7;
      }
    }
    & #noActivitysInWorkout {
      font-size: 16px;
      color: lightgrey;
    }
  }

  .buttons {
    width: 100%;
    display: flex;
    justify-content: space-evenly;

    button {
      width: 45%;
      font-size: 20px;
      -webkit-box-shadow: 10px 10px 19px -16px rgba(0,0,0,0.75);
      -moz-box-shadow: 10px 10px 19px -16px rgba(0,0,0,0.75);
      box-shadow: 10px 10px 19px -16px rgba(0,0,0,0.75);
    }
    & #confirmWorkoutButton {
      background-color: #E65A6E;
      color: white;
    }
    & #deleteWorkoutButton {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #343A40;
      color: #ffffff;
      font-size: 20px;
      & > svg {
        margin-right: 10px;
        font-size: 18px;
      }
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
