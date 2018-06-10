<!-- ./src/pages/admin/toys/index.vue -->
<template>
  <section class="">        
    <div v-if="user" id="user" class="text-xs-left">                    
      <h5 class="card-title"> Usuarios</h5>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.getters.activeUser
    },    
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