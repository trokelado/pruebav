<template>
  <section class="">
    <v-flex id="adminChild" xs12>
      <nuxt-child :key="$router.fullPath">
      </nuxt-child>
    </v-flex>              
    <div v-if="!$store.state.user">
      <login-form></login-form>      
    </div>
    <div v-else>
      <div v-if="viable">        
        <div class="card">
            <div class="card-header">                
                <div v-if="isEdit"> 
                    <feature-detail :model="model" :switch1="switch1" :switch2="switch2"  @save-feature="updateFeature"></feature-detail>
                </div>
                <div v-if="isAdd"> 
                    <feature-detail :model="model" :switch1="false" :switch2="false" @save-feature="addFeature"></feature-detail>
                </div>                                                                                                              
            </div>                                    
            <div class="card-body">
                <div v-if="showList">
                    <button
                        v-on:click="showAdd()"											
                        class="btn btn-success">
                        <i class="material-icons blue white--text">add</i>                        																					
                    </button>
                    <table class="table table-striped">
                        <thead>
                            <tr>              
                                <th>Nombre</th>                            
                                <th>Activo</th>
                                <th>Figura</th>
                                <th>On Sale</th>
                                <v-spacer></v-spacer>              
                                <th>Modifica</th>                            
                            </tr>
                        </thead>
                        <tbody>								
                            <tr v-for="(item, key) in features" :key="key">									
                                <td>
                                    {{ item.name }}
                                </td>                            
                                <td>
                                    {{ item.isActive }}
                                </td>
                                <td>
                                    {{ item.figure }}
                                </td> 
                                <td>
                                    {{ item.onsale }}
                                </td>                           
                                <v-spacer></v-spacer>
                                <td>
                                    <!-- <nuxt-link to="/admin/features/_id", props: { key: key }>< Edit record</nuxt-link> -->
                                    <!--<nuxt-link :to="{ name: 'admin-features-id', params: { id:key } } ">{{project.name}}</nuxt-link>-->                                
                                    <button
                                        v-on:click="editFeature(key)"											
                                        class="btn btn-success">
                                        <i class="material-icons blue--text">create</i>																					
                                    </button>
                                    <button
                                        v-on:click="showFeature(key)"											
                                        class="btn btn-success">
                                        <i class="material-icons blue--text">search</i>																					
                                    </button>                                                             
                                </td>                                                        
                            </tr>								
                        </tbody>    
                    </table>
                </div>                      
            </div>
        </div>
      </div>
      <div v-else>
        <h5 class="subheading">Have no rights to see this page !</h5>
      </div>                                             
    </div>          
  </section>  
</template>

<script>  
import {DB} from '@/services/fireinit.js'
import FeatureForm from '@/components/featureDetail.vue'

  export default {
    asyncData({store}) {
      return {                
        fireDB: DB.ref(),        
        featuresRef: DB.ref(`features`)
      }
    },
    data () {
      return {
        viable: false,
        showList: false,
        isEdit: false,
        isAdd: false,
        switch1: false,
        switch2: false,                                                                
        features: {},        
        featureKey: '',        
        model: []                      
      }
    },
    computed: {    
      projectKey () {
        return this.$route.params.id
      },
      rol () {
        return this.$route.params.rol
      },
      project () {
        return this.$route.params.project
      },    
    },
    created () {
      let vm = this      
      if(vm.rol == 'Administrador') {
          vm.viable = true
          vm.showList = true
      }                
      vm.featuresRef.orderByChild('project').equalTo(vm.projectKey).on('value', function(snapshot) {            
        vm.features = snapshot.val() 
      })
    }, // fin del created    
    methods: {        
        showAdd: function() {
            let vm = this
            vm.isAdd = true
            vm.showList = false                                                                                                                              
        },
        editFeature: function(key) {
            let vm = this
            vm.featureKey = key
            console.log("Selected key to edit is: " + key)            
            vm.featuresRef.child(key).once('value', function(snapshot) {
              vm.model = snapshot.val()
              vm.switch1 = vm.model.isActive
              vm.switch2 = vm.model.onsale
              vm.showList = false
              vm.isEdit = true
            })                       
        },
        showFeature: function(key) {
            console.log("el key en showFeature es: " + key)
            let vm = this
            vm.featuresRef.child(key).on('value', function(snapshot) {
                let model = snapshot.val()
                vm.showList = false 
                console.log("el model.name es: " + model.name)
                vm.$router.push({ 
                    name: 'admin-projects-features-id', 
                    params: { id: key, feature: model, project: vm.project, rol: vm.rol } 
                })                                    
            })                       
        }, 
        addFeature: function(model) {
            let vm = this
            if(model.isActive == undefined)                
                model.isActive = false
            if(model.onsale == undefined)
                model.onsale = false    
            var postData = {
                name: model.name,
                isActive: model.isActive,
                figure: model.figure,
                onsale: model.onsale,
                project: vm.projectKey                                
            } 
            // Get a key for a new Post.
            let newPostKey = vm.fireDB.child('features').push().key
            console.log("el nuevo pushKey es: " + newPostKey)              
            let updates = {}            
            updates['/features/' + newPostKey] = postData
            updates['/projects/' + vm.projectKey + '/features/' + newPostKey] = true                   
            vm.fireDB.update(updates).then(() => {
                console.log("Adición realizada! ")
                vm.showList = true
                vm.isAdd = false                                
            })      
        },                
        updateFeature: function(model) {
            let vm = this            
            console.log("toy en updateFeature de: " + model.name)
            var postData = {
                name: model.name,
                isActive: model.isActive,
                figure: model.figure,
                onsale: model.onsale,
                project: vm.projectKey
            }                           
            let updates = {}
            updates[vm.featureKey] = postData        
            this.featuresRef.update(updates).then(() => {
                console.log("Actualización realizada! ")                
                vm.showList = true
                vm.isEdit = false
                //this.$router.push('projects')                                                
            })            
        },                                               
    },
    components: {
        'feature-detail': FeatureForm    
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
  margin-top: .25em;
}
</style>