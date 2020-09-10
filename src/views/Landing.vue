<template lang="html">
  <div class="container flex-column landing-page d-flex justifyEvenly">
    <div>
      <img src="../assets/core-logo-color.png" alt="" class="logo padding">
    </div>
    <div class="paraTextStyle padding">
      <p>Welcome to CORE</p>
    </div>
    <div class="align-self-center d-flex flex-column">
      <router-link type="button" class="btn text-center btnStyle" to="/login">Login</router-link>
      <router-link type="button" class="btn text-center btnStyle btnMargin" to="/sign-up">Sign Up</router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">

.btnStyle {
  width: 150px;
  color: #FFFFFF;
  background-color: #343A40;
  border-radius: 30px;
  font-family: 'Roboto', sans-serif;
  width: 250px;
}

.btnMargin {
  margin-top: 25px;
}

.logo {
  width: 250px;
  height: auto;
}

.paraTextStyle {
  font-family: 'Roboto', sans-serif;
  color: #6C757D;
  font-size: 20px;
}

.justifyEvenly {
  display: flex;
  justify-content: space-evenly;
}

.container {
  height: 100%;
  background-color: #DADADA;
}
</style>
