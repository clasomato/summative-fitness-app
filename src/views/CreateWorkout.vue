<template lang="html">
  <div class="create-workout">
    <div v-if="isLoggedIn">
      <div class="specificNav">
        <span><router-link to="/">Go Back</router-link></span>
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
          <div class="custom-select">

            <div class="custom-select-wrapper">
                <div class="custom-select">
                    <div class="custom-select__trigger"><span>Tesla</span>
                        <div class="arrow"></div>
                    </div>
                    <div class="custom-options">
                        <span class="custom-option selected" data-value="tesla">Tesla</span>
                        <span class="custom-option" data-value="volvo">Volvo</span>
                        <span class="custom-option" data-value="mercedes">Mercedes</span>
                    </div>
                </div>
            </div>

          </div>
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
                  <h5>{{ item }}</h5>
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
        <button type="button" name="button" @click="confirmWorkoutChnages()" id="confirmWorkoutButton">Confirm</button>
      </div>

      <!-- Modals -->
      <div class="modalBackgroundContainer" id="confirmDeleteModal">
        <div class="customModal">
          <h1>Are you sure you want to delete this?</h1>

          <button type="button" name="button" @click="deleteCurrentItem()">Yes</button>
          <button type="button" name="button" @click="deleteModalGoBack">No</button>
        </div>
      </div>

      <!-- Search for new activity modal -->
      <div class="searchForActivity" id="activityContainer">
        <div class="searchArea">
          <span class="searchInput">
            <input type="text" id="myInput" placeholder="Search exercises" v-on:keyup="search()">
            <i class="fas fa-search"></i>
          </span>
          <span class="exit" @click="goBackToCreateWorkout"><i class="fas fa-times"></i></span>
          <div class="filters">
            <button type="button">Strength</button>
            <button type="button">Cardio</button>
            <button type="button">At Home</button>
          </div>
        </div>

        <div class="searchResults" style="margin-top:35%">
          <ul id="myUL">
            <li v-for="(item, index) in activityList" :key="item.name">
              <div class="activityImage" v-bind:style="{background: 'url(' + item.image + ') no-repeat center center'}"></div>
              <div class="inner">
                <label><a>{{item.name}}</a></label>
                <label>Category</label>
              </div>
                <input type="checkbox" v-bind:name="item.name" :value="index" @click="bigger($event)">
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
      activityList: false
    }
  },
  created () {
    this.checkLoggedIn()
    var blankArray = []
    const v = this
    db.collection('preset-workouts').doc('activities').collection('list-of-activities').get().then(function (snapshot) {
      snapshot.forEach(function (doc) {
        const eachDoc = doc.data()
        blankArray.push(eachDoc)
      })
      v.activityList = blankArray
    })
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
      const name = e.target.name
      const value = e.target.value
      // This gets the checked item and appends it to the vue data array
      if (e.target.checked === true) {
        v.workoutActivitys.push(name)
        v.workoutDefaultRefrence.push(value)
      } else if (e.target.checked === false) {
        v.workoutActivitys = v.workoutActivitys.filter(e => e !== name)
        v.workoutDefaultRefrence = v.workoutDefaultRefrence.filter(e => e !== value)
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
    dropdown: function () {
      document.querySelector('.custom-select-wrapper').addEventListener('click', function () {
        this.querySelector('.custom-select').classList.toggle('open')
      })

      for (const option of document.querySelectorAll('.custom-option')) {
        option.addEventListener('click', function () {
          if (!this.classList.contains('selected')) {
            this.parentNode.querySelector('.custom-option.selected').classList.remove('selected')
            this.classList.add('selected')
            this.closest('.custom-select').querySelector('.custom-select__trigger span').textContent = this.textContent
          }
        })
      }
      window.addEventListener('click', function (e) {
        const select = document.querySelector('.custom-select')
        if (!select.contains(e.target)) {
          select.classList.remove('open')
        }
      })
    }
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
    color: grey;
    &:focus {
      outline: none;
      color: #000000;
    }
  }

  label {
    color: #000000;
    font-size: 15px;
  }

  .custom-select-wrapper {
       position: relative;
       user-select: none;
       width: 100%;
  }
   .custom-select {
       position: relative;
       display: flex;
       flex-direction: column;
       border-width: 0 2px 0 2px;
       border-style: solid;
       border-color: #394a6d;
  }
   .custom-select__trigger {
       position: relative;
       display: flex;
       align-items: center;
       justify-content: space-between;
       padding: 0 22px;
       font-size: 20px;
       font-weight: 300;
       color: #3b3b3b;
       height: 60px;
       line-height: 60px;
       background: #ffffff;
       cursor: pointer;
       border-width: 2px 0 2px 0;
       border-style: solid;
       border-color: #394a6d;
  }
   .custom-options {
       position: absolute;
       display: block;
       top: 100%;
       left: 0;
       right: 0;
       border: 2px solid #394a6d;
       border-top: 0;
       background: #fff;
       transition: all 0.5s;
       opacity: 0;
       visibility: hidden;
       pointer-events: none;
       z-index: 2;
  }
   .custom-select.open .custom-options {
       opacity: 1;
       visibility: visible;
       pointer-events: all;
  }
   .custom-option {
       position: relative;
       display: block;
       padding: 0 22px 0 22px;
       font-size: 22px;
       font-weight: 300;
       color: #3b3b3b;
       line-height: 60px;
       cursor: pointer;
       transition: all 0.5s;
  }
   .custom-option:hover {
       cursor: pointer;
       background-color: #b2b2b2;
  }
   .custom-option.selected {
       color: #ffffff;
       background-color: #305c91;
  }

.arrow {
     position: relative;
     height: 15px;
     width: 15px;
}
 .arrow::before, .arrow::after {
     content: "";
     position: absolute;
     bottom: 0px;
     width: 0.15rem;
     height: 100%;
     transition: all 0.5s;
}
 .arrow::before {
     left: -5px;
     transform: rotate(45deg);
     background-color: #394a6d;
}
 .arrow::after {
     left: 5px;
     transform: rotate(-45deg);
     background-color: #394a6d;
}
 .open .arrow::before {
     left: -5px;
     transform: rotate(-45deg);
}
 .open .arrow::after {
     left: 5px;
     transform: rotate(45deg);
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
    align-items: center;
    column-rule-color: green;
    margin-bottom: 10%;
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
        flex: 1;
        // flex-basis: 50%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        & div.activityImage {
          border-radius: 100px;
          background: url('../assets/background.jpg') no-repeat center center;
          background-size: cover;
          min-width: 2em;
          height: 2em;
          margin-right: 10%;
          flex: 0;
        }
        & div.activityTitle {
          flex: 1;
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
        flex: 1;
        max-width: 20%;
        // flex-basis: 50%;
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
    z-index: 50;
    & > .searchResults {
      & > ul {
        & > li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 5px;
          & > .activityImage {
            width: 40px;
            height: 40px;
            margin-right: 15px;
            background-size: cover !important;
          }
          & > .inner {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            & > :last-child {
              color: grey;
            }
            & > label {
              font-size: 18px;
              flex: 1;
              margin: 0;
            }
          }
          & > input {
            flex: 0;
            margin: 0;
          }
        }
      }
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
    z-index: 50;
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
    padding:5%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #FE5864;
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    & > .searchInput {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      & > svg {
        position: absolute;
        top: 10px;
        left: 10px;
      }
      & > input {
        border-radius: 100px;
        padding: 6px 35px;
        color: #000000;
        background-color: #ffffff;
        border: none;
        margin: 0;
     }
    }
    & > span.exit {
      cursor: pointer;
      &:hover > svg {
        transform: rotate(180deg);
      }
      & > svg {
        color: #ffffff;
        font-size: 30px;
        z-index: 10000;
        transform: rotate(0deg);
        transition: all 0.3s ease;
      }
    }
    & > .filters {
      flex-basis: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
      & > button {
        background: #FE5864;
        color: white;
        flex: 0 1 5em;
        font-size: 16px;
        padding: 2px 5px;
        margin-right: 12px;
      }
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
