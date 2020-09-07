<template>
  <div class="dashboard">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <h1 style="">Choose your <br> workout today</h1>
    <div class="cards">
      <div class="card">
        <img src="../assets/plus-solid.svg" alt="">
      </div>

      <div class="card">
        <h3>Workout <br> <span>legblast</span> </h3>
      </div>
    </div>

    <div class="workout">
      <h2>Workout <span id="workoutName" style="font-weight:bold">Leg Blast</span></h2>

      <div class="workoutItems">
        <div class="workoutItem">
          <div class="circle"></div>
          <h2>Leg Bridge</h2>
          <h3>30 sec</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Dashboard',
  components: {
    HelloWorld
  }
}
</script>

<style lang="scss">
  #app {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  body {
    background-color: #FFFFFF;
    margin: 0;
  }
  p, h1, h2, h3, h4 {
    color: #6C757D;
  }
  span {
    color:#343A40;
  }
  .dashboard {
    box-sizing: border-box;
    text-align: left;
    // padding: 5%;

    h1 {
      padding-left: 5%;
    }
  }

  .cards {
    overflow: hidden;
    // width: 100%;
    padding-left: 5%;
  }

  .card {
    // padding: 21% 6%;
    border: 1px solid black;
    width: 35%;
    float: left;
    margin: 1%;
    border-radius: 1em;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;

    img {
      width: 50%;
    }
  }

  .workout {
    padding-left: 5%;
  }

  .workoutItems {
    width: 90%;
    float: right;

  }

  .workoutItem {
    width: 90%;
    background-color: darkgrey;
    padding: 5%;
    border-bottom-left-radius: 10em;
    border-top-left-radius: 10em;

    display: flex;
    justify-content: space-between;
    align-items: center;

    h2,h3 {
      padding: 0;
      margin: 0;
    }
  }

  .circle {
    padding: 4%;
    border-radius: 100em;
    background-color: lightgrey;
    width: 1%
  }
</style>
