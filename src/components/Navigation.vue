<template lang="html">
  <div>
    <button class="hamburger hamburger--spin" v-bind:class="{isActive: hamIsActive}" @click="hamToggle" type="button">
      <span class="hamburger-box">
        <span class="hamburger-inner"></span>
      </span>
    </button>
    <div id="nav">
      <div class="nav-inner" v-bind:class="{isActive: hamIsActive}">
        <router-link to="/">Dashboard</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/sign-up">Sign Up</router-link>
        <router-link to="/login">Login</router-link>
        <router-link to="/profile-setup">Profile Setup</router-link>
        <router-link to="/create-workout">Create Workout</router-link>
        <router-link to="/edit-workout">Edit Workout</router-link>
        <router-link to="/preview-workout">Preview Workout</router-link>
        <router-link to="/active-workout">Active Workout</router-link>
        <router-link to="/workout-list">Workout List</router-link>
      </div>
    </div>
    <div id="overlay" v-bind:class="{isActive: hamIsActive}"></div>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  data () {
    return {
      hamIsActive: false
    }
  },
  methods: {
    hamToggle () {
      if (this.hamIsActive === false) {
        this.hamIsActive = true
      } else {
        this.hamIsActive = false
      }
    }
  }
}
</script>

<style scoped lang="scss">

div.nav-inner {
  opacity: 0;
  z-index: 9;
  position: absolute;
  top: 0;
  right: -100%;
  transition: all 0.3s ease;
  background-color: #E65A6E;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 20% 10% 10% 20%;
  box-shadow: 0px 0px 30px rgba(0,0,0,0.2);
  & :not(:last-child) {
    margin-bottom: 5%;
  }
  & a {
    font-size: 20px;
    color: white;
    &.router-link-exact-active {
      color: #E65A6E;
      background-color: white;
      padding: 1px 8px;
    }
  }
  &.isActive {
    opacity: 1;
    right: 0;
    transition: all 0.3s ease;
  }
}

#overlay {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  pointer-events: none;
  width: 100vw;
  height: 100%;
  background-color: rgba(0,0,0,0.8);
  transition: all 0.3s ease;
  &.isActive {
    opacity: 1;
    pointer-events: all;
    transition: all 0.3s ease;
  }
}

button, button:focus {
  outline: none !important;
}

</style>
