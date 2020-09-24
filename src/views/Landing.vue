<template lang="html">
  <div class="bgStyle">
    <div class="container flex-column landing-page d-flex justifyEvenly">
      <div>
        <img src="../assets/core-logo-color.png" alt="" class="logo padding">
      </div>
      <div class="paraTextStyle padding ralewayLight">
        <p>Work out anywhere anytime<br/>With a digital personal trainer</p>
      </div>
      <div class="align-self-center d-flex flex-column ralewayReg">
        <router-link type="button" class="btn text-center btnStyleLogin borderRadius" to="/login">Login</router-link>
        <router-link type="button" class="btn text-center btnStyleSignup btnMargin borderRadius" to="/sign-up">Sign Up</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bgStyle, .container {
  height: auto !important;
  min-height: 91.6vh !important;
  overflow: hidden;
}
</style>
