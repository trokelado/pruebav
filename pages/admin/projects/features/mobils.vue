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
                    <mobil-detail :model="model" :switch1="switch1" @save-mobil="updateMobil"></mobil-detail>
                </div>
                <div v-if="isAdd"> 
                    <mobil-detail :model="model" :switch1="false" @save-mobil="addMobil"></mobil-detail>
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
                                <th>Logo</th>
                                <th>Size</th>
                                <th>Taxonomia</th>
                                <v-spacer></v-spacer>              
                                <th>Modifica</th>                            
                            </tr>
                        </thead>
                        <tbody>								
                            <tr v-for="(item, key) in mobils" :key="key">									
                                <td>
                                    {{ item.name }}
                                </td>                            
                                <td>
                                    {{ item.isActive }}
                                </td>
                                <td>
                                    {{ item.logo }}
                                </td> 
                                <td>
                                    {{ item.size }}
                                </td> 
                                <td>
                                    {{ item.taxo }}
                                </td>                          
                                <v-spacer></v-spacer>
                                <td>
                                    <!-- <nuxt-link to="/admin/features/_id", props: { key: key }>< Edit record</nuxt-link> -->
                                    <!--<nuxt-link :to="{ name: 'admin-features-id', params: { id:key } } ">{{feature.name}}</nuxt-link>-->                                
                                    <button
                                        v-on:click="editMobil(key)"											
                                        class="btn btn-success">
                                        <i class="material-icons blue--text">create</i>																					
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
import MobilForm from '@/components/mobilDetail.vue'

  export default {
    asyncData({store}) {
      return {                
        fireDB: DB.ref(),        
        mobilsRef: DB.ref(`mobils`)
      }
    },
    data () {
      return {
        viable: false,
        showList: false,
        isEdit: false,
        isAdd: false,
        switch1: false,                                                         
        mobils: {},                                
        mobilKey: '',        
        model: []                      
      }
    },
    computed: {    
      featureKey () {
        return this.$route.params.id
      },
      rol () {
        return this.$route.params.rol
      },    
    },
    created () {
      let vm = this      
      if(vm.rol == 'Administrador') {
          vm.viable = true
          vm.showList = true
      }           
      vm.mobilsRef.orderByChild('feature').equalTo(vm.featureKey).on('value', function(snapshot) {            
        vm.mobils = snapshot.val()                   
      })
    }, // fin del created    
    methods: {        
        showAdd: function() {
            let vm = this
            vm.isAdd = true
            vm.showList = false                                                                                                                              
        },
        editMobil: function(key) {
            let vm = this
            vm.mobilKey = key
            console.log("Selected key to edit is: " + key)            
            vm.mobilsRef.child(key).once('value', function(snapshot) {
              vm.model = snapshot.val()
              vm.switch1 = vm.model.isActive
              vm.isEdit = true
              vm.showList = false                                            
            })                       
        },          
        addMobil: function(model) {
            let vm = this
            if(model.isActive == undefined)                
                model.isActive = false
            var postData = {
                name: model.name,
                isActive: model.isActive,
                logo: model.logo,
                size: model.size,
                taxo: model.taxo,
                feature: vm.featureKey                                
            } 
            // Get a key for a new Post.
            let newPostKey = vm.fireDB.child('mobils').push().key
            console.log("el nuevo pushKey es: " + newPostKey)              
            let updates = {}            
            updates['/mobils/' + newPostKey] = postData
            updates['/features/' + vm.featureKey + '/mobils/' + newPostKey] = true                   
            vm.fireDB.update(updates).then(() => {
                console.log("Adición realizada! ")
                vm.showList = true
                vm.isAdd = false                                
            })      
        },                
        updateMobil: function(model) {
            let vm = this            
            console.log("toy en updateMobil de: " + model.name)
            var postData = {
                name: model.name,
                isActive: model.isActive,
                logo: model.logo,
                size: model.size,
                taxo: model.taxo,
                feature: vm.featureKey
            }                           
            let updates = {}
            updates[vm.mobilKey] = postData        
            this.mobilsRef.update(updates).then(() => {
                console.log("Actualización realizada! ")                
                vm.showList = true
                vm.isEdit = false                                                                
            })            
        },                                              
    },
    components: {
        'mobil-detail': MobilForm    
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