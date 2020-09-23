<template>
  <div class="dashboard">
    <!-- <Navigation/> -->
    <div v-if="isLoggedIn">
      <h1 style="">Choose your <br> workout today, {{userFirstName}}</h1>
      <div class="cards">
        <div class="inner" id="card-cont" v-bind:style="{ width: totalCards + 'px'}">
          <router-link to="/create-workout">
            <div class="card add-new">
              <i class="fas fa-plus"></i>
            </div>
          </router-link>
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

      <!-- <div class="addActivityModalContainer" style="display:none" id="activityContainerP">
        <div class="addActivityModal">
          <div class="searchForActivity" id="activityContainer">
            <div class="searchArea">
              <button type="button" name="button" @click="closeAndSendActivitys()">Close</button>
              <input type="text" id="myInput" name="" value="" v-on:keyup="search()" placeholder="Search...">
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
      </div> -->
      <!-- Search for new activity modal -->
      <div class="searchForActivity" id="activityContainerP">
        <div class="searchArea">
          <span class="searchInput">
            <input type="text" id="myInput" placeholder="Search exercises" v-on:keyup="search()">
            <i class="fas fa-search"></i>
          </span>
          <span class="exit" @click="closeAndSendActivitys()"><i class="fas fa-times"></i></span>
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
      items: '',
      selectedWorkout: false,
      selectedWorkoutItems: false,
      userEmail: this.$store.getters.getUserEmail,
      workoutActivitys: [],
      workoutDefaultRefrence: [],
      totalCards: '',
      // noActivitys: true,
      // oActivitys: false,
      activityList: false
      // userWorkouts: this.$store.getters.getUserWorkouts
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
  // updated () {
  //   this.checkLoggedIn()
  // },
  mounted () {
    const v = this
    var data = []
    var user = store.getters.getUserEmail
    db.collection('users').doc(user).collection('workouts').get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        const eachDoc = doc.data()
        data.push(eachDoc)
      })
      v.totalCards = (data.length + 1) * 155
    })
    v.items = data
    // this.items = this.$store.getters.getUserWorkouts
    // this.items = localStorage.getItem('userWorkouts')
    // this.totalCards = (this.items.length + 1) * 155
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
      // console.log(name)
      db.collection('users').doc(user).collection('workouts').doc(workoutName).collection('workoutDetails').doc(name).delete().then(function () {
        console.log('Document successfully deleted!')
        v.onChange()
      }).catch(function (error) {
        console.error('Error removing document: ', error)
      })
    },
    showAddNewActivity: function () {
      // console.log('add item')
      window.scrollTo(0, 0)
      $('#activityContainerP').show(100)
      const app = document.getElementById('app')
      app.style.maxHeight = '100vh'
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
    closeAndSendActivitys: function () {
      //    .log('add item')
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
      const app = document.getElementById('app')
      app.style.maxHeight = 'auto'
      this.onChange()
    },
    onChange: function () {
      // console.log('updating local data')
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

  h1 {
    padding-left: 5%;
  }
}

.cards {
  overflow-x: scroll;
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
  border: 0px solid black;
  width: 140px;
  float: left;
  margin: 15px;
  border-radius: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  padding: 1%;
  overflow: hidden;
  -webkit-box-shadow: 10px 10px 36px -16px rgba(0,0,0,0.75);
  -moz-box-shadow: 10px 10px 36px -16px rgba(0,0,0,0.75);
  box-shadow: 10px 10px 36px -16px rgba(0,0,0,0.75);

  & h3 {
    font-size: 16px;
    & span {
      font-size: 24px;
    }
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
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

#card-cont > a {
  padding: 0;
  & .card.add-new {
    cursor: pointer;
    background: transparent;
    border: 2px solid #FE5864;
    width: 140px;
    float: left;
    margin: 15px;
    border-radius: 1em;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    padding: 0%;
    overflow: hidden;
    -webkit-box-shadow: 0 0 0 -0 rgba(0,0,0,0);
    -moz-box-shadow: 0 0 0 0 rgba(0,0,0,0);
    box-shadow: 0px 0 0 0 rgba(0,0,0,0);
    & svg {
      width: 40px;
      height: 40px;
      color: #FE5864;
    }
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
        border: 0;
        text-align: center;
        border-radius: 100px;
        margin-top: 5%;
        background: #FC7784;
        color: white;
        flex: 0 1 5em;
        font-size: 16px;
        padding: 2px 5px;
        margin-right: 12px;
      }
    }
  }

  .searchForActivity {
    width: 100%;
    min-height: 100vh;
    overflow-y: scroll;
    background-color: white;
    position: absolute;
    top: 0;
    left: 0;
    padding: 5%;
    display: none;
    z-index: 100;
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
