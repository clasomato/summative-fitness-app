<template lang="html">
  <div class="preview-workout">
    <div v-if="isLoggedIn">
      <h1>Preview Workout</h1>
      <PtPopup/>
    </div>
    <p else>You must <router-link to="/login">Login</router-link> or <router-link to="/sign-up">Signup</router-link> to view this page.</p>
  </div>
</template>

<script>
import store from '../store/index.js'

export default {
  name: 'PreviewWorkout',
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
