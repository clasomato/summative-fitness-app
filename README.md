# CORE Fitness App

## Project setup
```
npm install
```
```
npm install bootstrap popper.js jquery
```

## Compiles and hot-reloads for development
```
npm run serve
```

<<<<<<< HEAD
### Compiles and minifies for production
=======
## Compiles and minifies for production
>>>>>>> origin/scssSetup
```
npm run build
```

<<<<<<< HEAD
### Lints and fixes files
=======
## Lints and fixes files
>>>>>>> origin/scssSetup
```
npm run lint
```

<<<<<<< HEAD
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
=======
## Features

  - Sign up as a Personal Trainer and create public workout routines
  - Sign up as a Standard User and create private, personal workout routines
  - Monitor your progress in weekly and daily calories burned, including time spent training

All Fitness App user data is stored on a secure Firebase database accessible by administrators only.

## Version Control

  - Requires the latest release of node.js
   

  - Requires the latest release of bootstrap
  - Requires the latest release of jQuery
  - Requires the latest release of popper.js

Bootstrap, jQuery and popper.js are installed to the latest version via npm on the __Project setup__.

## Code Style Guide
##### CSS Reset

Includes box sizing rules, default padding, default margin, default body, list styles, default styles, images, articles, inputs, buttons, animations, and transitions. (Found via /r/code on Reddit).

Link: https://hankchizljaw.com/wrote/a-modern-css-reset/

#### Group Specific Rules
##### Comments
Methods, functions, variables and components must be commented with the creator specified. Following the Google HTML/CSS Style Guide rules.
Example: 
```
// Comment explaining how component works
// Forename, Date & Time of code implementation
```
##### Classes
Classes with two or more words must be camelcase. Avoid any - or _ and no spaces.

##### Naming conventions
Files must be saved avoiding any - or _ and no spaces. Use only lowercase. This includes git branch names.

#### Google HTML/CSS Style Guide
Link: https://google.github.io/styleguide/htmlcssguide.html

#### JavaScript Sandard Style Guide
Link: https://standardjs.com/


## Tech
Our fitness application uses a number of libraries, plugins and open-source projects to work properly:

* vue.js - Primary JavaScript library
* babel.js - Open-source JavaScript transcompiler
* Bootstrap - UI boilerplate to heighten code efficiency
* Font Awesome - Accessible broad library of free .svg icons
* jQuery - JavaScript library to be installed when using bootstrap
* node.js - Allows for NPM package and node module installation
* Firebase - NoSQL database that allows for storage and sync data

## Plugins

Our portfolio gallery is functional with the following plugins. Instructions and links on how to use them in your own application are linked below.

| Plugin |Official Website |
| ------ | ------ |
| jQuery | [jQuery API Documentation][jqry] |
| Bootstrap | [Introduction to Bootstrap][boot] |
| Font Awesome | [Font Awesome website][font] |
| Firebase | [Firebase by Google][fire] |

## Additional Links
Vue JavaScript library [Vue.js][vues].
Node runtime environment [Node.js][node].
Babel JavaScript transcompiler [Babel][babl].

## Customize configuration
See [Configuration Reference][vcli].

## Firebase Data Layout & Preset Queries
### Structure
The Database structure for core uses a lot of what we call 'sub-collections' which are collections inside of documents. A good real life example of this would be a recipe, you have the document with the name 'Crab Rangoon' and for example the prep time is '20 minutes' but inside the recipe you have another collection of data which is 'ingredients' which include their own sets of data such as how much you need, for example '200g'.

Now that we have explained sub-collections here are the main paths for Cores DB (database)

The users collection is the main collection that 90% of our team will be working with and includes all the user specific data such as age, DOB and most importantly the users workouts. Inside of the users individual custom workout there is a sub-collection called workout details which holds the individual activities/exercises the user has chosen to be in their workout such as: push ups, crunches, etc.
users(**collection**) --> jason@climostudios.online(**document**) --> workouts(**collection**) --> workout1(**document**) --> workout-details(**collection**) --> pushup



## Create
Here is a basic create function for firebase that is making a document inside of the users workouts called **workout1**.
**users**(collection) --> **exampleuser@email.com**(doc) --> **workouts**(collection) --> **workout1**(doc)

```javascript
// Add a new document in collection "cities"  
db.collection('users').doc('exampleuser@email.com').collection('workouts').doc('workout1').set({ 
	name:  'Core Workout', 
	time:  30, 
	active:  false
})  
.then(function()  { console.log('Document successfully written!') 
})  
.catch(function(error)  { console.error('Error writing document: ', error)
})
```
## Read
Here we are getting the list of preset activities from the activities doc inside of the preset-workout collection then console logging each one.
**preset-workouts**(collection) --> **activities**(doc) --> **list-of-activities**(collection)
```javascript
db.collection('preset-workouts').doc('activities').collection('list-of-activities').get().then(function (snapshot) {
  snapshot.forEach(function (doc) {
    const eachDoc = doc.data()
    console.log(eachDoc)
  })
})
```
## Update
## Delete
Here we are deleting **workout1** from the workouts collection which is inside of the users doc which is inside of the root users collection
**users**(collection) --> **exampleuser@email.com**(doc) --> **workouts**(collection) --> **workout1**(doc)
```javascript
db.collection('users').doc('exampleuser@email.com').collection('workouts').doc('workout1')delete().then(function()  { console.log('Document successfully deleted!')
}).catch(function(error)  { console.error('Error removing document: ', error)
})
```

License
----

MIT

   [vcli]: <https://cli.vuejs.org/config/>
   [boot]: <https://getbootstrap.com/docs/4.5/getting-started/introduction/>
   [fire]: <https://firebase.google.com/>
   [jqry]: <https://api.jquery.com/>
   [font]: <https://fontawesome.com/>
   [node]: <https://nodejs.org/>
   [babl]: <https://babeljs.io/>
   [vues]: <https://vuejs.org/>
>>>>>>> origin/scssSetup
