<template>
  <div class="play-workout">

    <div class="progress-bar-section">

      <progress-bar bar-color="#FA505B" size="large" v-bind:val="progressBarPercentage" v-bind:text="percentageValueWholeNumber"></progress-bar>
    </div>

    <div class="activity-section">
      <h2 class="col-7 activity-name">Leg Lunges</h2>
      <div class="image-placeholder box-shadow"></div>

      <div class="button-section d-flex justify-content-around">
        <div class="rest-counter d-flex">
          <div class="countdown-timer custom-ctdwn-btn box-shadow">
            <p>42s</p>
          </div>
          <div class="rest-button custom-rest-btn box-shadow">
            <i class="far fa-clock fa-lg"></i>
            <p>Rest</p>
          </div>
        </div>
        <div class="pause-button square-button border-radius box-shadow">
          <i class="fas fa-pause fa-lg"></i>
          <p>Pause</p>
        </div>
        <div @click="updateProgressBarPercentageOnClick(percentageValue)" class="next-button square-button border-radius box-shadow">
          <i class="fas fa-arrow-right fa-lg"></i>
          <p>Next</p>
        </div>
      </div>
    </div>

    <div class="muscle-group-card border-radius d-flex box-shadow">
      <div class="">
        <div class="excercise-gif"></div>
      </div>
      <div class="muscle-group-text text-left">
        <div class="">
          <p class="font-weight-bold">Primary<br><span class="font-weight-normal">Quadraceps, Glutes</span></p>
        </div>
        <div class="">
          <p class="font-weight-bold">Secondary<br><span class="font-weight-normal">Hamstrings</span></p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import ProgressBar from 'vue-simple-progress'
import store from '../store/index.js'
import db from '../firebase.js'
import startupScript from '../startupScript.js'

export default {
  name: 'PlayWorkout',
  data () {
    return {
      items: false,
      progressBarPercentage: false,
      percentageValueWholeNumber: false,
      percentageMultiplier: false,
      indexReferenceCounter: 1
    }
  },
  created () {
    this.checkLoggedIn()
  },
  mounted () {
    // This variable retrieves the active user email, if loged in
    const v = this
    // this varible gets and stores the users email
    var user = store.getters.getUserEmail
    // this variable is set up as an empty array, for data to be returned to
    var data = []
    // This is a querySnapshot function used to retrieve the users workout list & workout data,
    // then pushes the result to the vue data property "items"
    db.collection('users').doc(user).collection('workouts').get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        const eachDoc = doc.data()
        data.push(eachDoc)
      })
      // pushing data to vue object data "items"
      v.items = data
      // Calling the function after the mounted function has finished
      v.calculateProgressBarPercentage()
    })
  },
  // Incorporating ProgressBar plugin to the vue components
  components: {
    ProgressBar
  },
  // Creating new vue props and specifying the data values
  props: {
    text: [String]
  },
  methods: {
    checkLoggedIn () {
      const a = startupScript.checkLocalStorage()
      if (a === true) {
        this.isLoggedIn = true
      } else {
        this.isLoggedIn = false
        this.$router.push('login')
      }
    },
    // This function calculates the progress bar percentage value,
    // it takes the active workout array and devides 100 by the length of the workout array
    calculateProgressBarPercentage () {
      const v = this
      // variable calculating the percentage value and storing it
      var percentageValue = 100 / v.items[1].workouts.length
      // pushing the percentageValue variable to the vue object data "progressBarPercentage"
      v.progressBarPercentage = percentageValue
      v.percentageMultiplier = percentageValue
      // pushing the percentageValue variable to the vue object data  "percentageValueWholeNumber",
      // after the percentageValue has been rounded up to a whole number and converted into a string
      v.percentageValueWholeNumber = Math.round(percentageValue).toString()
    },
    // This function incrementally changes the value of the progress bar percentage,
    // It takes the indexReferenceCounter to create a reference of the listNumber and mulitiplies that
    // number by the percentageMultiplier //
    updateProgressBarPercentageOnClick (percentageValue) {
      const v = this
      // creating a variable that is equal to indexReferenceCounter + 1
      var listNumber = v.indexReferenceCounter + 1
      // recalculating the progressBarPercentage vue data object
      v.progressBarPercentage = listNumber * v.percentageMultiplier
      // increasing the indexReferenceCounter by adding a value of 1
      v.indexReferenceCounter = v.indexReferenceCounter + 1
      console.log(v.progressBarPercentage)
    }
  }
}

</script>

<style scoped lang="scss">

// Font Colours
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

.text-container {
  width: 250px;
}
//Page background CSS
.play-workout {
  background-color: $offWhite;
}
//Box styling
.box-shadow {
  -webkit-box-shadow: 10px 10px 19px -16px rgba(0,0,0,0.75);
    -moz-box-shadow: 10px 10px 19px -16px rgba(0,0,0,0.75);
    box-shadow: 10px 10px 19px -16px rgba(0,0,0,0.75);
}
.border-radius {
  border-radius: 30px;
}

// progressbar CSS
  .progress-bar-section {
    margin: 20px;
    font-size: $extraSmallText;
  }
  .progress{
    margin-bottom: 10px;
  }
  .vue-simple-progress-bar {
    background: $firstRed !important;
  }

  // activity Section css
  .activity-name {
    color: $secondRed;
  }
  .image-placeholder {
    height: 220px;
    width: 100%;
    background-color: grey;
  }
  .button-section {
    margin-top: 40px;
    margin-left: 5px;
    margin-right: 5px;
  }
  .square-button {
    height: 80px;
    width: 80px;
    background-color: $thirdRed;
    color: white;
  }
  .custom-ctdwn-btn {
    height: 80px;
    width: 80px;
    border-radius: 30px 0px 0px 30px;
    font-size: $largeText;
    padding-top: 18px;
    background-color: white;
  }
  .custom-rest-btn {
    height: 80px;
    width: 80px;
    border-radius: 0px 30px 30px 0px;
    background-color: $thirdRed;
    color: white;
  }

  // Icon CSS
  .fa-clock,
  .fa-pause,
  .fa-arrow-right {
    color: #FFF;
    margin-top: 20px;
  }

  // Muscle group card CSS
  .muscle-group-card {
    padding: 20px;
    margin: 20px;
    margin-top: 40px;
    background-color: white;
  }
  .muscle-group-text {
    font-size: $extraSmallText;
  }
  .excercise-gif {
    height: 100px;
    width: 100px;
    background-color: lightgrey;
    margin-right: 20px;
  }
  p {
    margin-bottom: 0px;
  }
</style>
