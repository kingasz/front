<template>
    <form class="commentform">
        <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Dodaj komentarz</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="form.content"></textarea>
        </div>
        <button type="button" class="btn btn-primary" @click="submitComment()">Wyślij</button>
    </form>
</template>

<script>
export default {
  name: 'addcommentform',
  data () {
    return {
      form: {
        content: ''
      }
    }
  },
  methods: {
    submitComment () {
      this.$store.dispatch('createComment', {
        content: this.form.content,
        id: this.$route.params.tastingId
      }).then(this.$router.push({ path: '/' }))
    }
  }
}
</script>
