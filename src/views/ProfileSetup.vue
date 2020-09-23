<template lang="html">

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
    <div class="ageinput col-5"><input type="number" class="form-control" placeholder="30" id="ageinputid"></div>
    <div class="genderselect col-6">
      <button type="button" id="dropdown" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
        Male‏‏‎ ‎‏‏‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎
      </button>
      <div class="dropdown-menu">
        <a class="dropdown-item">Male</a>
        <a class="dropdown-item">Female</a>
        <a class="dropdown-item">Other</a>
      </div>
    </div>

    <div class="spacebetween col-1"></div>
    <div class="currentweight col-5">Current Weight:</div>
    <div class="height col-6">Height:</div>

    <div class="spacebetween col-1"></div>
    <div class="weightinput col-5"><input type="text" class="form-control" placeholder="95kg" id="weightinputid"></div>
    <div class="heightinput col-5"><input type="text" class="form-control" placeholder="195cm" id="heightinputid"></div>
    <div class="spacebetween col-1"></div>

    <div class="spacebetween col-1"></div>
    <div class="goalweight col-5">Goal Weight:</div>
    <div class="activity col-6">Activity Level:</div>

    <div class="spacebetween col-1"></div>
    <div class="goalinput col-5"><input type="text" class="form-control" placeholder="85kg" id="goalinputid"></div>
    <div class="activityselect col-6">
      <button type="button" id="dropdown" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
        Sedentary ‎ ‎
      </button>
      <div class="dropdown-menu">
        <a class="dropdown-item">Sedentary</a>
        <a class="dropdown-item">Moderate</a>
        <a class="dropdown-item">Vigorous</a>
      </div>
    </div>

      <div class="spacebetween col-1"></div>
      <div class="skip col-4"><button type="button" id="skip" class="btn btn-primary">Skip</button></div>
      <div class="cont col-5"><button type="button" id="continue" class="btn btn-primary">Continue</button></div>
      <div class="spacebetween col-2"></div>
    </div>
  </div>
</template>

<script>
import startupScript from '../startupScript.js'

export default {
  data () {
    return {

    }
  },
  created () {
    this.checkLoggedIn()
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
  margin-top: 5px;
  padding-right: 50px;
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

#dropdown {
  background-color: $secondRed;
  border-color: $secondRed;
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
