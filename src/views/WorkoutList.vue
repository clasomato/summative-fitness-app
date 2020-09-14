<template lang="html">
  <div class="workout-list">
    <div v-if="isLoggedIn">
      <h1>Workout List</h1>
    </div>
    <p else>You must <router-link to="/login">Login</router-link> or <router-link to="/sign-up">Signup</router-link> to view this page.</p>
  </div>
</template>

<script>
import store from '../store/index.js'

export default {
  name: 'WorkoutList',
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
