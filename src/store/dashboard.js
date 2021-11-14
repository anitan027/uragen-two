export default {
  namespaced: true,

  state: {},
  mutations: {},
  actions: {
    testRootState({ rootState }) {
      console.log(rootState.userToken)
    }
  }
}