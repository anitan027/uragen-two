import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const guest = (to, from, next) => {
  if (!localStorage.getItem("userToken")) {
    return next()
  } else {
    return next("/dashboard")
  }
}
const auth = (to, from, next) => {
  if (localStorage.getItem("userToken")) {
    return next()
  } else {
    return next("/")
  }
}

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    beforeEnter: guest
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
    beforeEnter: auth
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
