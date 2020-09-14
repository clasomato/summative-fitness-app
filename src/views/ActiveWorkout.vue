<template lang="html">
  <div class="active-workout">
    <h1 v-if="isLoggedIn">Active Workout</h1>
    <p else>You must <router-link to="/login">Login</router-link> or <router-link to="/sign-up">Signup</router-link> to view this page.</p>
  </div>
</template>

<script>
import store from '../store/index.js'

export default {
  name: 'ActiveWorkout',
  data () {
    return {
      isLoggedIn: false
    }
  },
  created () {
    this.isLoggedIn = store.getters.getLoginStatus
  }
}
</script>

<style scoped lang="scss">
</style>
