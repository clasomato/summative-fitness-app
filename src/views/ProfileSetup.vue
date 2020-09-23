<template lang="html"> <!--Last Updated By Solomon / Thu 17th / 11:30-->

<!-- Bootstrap has a 12 col grid setup -->
<!-- Div class row must be used when dealing with cols. Additional col classes may be added to cater for different screen sizes -->
<!-- col = 576px or less (mobile), col-sm = 576px or more (tablet), col-md = 768px or more (large tablet, small laptop)
  col-lg = 992px or more (laptop, desktop) and col-xl = 1200px or more (desktop) -->

<div class="container">
  <div class="row">
    <div class="title col-12">Profile Setup...</div>

    <div class="spacebetween col-1"></div>
    <div class="age col-5">Age:</div>
    <div class="gender col-6">Gender:</div>

    <div class="spacebetween col-1"></div>
    <div class="ageinput col-5">
      <input type="date" id="birthday" name="birthday">
    </div>
    <div class="genderselect col-6">
      <button type="button" id="dropdown-1" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
        Male
      </button>
      <div class="dropdown-menu">
        <li><a class="dropdown-item dropdown-item-1" id="gender-selection">Male</a></li>
        <li><a class="dropdown-item dropdown-item-1" id="gender-selection">Female</a></li>
        <li><a class="dropdown-item dropdown-item-1" id="gender-selection">Other</a></li>
      </div>
    </div>

    <div class="spacebetween col-1"></div>
    <div class="currentweight col-5">Current Weight:</div>
    <div class="height col-6">Height:</div>

    <div class="spacebetween col-1"></div>
    <div class="weightinput col-5"><input type="number" class="form-control" placeholder="95kg" id="weightinputid"></div>
    <div class="heightinput col-5"><input type="number" class="form-control" placeholder="195cm" id="heightinputid"></div>
    <div class="spacebetween col-1"></div>

    <div class="spacebetween col-1"></div>
    <div class="goalweight col-5">Goal Weight:</div>
    <div class="activity col-6">Activity Level:</div>

    <div class="spacebetween col-1"></div>
    <div class="goalinput col-5"><input type="number" class="form-control" placeholder="85kg" id="goalinputid"></div>
    <div class="activityselect col-6">
      <button type="button" id="dropdown-2" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
        Sedentary
      </button>
      <div class="dropdown-menu">
        <a class="dropdown-item dropdown-item-2">Sedentary</a>
        <a class="dropdown-item dropdown-item-2">Moderate</a>
        <a class="dropdown-item dropdown-item-2">Vigorous</a>
      </div>
    </div>

      <div class="spacebetween col-1"></div>
      <div class="skip col-4"><button type="button" id="skip" class="btn btn-primary">Skip</button></div>
      <div class="cont col-5"><button type="button" id="continue" class="btn btn-primary" v-on:click="getAllInfo">Continue</button></div>
      <div class="spacebetween col-2"></div>
    </div>
  </div>
</template>

<script>
import store from '../store/index.js'
import db from '../firebase.js'
import startupScript from '../startupScript.js'
import $ from 'jquery'

console.log(store, db, startupScript, $)

export default {
  name: 'Dashboard',
  data () {
    return {
      age: '',
      gender: '',
      currWeight: '',
      height: '',
      goalWeight: '',
      activity: ''
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
  mounted () {
    console.log($('#dropdown'))
    $('#dropdown').on('click', function () { // On-click show menu
      $('.dropdown-menu').css('opacity', 1)
    }) // jQuery on-click function ENDS

    $('.dropdown-item-1').on('click', function (event) {
      var btnObj = $(this).parent().siblings('button')
      $(btnObj).text($(this).text())
      $(btnObj).val($(this).text())
      var clickedElementText = event.target.text
      $('#dropdown-1').text(clickedElementText)
    })

    $('.dropdown-item-2').on('click', function (event) {
      var btnObj = $(this).parent().siblings('button')
      $(btnObj).text($(this).text())
      $(btnObj).val($(this).text())
      var clickedElementText = event.target.text
      $('#dropdown-2').text(clickedElementText)
    })
  },
  methods: {
    checkLoggedIn () {
      this.isLoggedIn = this.$store.getters.getLoginStatus
      if (this.isLoggedIn === false) {
        startupScript.checkLocalStorage()
        this.isLoggedIn = true
      } else {
        console.log('not loggenin')
      }
      this.userFirstName = this.$store.getters.getUserFirstName
    },
    getAllInfo: function () {
      var user = store.getters.getUserEmail
      var dateInfo = document.getElementById('birthday').value
      console.log(dateInfo)
      var genderInfo = document.getElementById('dropdown-1').value
      console.dir(genderInfo.textContent)
      var currentWeight = document.getElementById('weightinputid').value
      console.log(currentWeight + 'kg')
      var heightInfo = document.getElementById('heightinputid').value
      console.log(heightInfo + 'cm')
      var goalWeight = document.getElementById('goalinputid').value
      console.log(goalWeight + 'kg')
      var activityInfo = document.getElementById('dropdown-2').value
      console.dir(activityInfo.textContent)

      console.log(user)

      // Add a new document in collection "cities"
      db.collection('users').doc(user).set({
        age: dateInfo,
        gender: genderInfo,
        currWeight: currentWeight,
        height: heightInfo,
        goalWeight: goalWeight,
        activity: activityInfo
      })
        .then(function () {
          console.log('Document successfully written!')
          this.$router.push('/')
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    }
  }
}

</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
// Color Palette
$firstRed: #FA505B;
$secondRed: #FE5864;
$thirdRed: #FC7784;
$fourthRed: #F9A2AB;
$offWhite: #F0F4F7;
$lightGreyColor: #6C757D;
$darkGreyColor: #343A40;

// Font Sizes
$extraSmallText: 14px;
$smallText: 20px;
$mediumText: 25px;
$largeText: 30px;

.container {
  background-color: $offWhite;
}

#birthday {
  width: 125px;
  height: 40px;
  font-size: 16px;
  color: #495057;
  border: 1px solid #ced4da;
  text-align: center;
}

::-webkit-calendar-picker-indicator {
  font-size: 16px;
  margin-left: 3px;
}

.title {
  margin-top: 50px;
  font-size: 36px;
  font-family: 'Roboto', sans-serif;
  padding-right: 50px;
  color: $thirdRed;
}

.age {
  margin-top: 50px;
  padding-right: 95px;
}

.ageinput {
  margin-top: 5px;
}

.gender {
  margin-top: 50px;
  padding-right: 105px;
}
.genderselect {
  padding-right: 50px;
  margin-top: 5px;
}

.currentweight {
  margin-top: 50px;
  padding-right: 20px;
}

.weightinput {
  margin-top: 5px;
}

.height {
  margin-top: 50px;
  padding-right: 110px;
}

.heightinput {
  margin-top: 5px;
}

.goalweight {
  margin-top: 50px;
  padding-right: 40px;
}

.goalinput {
  margin-top: 5px;
}

.activity {
  margin-top: 50px;
  padding-right: 60px;
}

.activityselect {
  margin-top: 5px;
  padding-right: 50px;
}

.skip {
  margin-top: 150px;
  font-size: 20px;
  border-radius: 25px;
}

.cont {
  margin-top: 150px;
  font-size: 20px;
  border-radius: 25px;
}

.dropdown-toggle::after {
  float: right;
  margin-top: 8px;
}

.dropdown-menu {
display: none;
animation: formFade 1s ease-in-out;
-moz-animation: formFade 1s ease-in-out; /* Firefox */
-webkit-animation: formFade 1s ease-in-out; /* Safari and Chrome */
-o-animation: formFade 1s ease-in-out; /* Opera */
}

@keyframes formFade {
from {
    opacity:0;
}
to {
    opacity:1;
}
}
@-moz-keyframes formFade { /* Firefox */
from {
    opacity:0;
}
to {
    opacity:1;
}
}
@-webkit-keyframes formFade { /* Safari and Chrome */
from {
    opacity:0;
}
to {
    opacity:1;
}
}
@-o-keyframes formFade { /* Opera */
from {
    opacity:0;
}
to {
    opacity: 1;
}
}

#dropdown-1, #dropdown-2 {
  background-color: $secondRed;
  border-color: $secondRed;
  text-align: left;
  height: 40px;
  width: 125px;
}

#skip {
  font-size: 20px;
  font-size: 20px;
  border-radius: 25px;
  border-color: #fff;
  background: #fff;
  color: $firstRed;
  width: 115px;
  height: 40px;
  padding: 4px;
}

#continue {
  font-size: 20px;
  font-size: 20px;
  border-radius: 25px;
  border-color: $firstRed;
  background: $firstRed;
  color: #fff;
  width: 160px;
  height: 45px;
  margin-left: 10px;
  margin-bottom: 143px;
}
</style>
