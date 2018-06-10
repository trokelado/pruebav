<!-- ./src/pages/admin/projects/features/mobils/index.vue -->
<template>
  <section class="">        
    <div v-if="user" id="user" class="text-xs-left">
    <h2 class="subheading">Components from group: <code>{{ feature.name }}</code> in project: <code>{{ project.name }}</code></h2>                        
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.getters.activeUser
    },
    project () {
      return this.$route.params.project
    },
    feature () {
      return this.$route.params.feature
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