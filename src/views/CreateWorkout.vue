<template lang="html">
  <div class="create-workout">
    <div class="specificNav">
      <span><a>Go Back</a></span>
    </div>

    <div class="createWorkoutContainer">
      <h1>Create Workout</h1>

      <input type="text" name="" value="" placeholder="Name">

      <input type="text" name="" value="" placeholder="Description">
    </div>

    <div class="activitySection">
      <div class="activityHeaders">
        <h3>Level</h3>
        <select class="" name="options">
          <option value="0">Beginner</option>
        </select>
      </div>

      <div class="activityContent">
        <!-- <h3>Your Workout</h3> <br> -->
        <br>
        <h4>No Activities In Workout</h4>
        <img src="../assets/plus-solid.svg" alt="">
      </div>
    </div>

    <!-- Buttons to confirm changes or to delete the workout set -->
    <div class="buttons">
      <button type="button" name="button" @click="openDeleteConfirmModal()" id="deleteWorkoutButton">Delete</button>
      <button type="button" name="button" id="confirmWorkoutButton">Confirm</button>
    </div>

    <!-- Modals -->
    <div class="modalBackgroundContainer" id="confirmDeleteModal">
      <div class="customModal">
        <h1>Are you sure you want to delete this?</h1>

        <button type="button" name="button" @click="deleteCurrentItem">Yes</button>
        <button type="button" name="button" @click="deleteModalGoBack">No</button>
      </div>
    </div>

  </div>
</template>

<script>
// Imports
import $ from 'jquery'

export default {
  name: 'CreateWorkout',
  data () {
    return {

    }
  },
  methods: {
    // Hide/show STARTS
    openDeleteConfirmModal: function () {
      $('#confirmDeleteModal').show(100)
    },
    deleteModalGoBack: function () {
      $('#confirmDeleteModal').hide(100)
    }, // Hide/show ENDS
    deleteCurrentItem: function () {
      console.log('delete please')

      $('#confirmDeleteModal').hide(100)
    }
  }
}
</script>

<style scoped lang="scss">
  * {
    text-align: left;
  }

  input {
    border: none;
    background-color: white;
    font-size: 2em;
    border-bottom: 1px solid darkgrey;
    margin-bottom: 10%;
  }

  select {
    border: none;
    background-color: white;
    font-size: 1.2em;
    border-bottom: 1px solid darkgrey;
    margin-bottom: 10%;
  }

  button {
    background-color: darkgrey;
    color: white;
    border: 0;
    width: 80%;
    text-align: center;
    border-radius: 100px;
    font-size: 1.5em;
    margin-top: 5%;
  }

  #confirmDeleteModal {
    display: none;
  }

  .create-workout {
    padding: 5%;
  }

  .createWorkoutContainer {

  }

  .activityHeaders {
    display: flex;
    justify-content: space-between;
    // align-items: flex-start;

    h3 {
      padding: 0;
      margin: 0;
    }
  }

  .activityContent {
    width: 100%;
    background-color: darkgrey;
    padding: 5%;
    border-radius: 0.5em;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    h3 {
      background-color: red;
      padding: 0;
      margin: 0;
      width: 100%;
      position: absolute;
      top: 0;
    }

    img {
      width: 25%;
      border: 1px solid black;
      padding: 5%;
      border-radius: 1em;
    }
  }

  .buttons {
    width: 100%;
    display: flex;
    justify-content: space-between;

    button {
      width: 45%;
      font-size: 1.4em;
    }
  }

  .modalBackgroundContainer {
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);
    position: absolute;
    top: 0;
    left: 0;
  }

  .customModal {
    width: 80%;
    height: 80vh;
    padding: 5%;
    margin: 10%;
    background-color: lightgrey;
  }
</style>
