<template lang="html">
  <div class="preset-workout">
      <div class="top-section">
        <div class="d-flex justify-content-around">
          <PtPopup/>
        </div>
          <div class="d-flex justify-content-around">
            <div class="squareButton borderRadius boxShadow">
              <div class="kcal-description">
                <p class="kcal-number">92</p>
                <p class="kcal-title">Kcal</p>
              </div>
            </div>
              <div class="squareButton borderRadius boxShadow">
                <div class="duration-description">
                  <p class="duration-number">20m</p>
                  <p class="duration-title">Duration</p>
                </div>
              </div>
                <div class="squareButton borderRadius boxShadow">
                  <div class="level-description">
                    <div class="level-icon">
                      <i class="fas fa-signal"></i>
                    </div>
                    <p class="level-title">Level</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="bottom-section">
                <div class="heading">
                  <h3 class="workout-title">Lower Body |</h3>
                  <h4 class="workout-time-description">20mins</h4>
                  </div>
                  <div class="workout">
                  <div class="white-box borderRadius boxShadow">
                    <div class="spacing-top">
                    </div>
                    <div class="activity">
                      <div class="activity-one-image image">
                      </div>
                      <div class=" d-flex justify-content-between">
                      <div class="description col-9">
                        <h3 class="activity-one-title title">Leg Lunges - 3 reps</h3>
                        <p class="activity-one-info info">Strength</p>
                      </div>
                      <div class="rest-period col">
                        <p class="activity-one-rest-period">40 secs</p>
                      </div>
                      </div>
                    </div>
                    <div class="spacing">
                    </div>
                    <div class="activity">
                      <div class="activity-two-image image">
                      </div>
                      <div class=" d-flex justify-content-between">
                      <div class="description col-9">
                        <h3 class="activity-two-title title">Dumbbell Squat - 5 reps</h3>
                        <p class="activity-two-info info">Strength</p>
                      </div>
                      <div class="rest-period col">
                        <p class="activity-two-rest-period">30 secs</p>
                      </div>
                      </div>
                    </div>
                    <div class="spacing">
                    </div>
                    <div class="activity">
                      <div class="activity-three-image image">
                      </div>
                      <div class=" d-flex justify-content-between">
                      <div class="description col-9">
                        <h3 class="activity-three-title title">Hamstring Curl - 5 reps</h3>
                        <p class="activity-three-info info">Strength</p>
                      </div>
                      <div class="rest-period col">
                        <p class="activity-three-rest-period">30 secs</p>
                      </div>
                      </div>
                    </div>
                    <div class="spacing">
                    </div>
                    <div class="activity">
                      <div class="activity-four-image image">
                      </div>
                      <div class=" d-flex justify-content-between">
                      <div class="description col-9">
                        <h3 class="activity-four-title title">Box Jump - 3 reps</h3>
                        <p class="activity-four-info info">cardio</p>
                      </div>
                      <div class="rest-period col">
                        <p class="activity-four-rest-period">60 secs</p>
                      </div>
                      </div>
                    </div>
                    <div class="spacing">
                    </div>
                    <div class="activity">
                      <div class="activity-five-image image">
                      </div>
                      <div class=" d-flex justify-content-between">
                      <div class="description col-9">
                        <h3 class="activity-five-title title">Calf Raise - 3 reps</h3>
                        <p class="activity-five-info info">Strength</p>
                      </div>
                      <div class="rest-period col">
                        <p class="activity-five-rest-period">30 secs</p>
                      </div>
                      </div>
                    </div>
                    <div class="spacing-bottom">
                    </div>
                  </div>
              </div>
                <div class="button">
                  <div class="PlayButton borderRadius boxShadow">
                    <div class="Play-button-content">
                      <div class="play-icon">
                        <i class="fas fa-play"></i>
                      </div>
                      <p class="play-title">Play</p>
                    </div>
                  </div>
              </div>
            </div>
          </div>
</template>

<script>
import store from '../store/index.js'
import PtPopup from '../components/PtPopup.vue'

export default {
  name: 'PresetWorkout',
  data () {
    return {
      isLoggedIn: false
    }
  },
  created () {
    this.isLoggedIn = store.getters.getLoginStatus
  },
  components: {
    PtPopup
  }
}
</script>

<style scoped lang="scss">
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

.borderRadius {
  border-radius: 30px;
}

.boxShadow {
  -webkit-box-shadow: 10px 10px 19px -16px rgba(0,0,0,0.75);
  -moz-box-shadow: 10px 10px 19px -16px rgba(0,0,0,0.75);
  box-shadow: 10px 10px 19px -16px rgba(0,0,0,0.75);
  }

.squareButton {
    height: 100px;
    width: 100px;
    background-color: white;
    color: black;
  }

  .button{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .PlayButton {
      height: 75px;
      width: 77px;
      background-color: $thirdRed;
      color: white;
      margin-top: 30px;
      font-size: $extraSmallText
    }

  .Play-button-content{
    text-align: center;
    padding: 20px 0px;
  }

  .kcal-description, .duration-description, .level-description {
    padding: 5px;
  }

  .kcal-number, .duration-number, .level-icon {
    font-size: $largeText;
    margin: 10px 0px 0px 0px;
  }

  .kcal-title, .duration-title, .level-title {
    font-size: $smallText;
  }

  .heading{
    display: flex;
    justify-content: flex-start;
    margin: 40px 25px 0px 25px;
  }

  .workout-title {
    font-size: $smallText;
  }

  .workout-time-description {
    font-size: $extraSmallText;
    padding-top: 4px;
    margin-left: 10px;
  }

  .white-box {
    height: auto;
    width: 344px;
    background-color: white;
    border-radius: 30px;
  }

  .workout {
  display: flex;
  justify-content: center;
  align-items: center;
  }

  .activity {
    display: flex;
    padding: 10px 10px 0px 20px;
    border-radius: 30px 0px 0px 30px;
    background-color: $offWhite;
    margin-left: 10px;
  }

  .spacing{
    height: 20px;
    background-color: white;
  }

  .spacing-top{
    height: 20px;
    background-color: white;
    border-radius: 30px 30px 0px 0px;
  }

  .spacing-bottom{
    height: 20px;
    background-color: white;
    border-radius: 0px 0px 30px 30px;
  }

  .image {
    height: 50px;
    width: 50px;
    border-radius: 100px;
    background-color: $lightGreyColor;
    margin-right: 10px;
  }

  .description {
    text-align: left;
    font-size: $extraSmallText;
    width: 180px;
  }

  .title {
    font-size: $extraSmallText;
  }

  .rest-period {
    font-size: $extraSmallText;
  }
</style>
