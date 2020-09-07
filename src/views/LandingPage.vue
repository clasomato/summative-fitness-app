<template lang="html">
  <div class="landing-page">
    <img src="../assets/core-logo-color.png" alt="Core Logo">
    <div class="btn-cont">
      <router-link class="btn btn-red" to="/login">Login</router-link>
      <router-link class="btn btn-dark" to="/sign-up">Sign Up</router-link>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped lang="scss">
*, *::before, *::after {
  box-sizing: border-box;
}

.landing-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & img {
    max-width: 200px;
    margin-bottom: 15%;
  }
  & .btn-cont {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    & :not(:last-child) {
      margin-bottom: 10%;
    }
    a.btn {
      padding: 12px 0;
      width: 100%;
      border-radius: 100px;
      color: white;
      text-decoration: none;
      &.btn-red {
        background-color: #E65A6E;
      }
      &.btn-dark {
        background-color: #383838;
      }
    }
  }
}
</style>
