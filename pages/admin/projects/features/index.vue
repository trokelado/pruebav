<!-- ./src/pages/admin/projects/features/index.vue -->
<template>
  <section class="">        
    <div v-if="user" id="user" class="text-xs-left">                    
      <h2 class="subheading">Groups in project: <code>{{ project.name }}</code></h2>                                
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  computed: {
    user () {
      return this.$store.getters.activeUser
    },
    project () {
      return this.$route.params.project
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