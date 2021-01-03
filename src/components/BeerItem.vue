<template>
    <div class="row">
        <div class="col-12 col-md-4" v-for="beer in beers" :key="beer.id">
        <div class="card mb-5">
            <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light" @click="goToBeerDetail(beer.id)">
                <img
                src="https://mdbootstrap.com/img/new/standard/nature/111.jpg"
                class="img-fluid"
                />
                <div class="mask" style="background-color: rgba(251, 251, 251, 0.15)"></div>
            </div>
            <div class="card-body">
                <h5 class="card-title">{{ beer.name }}</h5>
                <p class="card-text">
                {{ beer.description }}
                </p>
            </div>
            <div class="card-footer d-flex flex-row" style="font-size: .8rem">
              <p class="my-auto">Dodano: {{beer.created_at}}</p>
              <p @click="removeBeer(beer.id)" class="ml-auto btn btn-danger btn-sm my-auto"><i class="fas fa-bomb"></i></p>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'beeritem',
  computed: {
    ...mapGetters({
      beers: 'getMyBeers'
    })
  },
  props: {
    beers: {
      type: Object,
      required: true
    }
  },
  created () {
    this.$store.dispatch('retrieveMyBeers')
  },
  methods: {
    goToBeerDetail (id) {
      this.$router.push({
        name: 'Beerdetails',
        params: {
          beerId: id
        }
      })
    },
    removeBeer (id) {
      this.$store.dispatch('removeBeer', id)
      this.$router.push({ path: '/beers' })
      window.location.replace = '/beers'
    }
  }

}
</script>
