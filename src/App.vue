<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Dashboard</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/sign-up">Sign Up</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/profile-setup">Profile Setup</router-link> |
      <router-link to="/create-workout">Create Workout</router-link> |
      <router-link to="/edit-workout">Edit Workout</router-link> |
      <router-link to="/preview-workout">Preview Workout</router-link> |
      <router-link to="/active-workout">Active Workout</router-link> |
      <router-link to="/workout-list">Workout List</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
