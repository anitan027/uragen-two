import Vue from 'vue'
import Vuex from 'vuex'
import login from './login'
import dashboard from './dashboard'

Vue.use(Vuex)

const userData = JSON.parse(localStorage.getItem('userData'))
const userToken = localStorage.getItem('userToken')

export default new Vuex.Store({
  state: {
    userData: (userData) ? userData : null,
    userToken: (userToken) ? userToken : null,
    error: null
  },
  getters: {
    isAuthenticated: state => !!state.userData
  },
  mutations: {
    setUserData (state, data) {
      state.userData = data
    },
    setUserToken (state, data) {
      state.userToken = data
    },
    setError (state, error) {
      state.error = error
    }
  },
  actions: {
  },
  modules: {
    login,
    dashboard
  }
})
