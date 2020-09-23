import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import SignUp from '../views/SignUp.vue'
import Login from '../views/Login.vue'
import ProfileSetup from '../views/ProfileSetup.vue'
import CreateWorkout from '../views/CreateWorkout.vue'
import EditWorkout from '../views/EditWorkout.vue'
import PreviewWorkout from '../views/PreviewWorkout.vue'
import ActiveWorkout from '../views/ActiveWorkout.vue'
import WorkoutList from '../views/WorkoutList.vue'
import Landing from '../views/Landing.vue'
import PresetWorkout from '../views/PresetWorkout.vue'
import Admin from '../views/Admin.vue'
import PlayWorkout from '../views/PlayWorkout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/profile-setup',
    name: 'ProfileSetup',
    component: ProfileSetup
  },
  {
    path: '/create-workout',
    name: 'CreateWorkout',
    component: CreateWorkout
  },
  {
    path: '/edit-workout',
    name: 'EditWorkout',
    component: EditWorkout
  },
  {
    path: '/preview-workout',
    name: 'PreviewWorkout',
    component: PreviewWorkout
  },
  {
    path: '/active-workout',
    name: 'ActiveWorkout',
    component: ActiveWorkout
  },
  {
    path: '/workout-list',
    name: 'WorkoutList',
    component: WorkoutList
  },
  {
    path: '/landing',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/play-workout',
    name: 'PlayWorkout',
    component: PlayWorkout
  },
  {
    path: '/preset-workout',
    name: 'PresetWorkout',
    component: PresetWorkout
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
