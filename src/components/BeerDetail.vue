<template>
    <div class="beerdetail container py-5">
        <div class="row">
            <div class="col-12 col-md-4 d-flex flex-column">
              <div class="card mb-5">
                  <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                      <img
                      src="https://mdbootstrap.com/img/new/standard/nature/111.jpg"
                      class="img-fluid"
                      />
                      <div class="mask" style="background-color: rgba(251, 251, 251, 0.15)"></div>
                  </div>
              </div>
                <div class="d-flex flex-column">
                  <h2 v-for="getBeer in getBeer" :key="getBeer.id" :beer="getBeer">{{ getBeer.name }}</h2>
                  <hr class="dropdown-divider my-3">
                  <h3 class="mt-3">O piwie</h3>
                  <ul class="list-group my-3" v-for="getBeer in getBeer" :key="getBeer.id" :beer="getBeer">
                      <li class="list-group-item">Zawartość alkoholu: {{getBeer.alcohol_volume}} promila</li>
                      <li class="list-group-item">Dodane przez: {{getBeer.user.firstname}} {{getBeer.user.surname}}</li>
                  </ul>
                </div>
            </div>
            <div class="col-12 col-md-8">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12 d-flex flex-column" v-for="getBeer in getBeer" :key="getBeer.id" :beer="getBeer">
                            <h5>Opis</h5>
                            <p>{{getBeer.description}}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 d-flex flex-column py-5">
                            <h5 class="mb-3">Oceny</h5>
                            <table class="table mb-5">
  <thead>
    <tr>
      <th scope="col">Kryterium</th>
      <th scope="col">Ocena</th>
    </tr>
  </thead>
  <tbody v-for="getBeer in getBeer" :key="getBeer.id" :beer="getBeer">
    <tr>
      <th scope="row">Aromat</th>
      <td>{{getBeer.avgAroma}}</td>
    </tr>
   <tr>
      <th scope="row">Smak</th>
      <td>{{getBeer.avgTaste}}</td>
    </tr>
    <tr>
      <th scope="row">Kolor</th>
      <td>{{getBeer.avgColor}}</td>
    </tr>
    <tr>
      <th scope="row">Gorycz</th>
      <td>{{getBeer.avgBitterness}}</td>
    </tr>
    <tr>
      <th scope="row">Tekstura</th>
      <td>{{getBeer.avgTexture}}</td>
    </tr>
  </tbody>
  <tfoot v-for="getBeer in getBeer" :key="getBeer.id" :beer="getBeer">
    <tr>
      <th scope="col">Podsumowanie</th>
      <th scope="col">{{getBeer.overall}}</th>
    </tr>
  </tfoot>
</table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.beerdetail {
    width: 100vw;
    min-height: 100vh;
}
</style>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Beerdetails',
  computed: {
    ...mapGetters({
      getBeer: 'getBeer'
    })
  },
  props: ['name', 'alcohol_volume', 'description', 'avgAroma', 'avgTaste', 'avgColor', 'avgBitterness', 'avgTexture', 'overall', 'firstname', 'surname'],
  mounted () {
    this.$store.dispatch('retrieveBeer', this.$route.params.beerId)
  }
}
</script>
