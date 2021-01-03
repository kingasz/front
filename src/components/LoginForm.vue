<template>
<div class="container">
    <div class="row justify-content-center d-flex">
      <div class="col-md-12 d-flex align-items-center justify content-center">
        <div class="card m-5 mx-auto">
          <form action="#!" class="text-center border border-light p-5" @submit.prevent="login">
            <p class="h4 mb-4">Zaloguj się</p>
            <input type="email" name="email" id="defaultLoginFormEmail" v-model="form.email" class="form-control mb-4">
            <input type="password" name="password" id="defaultLoginFormPassword" v-model="form.password" class="form-control mb-4">
            <div class="d-flex justify-content-around">
              <div>
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" id="defaultLoginFormRemember"/>
                  <label for="defaultLoginFormRemember" class="custom-control-label pr-3 ">Zapamiętaj</label>
                </div>
              </div>
              <div>
                <a href="" style="color: #00695c">Zapomniałeś hasła?</a>
              </div>
            </div>
            <button type="submit" class="btn btn-warning btn-block my-4">Zaloguj się</button>
            <p>Nie jesteś z nami?
              <router-link to="/register">
                <a href="" style="color: #00695c">Zarejestruj się</a>
              </router-link>
            </p>
            <p class="mt-n4 pb-3">lub zaloguj z:</p>
            <a href="#" class="mx-2" role="button"><i class="fab fa-facebook-f" style="color: #00695c"></i></a>
            <a href="#" class="mx-2" role="button"><i class="fab fa-google" style="color: #00695c"></i></a>
         </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'login',
  components: {
    //
  },
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.$store.dispatch('retrieveToken', {
        email: this.form.email,
        password: this.form.password
      })
        .then(response => {
          this.$router.push({ path: '/' })
        })
    }
  }
}
</script>
