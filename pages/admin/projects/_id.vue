  <!-- ./src/pages/admin/projects/_id.vue -->
  <template>
  <section class="">
    <v-flex id="adminChild" xs12>
      <nuxt-child :key="$router.fullPath"></nuxt-child>      
    </v-flex>      
    <h2 class="subheading">Project: <code>{{ project.name}}</code></h2>
    <v-flex xs12 id="adminNav">
      <nuxt-link class="adminNavRoute" to="/admin">Dashboard Home</nuxt-link>
      <button
          v-on:click="toFeatures()"											
          class="btn btn-success">
          <i class="material-icons blue white--text">adb</i>                        																					
      </button>                 
    </v-flex>      
  </section>
</template>

<script>

export default {         
  data () {
    return {
      projectKey: '',
      project: [],      
      rol: ''
    }
  },
  computed: {
    pageUrl() {
      return this.id
    }    
  },
  props: {       
      
  },
  created () {
    let vm = this                
    vm.projectKey = this.$route.params.id
    vm.project = this.$route.params.project
    vm.rol = this.$route.params.rol      
    console.log('The id from project $route is: ' + vm.projectKey)    
  },
  methods: {    
    toFeatures: function() {          
      let vm = this
      vm.$router.push({ 
          name: 'admin-projects-features', 
          params: { id: vm.projectKey, project: vm.project, rol: vm.rol } 
      })                                                      
    },                 
  },      
}
</script>

<style>
#adminNav {
  display: flex;
  flex-flow: row wrap;
  /*justify-content: space-around;*/
  margin-bottom: 1em;
}
.adminNavRoute {
  margin: .25em .5em;
  padding: .25em;
}
#adminChild {
  margin-top: 1em;
}
</style>
