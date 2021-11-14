export default {
  namespaced: true,

  state: {
    error: null,
    errors: [],
    isLoading: false
  },
  mutations: {
    setError (state, error) {
      state.error = error
    },
    setErrors (state, errors) {
      state.errors = errors
    },
    setIsLoading (state, val) {
      state.isLoading = val
    },
    reset (state) {
      state.error = null
      state.errors = []
      state.isLoading = false
    }
  },

  actions: {
    async sendLoginRequest({ commit }, data) {
      commit("setIsLoading", true)

      try {
        const response = await fetch('http://localhost/framework-4.1.4/public/home/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        const res = await response.json()
        
        if (!response.ok) {
          throw { response, res }
        } else {
          // Success
          commit("setUserData", res.user, { root: true })
          commit("setUserToken", res.token, { root: true })
          localStorage.setItem("userData", JSON.stringify(res.user))
          localStorage.setItem("userToken", res.token)

          commit("setError", null) 
          commit("setErrors", []) 
          
        }
      } catch(error) {
        const errorStatus = error.response.status

        if (errorStatus==422) {
          commit("setError", null) 
          commit("setErrors", error.res.errors)
        } else {
          commit("setError", "Something went wrong, please try again!")
          commit("setErrors", []) 
        }
      } finally {
        commit("setIsLoading", false)
      }
    }
  }
}