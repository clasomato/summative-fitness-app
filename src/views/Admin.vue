<template>
  <div class="admin">
    <h1>Here you go ;)</h1>
    <div id="login">
      <h2>But first what is the magic password?</h2>
      <input type="password" placeholder="Enter password" id="passwordInput">
      <button @click="checkIfAdmin">Submit</button>
    </div>

    <div class="adminPanel" style="display:none" id="adminPanel">
      <h3>Adding a Activity</h3>
      <input type="text" name="" value="" placeholder="name" id="nameInput"> <br>
      <label for="">Image</label> <br>
      <input type="file" name="" value="" placeholder="image" @change="previewFiles" id="imageURL"> <br>
      <input type="text" name="" value="" placeholder="Video Link" id="videoLinkInput"> <br>
      <label for="">Gif</label> <br>
      <input type="file" name="" value="" placeholder="gif" @change="previewFilesForGif"> <br>
      <input type="number" name="" value="" placeholder="Default Sets" id="sets"> <br>
      <input type="number" name="" value="" placeholder="Default Reps" id="reps"> <br>
      <input type="number" name="" value="" placeholder="Default Time per Set" id="timePerSet"> <br>
      <Label>Description</Label> <br>
      <textarea name="" cols="30" rows="10" id="desc"></textarea> <br>
      <!-- <input type="text" name="" value=""> <br>
      <input type="text" name="" value=""> -->
      <button @click="submitNewActivity">Submit</button>
    </div>
  </div>
</template>

<script>
// Importing firebase and jquery
import db from '../firebase.js'
import $ from 'jquery'

// Vue Data, methods & lifecycle hooks
export default {
  data () {
    return {
      imageUpload: false,
      imageUploadGif: false,
      items: false
    }
  },
  methods: {
    // This method checks the password with the one in the database
    checkIfAdmin: function () {
      var v = this
      var password = document.getElementById('passwordInput').value

      // If the password is correct the rest of the page will show
      if (v.items[0].password === password) {
        console.log('ya bang on')
        $('#adminPanel').show()
        localStorage.setItem('isAdmin', 'true')
        $('#login').hide()
      }
    },
    // This method uploads an individual activity
    submitNewActivity: function () {
      var v = this

      var name = document.getElementById('nameInput').value
      var img = v.imageUpload
      var videoLink = document.getElementById('videoLinkInput').value
      var gif = v.imageUploadGif
      var description = document.getElementById('desc').value
      var sets = document.getElementById('sets').value
      var reps = document.getElementById('reps').value
      var timePerSet = document.getElementById('timePerSet').value

      // Add a new document in collection "cities"
      db.collection('preset-workouts').doc('activities').collection('list-of-activities').doc(name).set({
        name: name,
        image: img,
        videoLink: videoLink,
        gif: gif,
        desc: description,
        sets: sets,
        reps: reps,
        timePerSet: timePerSet
      })
        .then(function () {
          console.log('Document successfully written!')
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    },
    // This converts the image upload to base64
    previewFiles (event) {
      var v = this
      console.log(event.target.files[0])
      const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })

      async function Main () {
        // console.log(await toBase64(event.target.files[0]))
        v.imageUpload = await toBase64(event.target.files[0])
        // console.log(v.imageUpload)
      }

      Main()
    },
    // This converts the image upload to base64
    previewFilesForGif (event) {
      var v = this
      console.log(event.target.files[0])
      const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })

      async function Main () {
        // console.log(await toBase64(event.target.files[0]))
        v.imageUploadGif = await toBase64(event.target.files[0])
        // console.log(v.imageUpload)
      }

      Main()
    }
  },
  // On mounted we want to check if the user is logged in and grab the password from the DB
  mounted () {
    const v = this
    var data = []

    db.collection('preset-workouts').get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        const eachDoc = doc.data()
        data.push(eachDoc)
      })
    })
    v.items = data

    if (localStorage.getItem('isAdmin') === 'true') {
      $('#adminPanel').show()
      // localStorage.setItem('isAdmin', 'true')
      $('#login').hide()
    }
  }
}
</script>

<style lang="scss" scoped>
.adminPanel {
  text-align: left;
  padding: 5%;
}
input, textarea, button {
  background-color: white;
  border: 1px solid #212121;
  border-radius: 0.5em;
  padding: 2%;
  font-size: 1.1em;
  margin-bottom: 2%;
}

button {

}
</style>
