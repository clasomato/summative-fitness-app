<template lang="html">
  <div class="container d-flex bgColor p-4">
    <div class="my-auto col-12">
      <div class="text-left headingStyle">
        <h2>Sign In...</h2>
      </div>
      <div class="row justify-content-center">
        <form class="col col-12">
          <div class="form-group text-left formTextStyle formPadding">
            <label for="email">Email address</label>
            <input type="email" class="form-control" placeholder="myfitness@gmail...">
          </div>
          <div class="form-group text-left formTextStyle formPadding">
            <label for="password">Password</label>
            <input type="password" class="form-control" placeholder="********">
          </div>
          <button type="button" class="btn text-center">Continue</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
.btn {
  width: 150px;
  color: #FFFFFF;
  background-color: #343A40;
  border-radius: 30px;
  margin-top: 30px;
  margin-bottom: 12px;
}
.headingStyle {
  font-family: 'Roboto', sans-serif;
  font-size: 30px;
  color: #343A40;
  padding-bottom: 30px;
}
.formTextStyle {
  font-family: 'Roboto', sans-serif;
  color: #6C757D;
  font-size: 20px;
}
.bgColor {
  background-color: #DADADA;
  height: 100vh;
}
.formPadding{
  padding-top: 12px;
  padding-bottom: 12px;
}
</style>
