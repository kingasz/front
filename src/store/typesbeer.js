import Axios from 'axios'

export default {
  state: {
    types: [],
    type: [],
    typebeers: []
  },
  getters: {
    getTypesBeers (state) {
      return state.types
    },
    getTypeBeers (state) {
      return state.type
    },
    getBeerOfType (state) {
      return state.typebeers
    }
  },
  mutations: {
    retrieveTypesBeer (state, types) {
      state.types = types
    },
    retrieveTypeBeer (state, type) {
      state.type = type
    },
    retrieveBeerOfType (state, typebeers) {
      state.typebeers = typebeers
    }
  },
  actions: {
    retrieveTypesBeer (context) {
      Axios.get('/type')
        .then(res => {
          context.commit('retrieveTypesBeer', res.data.result)
        })
        .catch(e => {
          console.log(e)
        })
    },
    retrieveTypeBeer (context, id) {
      Axios.get('/type/' + id)
        .then(res => {
          context.commit('retrieveTypeBeer', res.data.result)
        })
        .catch(e => {
          console.log(e)
        })
    },
    retrieveBeerOfType (context, id) {
      Axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('token')
      Axios.get('/beer/type/' + id)
        .then(res => {
          context.commit('retrieveBeerOfType', res.data.result)
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
