<template>
  <section class="">
    <h2 class="title">Admin Dashboard for {{user.displayName}}</h2>
    <!--<h5 class="subheading">The index page inside the admin folder</h5>-->
    <div v-if="user" id="user" class="text-xs-center">
      <img :src="$store.state.user.photoURL" width=300px alt="Me">                      
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.getters.activeUser
    }
  },
}
</script>

<style>
.avatar {
  max-width: 100px;
}
.avatar img {
  max-width: 100%;
}
</style>
