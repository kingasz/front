<template>
    <div class="container pt-5 hello">
      <div class="row">
        <div class="col-12 col-md-6 d-flex flex-row">
          <h1 class="mr-md-auto mx-auto mx-md-0 my-4">
            Twoje grupy
          </h1>
        </div>
        <div class="col-12 col-md-6 d-flex">
          <div class="ml-md-auto mx-auto mx-md-0 my-4">
            <button type="button" class="btn btn-primary mb-4" data-toggle="modal" data-target="#exampleModal">
                Utwórz grupę
            </button>
            <AddGroupForm/>
          </div>
        </div>
      </div>
    <!-- Content Row -->
    <div class="row">
      <div class="col-md-4 mb-5" v-for="myOwnGroup in myOwnGroups" :key="myOwnGroup.id" :myOwnGroup="myOwnGroup">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{{ myOwnGroup.name }}</h5>
          </div>
          <div class="card-footer d-flex flex-row">
            <p class="my-auto" style="font-size: .8rem">Utworzono: {{myOwnGroup.created_at}}</p>
            <div class="ml-auto">
              <p @click="goToGroupDetail(myOwnGroup.id)" class="btn btn-primary btn-sm my-auto"><i class="fas fa-plus"></i></p>
              <p @click="removeGroup(myOwnGroup.id)" class="ml-3 btn btn-danger btn-sm my-auto"><i class="fas fa-bomb"></i></p>
            </div>
          </div>
        </div>
      </div>
      <!-- /.col-md-4 -->
    </div>
    <!-- /.row -->
  </div>
</template>

<style scoped>
.hello {
  min-height: 100vh;
}
</style>

<script>
import { mapGetters } from 'vuex'
import AddGroupForm from '../components/AddGroupForm'

export default {
  name: 'panel',
  components: {
    AddGroupForm
  },
  computed: {
    ...mapGetters({
      myOwnGroups: 'myOwnGroups'
    })
  },
  props: {
    myOwnGroup: {
      type: Object,
      required: true
    }
  },
  created () {
    this.$store.dispatch('retrieveOwnGroups')
  },
  methods: {
    goToGroupDetail (id) {
      this.$router.push({
        name: 'Group Details',
        params: {
          groupId: id
        }
      })
    },
    removeGroup (id) {
      this.$store.dispatch('removeGroup', id)
    }
  }
}
</script>

<style scoped>
.hello {
  overflow-x: hidden;
}
</style>
