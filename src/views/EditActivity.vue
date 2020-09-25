<template lang="html">
  <div class="container">
    <a href="https://placeholder.com"><img src="https://via.placeholder.com/375x230" alt="placeholder video"></a>
    <div class="activityContent d-flex flex-column">
      <div class="header-cont">
        <h4 id="activityName" class="oswaldMed">{{activityName}}</h4>
      </div>
      <div class="add-activity-cont d-flex justify-content-end">
        <i class="fas fa-signal"></i>
        <h5 class="ralewayReg">Beginner</h5>
      </div>
      <div class="boxTitles">
        <h6 class="ralewaySemiBold">Rep Range</h6>
      </div>
      <div class="row d-flex align-items-center justify-content-center">
        <div class="boxes d-flex align-items-center justify-content-center">
          <h5 class="oswaldReg">12x</h5>
        </div>
        <div class="boxes d-flex align-items-center justify-content-center">
          <h5 class="oswaldReg">10x</h5>
        </div>
        <div class="boxes d-flex align-items-center justify-content-center">
          <h5 class="oswaldReg">8x</h5>
        </div>
        <div class="editBoxes d-flex align-items-center justify-content-center">
          <i class="fas fa-plus"></i>
          <h5 class="ralewaySemiBold">Edit</h5>
        </div>
      </div>
      <div class="boxTitles">
        <h6 class="ralewaySemiBold">Rest Interval</h6>
      </div>
      <div class="row d-flex align-items-center justify-content-center">
        <div class="boxes d-flex align-items-center justify-content-center">
          <h5 class="oswaldReg">60s</h5>
        </div>
        <div class="boxes d-flex align-items-center justify-content-center">
          <h5 class="oswaldReg">60s</h5>
        </div>
        <div class="boxes d-flex align-items-center justify-content-center">
          <h5 class="oswaldReg">60s</h5>
        </div>
        <div class="editBoxes d-flex align-items-center justify-content-center">
          <i class="fas fa-plus"></i>
          <h5 class="ralewaySemiBold">Edit</h5>
        </div>
      </div>
      <div class="row">
        <div class="col col-4">
          <a href="https://placeholder.com"><img src="https://via.placeholder.com/100x100" alt="" class="activityImg"></a>
        </div>
        <div class="class col col-8">
          <div class="boxTitles">
            <h6 class="ralewaySemiBold">Primary</h6>
            <p class="ralewayReg">Quadracepts</p>
          </div>
          <div class="boxTitles">
            <h6 class="ralewaySemiBold">Secondary</h6>
            <p class="ralewayReg">Hamstrings, Calves, Abdominals</p>
          </div>
        </div>
      </div>
    </div>
    <div class="">
      <button type="button" class="ralewaySemiBold btn text-center btnStyleAdd btnMargin borderRadius" @click="$router.push('create-workout')"> <i class="fas fa-plus"></i> Add</button>
    </div>
  </div>
</template>

<script>
// Sophie's Javascript
import startupScript from '../startupScript.js'
if (startupScript === 'fds') {

}
//
export default {
  name: 'EditActivity',
  data () {
    return {
      activityName: 'Skipping'
      // isLoggedIn: false
    }
  },
  created () {
    // this.checkLoggedIn()
  }
}
// Sophie's Javascript ENDS
</script>
