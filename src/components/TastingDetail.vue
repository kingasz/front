<template>
    <div class="container tasting my-5 py-5">
        <div class="row">
            <div class="col-12 col-md-6 d-flex flex-column" v-for="tasting in tasting" :key="tasting.id">
                <div class="my-auto">
                    <h3>{{ tasting.title }}</h3>
                    <p class="my-3">{{ tasting.description }}</p>
                </div>
            </div>
            <div class="col-12 col-md-6">
                <div class="card ml-auto w-50">
                    <div class="card-header">
                        <p class="card-text" style="font-size: .8rem">Autor degustacji</p>
                    </div>
                    <div class="card-body" v-for="tastings in tasting" :key="tastings.id">
                        <h5 class="card-title my-auto">{{ tastings.user.firstname }} {{ tastings.user.surname }}</h5>
                    </div>
                    <div class="card-footer" v-for="tasting in tasting" :key="tasting.id">
                        <p class="card-text" style="font-size: .8rem">Utworzono: {{ tasting.created_at }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="container-fluid mx-auto my-5">
                    <div class="row">
                        <div class="col-12 col-md-6 d-flex flex-row">
                            <div class="card ml-auto w-50">
                                <div class="card-header">
                                    <p class="card-text" style="font-size: .8rem">Oceniane piwo</p>
                                </div>
                                <div class="card-body d-flex" v-for="tasting in tasting" :key="tasting.id">
                                    <div class="my-auto">
                                        <h5 class="card-title my-auto">{{ tasting.beer.name }}</h5>
                                        <p class="card-text my-2" style="font-size: .8rem">{{ tasting.beer.description }}</p>
                                    </div>
                                </div>
                                <div class="card-footer" v-for="tasting in tasting" :key="tasting.id">
                                    <p class="card-text" style="font-size: .8rem">Dodano: {{ tasting.beer.created_at }}</p>
                                </div>
                            </div>
                            <ul class="list-group ml-5 w-50 my-auto">
                                <li class="list-group-item" v-for="tasting in tasting" :key="tasting.id">
                                    <p class="card-text my-2" style="font-size: .8rem">Zawartość alkoholu: {{ tasting.beer.alcohol_volume }} promila</p>
                                </li></ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <hr class="mt-3 mb-5">
            <div class="col-12 col-md-8">
                <div class="container-fluid pr-md-5">
        <div class="row">
            <div class="col-12">
                <form class="ratingform d-flex flex-column">
                    <h5 class="mb-5">Oceń moje piwo!</h5>
                    <div class="mb-5">
                        <label class="form-label" for="customRange2">Aromat</label>
                        <div class="range">
                            <input type="range" class="form-range" min="0" max="5" id="customRange2" v-model="form.aroma"/>
                        </div>
                    </div>
                    <div class="mb-5">
                        <label class="form-label" for="customRange2">Kolor</label>
                        <div class="range">
                            <input type="range" class="form-range" min="0" max="5" id="customRange2" v-model="form.color"/>
                        </div>
                    </div>
                    <div class="mb-5">
                        <label class="form-label" for="customRange2">Smak</label>
                        <div class="range">
                            <input type="range" class="form-range" min="0" max="5" id="customRange2" v-model="form.taste"/>
                        </div>
                    </div>
                    <div class="mb-5">
                        <label class="form-label" for="customRange2">Gorycz</label>
                        <div class="range">
                            <input type="range" class="form-range" min="0" max="5" id="customRange2" v-model="form.bitterness"/>
                        </div>
                    </div>
                    <div class="mb-5">
                        <label class="form-label" for="customRange2">Tekstura</label>
                        <div class="range">
                            <input type="range" class="form-range" min="0" max="5" id="customRange2" v-model="form.texture"/>
                        </div>
                    </div>
                    <button type="button" class="btn btn-primary mr-auto" v-for="tasting in tasting" :key="tasting.id" @click="submitRating(tasting.beer.id)">Zagłosuj</button>
                </form>
            </div>
        </div>
    </div>
            </div>
            <div class="col-12 col-md-4 d-flex flex-column">
                <AddCommentForm/>
                <hr class="mt-4 mb-5"/>
                <div class="card mb-5" v-for="comment in comments" :key="comment.id">
                    <div class="card-body">
                        <p class="card-text">{{ comment.content }}</p>
                    </div>
                    <div class="card-footer">
                        <p class="card-text" style="font-size: .8rem">Dodano: {{ comment.created_at }} przez {{ comment.user.firstname }} {{ comment.user.surname }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.tasting {
    width: 100vw;
    min-height: 100vh;
}
</style>

<script>
import { mapGetters } from 'vuex'
import AddCommentForm from './AddCommentForm'
import Axios from 'axios'

export default {
  name: 'TastingDetail',
  data () {
    return {
      form: {
        aroma: '',
        color: '',
        taste: '',
        bitterness: '',
        texture: ''
      }
    }
  },
  components: {
    AddCommentForm
  },
  computed: {
    ...mapGetters({
      tasting: 'getTasting',
      comments: 'getComments'
    })
  },
  created () {
    this.$store.dispatch('retrieveTasting', this.$route.params.tastingId)
    this.$store.dispatch('retrieveComments', this.$route.params.tastingId)
  },
  methods: {
    submitRating (id) {
      Axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('token')

      Axios.post('/rating/store/' + id, {
        aroma: this.form.aroma,
        color: this.form.color,
        taste: this.form.taste,
        bitterness: this.form.bitterness,
        texture: this.form.texture
      }).then(res => {
        console.log(res)
      }).catch(e => {
        console.error(e)
      })
    }
  }

}
</script>
