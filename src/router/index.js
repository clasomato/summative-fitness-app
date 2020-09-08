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
import LandingPage from '../views/LandingPage.vue'

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
    name: 'LandingPage',
    component: LandingPage
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
