<template lang="html">
  <div class="nav-cont">
    <div class="inner">
      <h1>{{activePage}}</h1>
    <button class="hamburger hamburger--spin" v-bind:class="{isActive: hamIsActive}" @click="hamToggle" type="button">
      <span class="hamburger-box">
        <span class="hamburger-inner"></span>
      </span>
    </button>
    </div>
    <div id="nav">
      <div class="nav-inner" v-bind:class="{isActive: hamIsActive}">
        <span @click="navUpdateData('Login')"><router-link to="/login">Login</router-link></span>
        <span @click="navUpdateData('Sign Up')"><router-link to="/sign-up">Sign Up</router-link></span>
        <span @click="navUpdateData('Dashboard')"><router-link to="/">Dashboard</router-link></span>
        <!-- <span @click="navUpdateData('Create Workout')"><router-link to="/create-workout">Create Workout</router-link></span> -->
        <span @click="navUpdateData('Profile Page')"><router-link to="/profile-page">Profile Page</router-link></span>
        <!-- <span @click="navUpdateData('Landing')"><router-link to="/landing">Landing</router-link></span> -->
        <!-- <span @click="navUpdateData('About')"><router-link to="/about">About</router-link></span> -->
        <!-- <span @click="navUpdateData('Profile Setup')"><router-link to="/profile-setup">Profile Setup</router-link></span> -->
        <!-- <span @click="navUpdateData('Edit Workout')"><router-link to="/edit-workout">Edit Workout</router-link></span> -->
        <!-- <span @click="navUpdateData('Preview Workout')"><router-link to="/preview-workout">Preview Workout</router-link></span> -->
        <!-- <span @click="navUpdateData('Active Workout')"><router-link to="/active-workout">Active Workout</router-link></span> -->
        <!-- <span @click="navUpdateData('Workout List')"><router-link to="/workout-list">Workout List</router-link></span> -->
        <!-- <span @click="navUpdateData('Preset Workout')"><router-link to="/preset-Workout">Preset Workout</router-link></span> -->
        <!-- <span @click="navUpdateData('Play Workout')"><router-link to="/play-workout">Play Workout</router-link></span> -->
      </div>
    </div>
    <div @click="hamToggle" id="overlay" v-bind:class="{isActive: hamIsActive}"></div>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  data () {
    return {
      hamIsActive: false,
      activePage: ''
    }
  },
  created () {
    this.activePage = this.$route.name
  },
  watch: {
    $route () {
      this.activePage = this.$route.name
    }
  },
  methods: {
    hamToggle () {
      if (this.hamIsActive === false) {
        this.hamIsActive = true
      } else {
        this.hamIsActive = false
      }
    },
    navUpdateData (page) {
      if (this.hamIsActive === true) {
        this.hamIsActive = false
      } else {
        this.hamIsActive = true
      }
    }
  }
}
</script>

<style scoped lang="scss">

.nav-cont {
  top: 0;
  right: 0;
  width: 100%;
  height: 8.4vh;
  & > .inner {
    padding: 1% 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    & > h1 {
      color: #E65A6E;
      font-size: 30px;
      margin: 0 0 0 5%;
    }
  }
}

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
    font-size: 24px;
    color: white;
    pointer-events: all;
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
  z-index: 8;
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
