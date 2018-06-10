<!-- ./src/pages/admin/toys/_id.vue -->
  <template>
  <section class="">
    <v-flex id="adminChild" xs12>
      <nuxt-child :key="$router.fullPath"></nuxt-child>
    </v-flex>        
    <v-layout row wrap>        
        <h5 class="card-title"> Usuario: {{toy.name}}</h5>
        <v-flex xs12 md3 id="adminNav">
            <nuxt-link class="adminNavRoute" :to="{ name: 'admin-toys' } "> Exit</nuxt-link>
            <!--<nuxt-link class="adminNavRoute" :to="{ name: 'admin-toypros' params: { id: key, model: model } } "> Projects</nuxt-link>-->
            <td>                                                                                                                 
                <button
                  v-on:click="toProjectsByToy()"											
                  class="btn btn-success">
                  <i class="material-icons blue white--text">adb</i>                        																					
              </button>                                
            </td>
        </v-flex>                                
    </v-layout>  
  </section>
</template>

<script>

export default {            
  data () {
    return {
      toyKey: '',
      toy: [],      
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
    vm.toyKey = this.$route.params.id
    vm.toy = this.$route.params.toy
    vm.rol = this.$route.params.rol 
    console.log('The id from toy $route is: ' + vm.toyKey)         
  },  
  methods: {    
    toProjectsByToy: function() {          
      let vm = this
      vm.$router.push({ 
          name: 'admin-toypros', 
          params: { id: vm.toyKey, toy: vm.toy, rol: vm.rol } 
      })                                                      
    },                  
  },
  components: {
       
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
