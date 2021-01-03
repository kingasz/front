import axios from 'axios'

export default {
  state: {
    countries: [],
    country: [],
    countrybeers: []
  },
  getters: {
    getCountriesBeers (state) {
      return state.countries
    },
    getCountry (state) {
      return state.country
    },
    getBeersOfCountry (state) {
      return state.countrybeers
    }
  },
  mutations: {
    retrieveCountriesBeer (state, countries) {
      state.countries = countries
    },
    retrieveCountry (state, country) {
      state.country = country
    },
    retrieveBeersOfCountry (state, countrybeers) {
      state.countrybeers = countrybeers
    }
  },
  actions: {
    retrieveCountriesBeer (context) {
      axios.get('/country')
        .then(res => {
          context.commit('retrieveCountriesBeer', res.data.result)
        })
        .catch(e => {
          console.log(e)
        })
    },
    retrieveCountry (context, id) {
      axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('token')

      axios.get('/country/' + id)
        .then(res => {
          context.commit('retrieveCountry', res.data.result)
        })
        .catch(e => {
          console.log(e)
        })
    },
    retrieveBeersOfCountry (context, id) {
      axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('token')

      axios.get('/beer/country/' + id)
        .then(res => {
          context.commit('retrieveBeersOfCountry', res.data.result)
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
