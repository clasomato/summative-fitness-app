<template lang="html">
  <div class="pt-popup">
    <div class="red-box borderRadius boxShadow">
      <div class="top-section d-flex justify-content-around">
        <div class="pt-profile-image">
        </div>
        <div class="pt-description">
          <h3 class="pt-title">Cynthia Maxwell</h3>
          <p class="pt-info"> Personal Trainer Wel, NZ</p>
        </div>
        <div class="follow-icon">
          <i class="fas fa-user-plus fa-flip-horizontal fa-lg fa-2x"></i>
        </div>
      </div>
      <div class="bottom-section">
        <div class="view-workout-button borderRadius">
          <p class="button-message">View my workouts here</p>
        </div>
      </div>
<!-- font-weight-bold -->
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>

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

.red-box{
  height: 112px;
  width: 350px;
  background-color: $thirdRed;
  margin-top: 20px;
  margin-bottom: 20px;
}

.borderRadius {
  border-radius: 25px;
}

.boxShadow {
  -webkit-box-shadow: 10px 10px 19px -16px rgba(0,0,0,0.75);
  -moz-box-shadow: 10px 10px 19px -16px rgba(0,0,0,0.75);
  box-shadow: 10px 10px 19px -16px rgba(0,0,0,0.75);
}
.top-section{
  padding: 10px 10px 0px 10px;
}

.pt-profile-image{
  height: 50px;
  width: 50px;
  border-radius: 100px;
  background-color: $lightGreyColor;
}

.pt-description{
  color: white;
  text-align: left;
  font-size: $extraSmallText;
  padding-right: 40px;
}

.follow-icon{
  padding-right: 10px;
}

.pt-title{
  font-size: $smallText;
}

.pt-info{
  // font-size: $smallText;
}

.bottom-section{
  display: flex;
  justify-content: flex-end;
}

.view-workout-button{
  height: 25px;
  width: 165px;
  background-color: $fourthRed;
  margin-right: 20px;

}

.button-message{
  font-size: $extraSmallText;
  color: white;
  margin: 0px;
  padding-top: 2px;
}
</style>
