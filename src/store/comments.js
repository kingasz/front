import Axios from 'axios'

export default {
  state: {
    comments: [],
    comment: []
  },
  getters: {
    getComments (state) {
      return state.comments
    }
  },
  mutations: {
    retrieveComments (state, comments) {
      state.comments = comments
    },
    addComment (state, comment) {
      state.comments.push({
        content: comment.content
      })
    }
  },
  actions: {
    retrieveComments (context, id) {
      Axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('token')

      Axios.get('/comment/' + id)
        .then(response => {
          context.commit('retrieveComments', response.data.result)
        })
        .catch(error => {
          console.log(error)
        })
    },
    createComment (context, data) {
      Axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('token')

      return new Promise((resolve, reject) => {
        Axios.post('/comment/new/' + data.id, {
          content: data.content
        })
          .then(response => {
            context.commit('addComment', response.data.result)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}
