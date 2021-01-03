<template>
    <div class="group-details">
        <div class="container my-5 pt-3">
            <div class="row">
                <div class="col-12 col-md-6">
                    <div v-for="getGroup in getGroup" :key="getGroup.id" :getGroup="getGroup">{{getGroup.name}}</div>
                </div>
                <div class="col-12 col-md-6">
                  <button type="button" class="btn btn-primary mb-4" data-toggle="modal" data-target="#exampleModal">
                        Utwórz degustację
                  </button>
                  <AddTastingForm/>
                </div>
            </div>
            <div class="row">
              <div class="col-12 col-md-3 d-flex flex-column">
                <button type="button" class="btn btn-primary mb-4 mr-auto" data-toggle="modal" data-target="#adduser">
                    Dodaj użytkownika
                </button>
                <AddUserForm/>
                <UserList/>
              </div>
              <div class="col-12 col-md-9 d-flex flex-column">
                <div class="container-fluid">
                    <div class="row">
        <div class="col-12 col-md-4" v-for="tasting in tastings" :key="tasting.id">
        <div class="card mb-5">
            <div class="card-body">
                <h5 class="card-title">{{ tasting.title }}</h5>
                <p class="card-text">
                {{ tasting.description }}
                </p>
            </div>
            <div class="card-footer d-flex flex-row" style="font-size: .8rem">
              <p class="my-auto">Dodano: {{tasting.created_at}}</p>
              <div class="ml-auto">
                <p @click="goToTastingDetail(tasting.id)" class="btn btn-primary btn-sm my-auto mr-3"><i class="fas fa-plus"></i></p>
                <p class="ml-auto btn btn-danger btn-sm my-auto"><i class="fas fa-bomb"></i></p>
              </div>
            </div>
        </div>
    </div>
    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.group-details {
  min-height: 100vh;
}
</style>

<script>
import { mapGetters } from 'vuex'
import AddTastingForm from '../components/AddTastingForm'
import AddUserForm from '../components/AddUserForm'
import UserList from '../components/UserList'
import {
  AclRule
} from 'vue-acl'

export default {
  name: 'Group Details',
  components: {
    AddTastingForm,
    AddUserForm,
    UserList
  },
  computed: {
    isLocalRule () {
      return new AclRule('drinker').generate()
    },
    ...mapGetters({
      getGroup: 'getGroup',
      tastings: 'getTastings',
      getGroupUsers: 'getGroupUsers'
    })
  },
  props: ['name'],
  mounted () {
    this.$store.dispatch('retrieveGroup', this.$route.params.groupId)
  },
  created () {
    this.$store.dispatch('retrieveTastings', this.$route.params.groupId)
    this.$store.dispatch('retrieveGroupUsers', this.$route.params.groupId)
  },
  methods: {
    goToTastingDetail (id) {
      this.$router.push({
        name: 'TastingDetail',
        params: {
          tastingId: id
        }
      })
    }
  }
}
</script>
