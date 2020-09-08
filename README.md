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

## Compiles and minifies for production
```
npm run build
```

## Lints and fixes files
```
npm run lint
```

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