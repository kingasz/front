import axios from 'axios'

export default {
  state: {
    beers: [],
    beer: []
  },
  getters: {
    getMyBeers (state) {
      return state.beers
    },
    getBeer (state) {
      return state.beer
    }
  },
  mutations: {
    retrieveMyBeers (state, beers) {
      state.beers = beers
    },
    retrieveBeer (state, beer) {
      state.beer = beer
    },
    addBeer (state, beer) {
      state.beers.push({
        name: beer.name,
        alcohol_volume: beer.alcohol_volume,
        description: beer.description,
        country: beer.country,
        selectedCountry: beer.selectedCountry,
        selectedType: beer.selectedType
      })
    },
    removeBeer (state) {
      state.beer = null
    }
  },
  actions: {
    retrieveMyBeers (context) {
      axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('token')
      axios.get('/beer/all/my')
        .then(res => {
          context.commit('retrieveMyBeers', res.data.result)
        })
        .catch(e => {
          console.log(e)
        })
    },
    retrieveBeer (context, id) {
      axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('token')

      axios.get('/beer/' + id)
        .then(res => {
          context.commit('retrieveBeer', res.data.result)
        })
        .catch(e => {
          console.log(e)
        })
    },
    createBeer (context, data) {
      axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('token')
      return new Promise((resolve, reject) => {
        axios.post('/beer/store/' + data.selectedType + '/' + data.selectedCountry, {
          name: data.name,
          alcohol_volume: data.alcohol_volume,
          description: data.description
        })
          .then(res => {
            resolve(res)
            context.commit('addBeer', res.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    removeBeer (context, id) {
      axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('token')
      return new Promise((resolve, reject) => {
        axios.delete('/beer/delete/' + id)
          .then(res => {
            context.commit('removeBeer')
            resolve(res)
            console.log('Beer has been removed')
          })
          .catch(e => {
            context.commit('removeGroup')
            reject(e)
          })
      })
    }
  }
}
