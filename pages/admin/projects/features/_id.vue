<!-- ./src/pages/admin/features/features/_id.vue -->
  <template>
  <section class="">
    <v-flex id="adminChild" xs12>
      <nuxt-child :key="$router.fullPath"></nuxt-child>      
    </v-flex>          
    <h2 class="subheading">Feature: <code>{{ feature.name}}</code> from project: <code>{{ project.name}}</code></h2>
    <v-flex xs12 id="adminNav">
      <nuxt-link class="adminNavRoute" to="/admin">Dashboard Home</nuxt-link>
      <button
          v-on:click="toMobils()"											
          class="btn btn-success">
          <i class="material-icons blue white--text">location_on</i>                        																					
      </button>                 
    </v-flex>      
  </section>
</template>

<script>

export default {           
  data () {
    return {      
      featureKey: '',
      feature: [],
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
    vm.featureKey = this.$route.params.id
    vm.feature = this.$route.params.feature
    vm.project = this.$route.params.project
    vm.rol = this.$route.params.rol      
    console.log('The id from feature $route is: ' + vm.featureKey)
    console.log('The name from feature $route is: ' + vm.feature.name)
    console.log('The name from project $route is: ' + vm.project.name)
  },
  methods: {    
    toMobils: function() {          
        let vm = this
        console.log('voy a enviar vm.featureKey toMobils: ' + vm.featureKey)
        this.$router.push({ 
            name: 'admin-projects-features-mobils', 
            params: { id: vm.featureKey, feature: vm.feature, project: vm.project, rol: vm.rol } 
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
