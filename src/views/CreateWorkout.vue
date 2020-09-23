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
            <select class="" name="options" id="dificultyOptions">
              <option value="0">Beginner</option>
              <option value="1">Intermediate</option>
              <option value="2">Advanced</option>
            </select>
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
      console.log(v.activityList)
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
      var x, i, j, l, ll, selElmnt, a, b, c
      /* Look for any elements with the class 'custom-select': */
      x = document.getElementsByClassName('custom-select')
      l = x.length
      for (i = 0; i < l; i++) {
        selElmnt = x[i].getElementsByTagName('select')[0]
        ll = selElmnt.length
        /* For each element, create a new DIV that will act as the selected item: */
        a = document.createElement('DIV')
        a.setAttribute('class', 'select-selected')
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML
        x[i].appendChild(a)
        /* For each element, create a new DIV that will contain the option list: */
        b = document.createElement('DIV')
        b.setAttribute('class', 'select-items select-hide')
        for (j = 1; j < ll; j++) {
          /* For each option in the original select element,
          create a new DIV that will act as an option item: */
          c = document.createElement('DIV')
          c.innerHTML = selElmnt.options[j].innerHTML
          c.addEventListener('click', function (e) {
            /* When an item is clicked, update the original select box,
            and the selected item: */
            var y, i, k, s, h, sl, yl
            s = this.parentNode.parentNode.getElementsByTagName('select')[0]
            sl = s.length
            h = this.parentNode.previousSibling
            for (i = 0; i < sl; i++) {
              if (s.options[i].innerHTML === this.innerHTML) {
                s.selectedIndex = i
                h.innerHTML = this.innerHTML
                y = this.parentNode.getElementsByClassName('same-as-selected')
                yl = y.length
                for (k = 0; k < yl; k++) {
                  y[k].removeAttribute('class')
                }
                this.setAttribute('class', 'same-as-selected')
                break
              }
            }
            h.click()
          })
          b.appendChild(c)
        }
        x[i].appendChild(b)
        a.addEventListener('click', function (e) {
          /* When the select box is clicked, close any other select boxes,
          and open/close the current select box: */
          e.stopPropagation()
          closeAllSelect(this)
          this.nextSibling.classList.toggle('select-hide')
          this.classList.toggle('select-arrow-active')
        })
      }

      function closeAllSelect (elmnt) {
        /* A function that will close all select boxes in the document,
        except the current select box: */
        var x
        var y
        var i
        var xl
        var yl
        var arrNo = []
        x = document.getElementsByClassName('select-items')
        y = document.getElementsByClassName('select-selected')
        xl = x.length
        yl = y.length
        for (i = 0; i < yl; i++) {
          if (elmnt === y[i]) {
            arrNo.push(i)
          } else {
            y[i].classList.remove('select-arrow-active')
          }
        }
        for (i = 0; i < xl; i++) {
          if (arrNo.indexOf(i)) {
            x[i].classList.add('select-hide')
          }
        }
      }

      /* If the user clicks anywhere outside the select box,
      then close all select boxes: */
      document.addEventListener('click', closeAllSelect)
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

  .custom-select {
    position: relative;
    & select {
      display: none;
      border: none;
      background-color: inherit;
      font-size: 1.2em;
      border-bottom: 2px solid #FE5864;
    }
    & .select-selected {
      background-color: red;
      &:after {
        position: absolute;
        content: "";
        top: 14px;
        right: 10px;
        width: 0;
        height: 0;
        border: 6px solid transparent;
        border-color: #fff transparent transparent transparent;
      }
      &.select-arrow-active:after {
        border-color: transparent transparent #fff transparent;
        top: 7px;
      }
    }
    & .select-items {
      position: absolute;
      background-color: DodgerBlue;
      top: 100%;
      left: 0;
      right: 0;
      z-index: 99;
      & div, .select-selected {
        color: #ffffff;
        padding: 8px 16px;
        border: 1px solid transparent;
        border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;
        cursor: pointer;
      }
      & div:hover, .same-as-selected {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
    & .select-hide {
      display: none;
    }
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
    display: flex;
    justify-content: space-between;

    button, input {

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
