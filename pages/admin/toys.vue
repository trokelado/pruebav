<template>
  <section class="">
    <v-flex id="adminChild" xs12>
      <nuxt-child :key="$router.fullPath"></nuxt-child>
    </v-flex>      
    <div v-if="!$store.state.user">
      <login-form></login-form>
      <!-- <v-btn outline large flat nuxt @click="$router.push('/login')" primary>Sign In</v-btn> -->
    </div>
    <div v-else>
      <div v-if="viable">        
        <div class="card">
            <div class="card-header">
                <div v-if="isEdit"> 
                    <toy-detail :model="model" :switch1="switch1" @save-toy="updateToy"></toy-detail>
                </div>
                <div v-if="isAdd"> 
                    <toy-detail :model="model" :switch1="false" @save-toy="addToy"></toy-detail>
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
                                <th>Email</th>                            
                                <th>Activo</th>
                                <th>Rol</th>                                                        
                                <v-spacer></v-spacer>              
                                <th>Edita</th>
                                <th>Consulta</th>                            
                            </tr>
                        </thead>
                        <tbody>								
                            <tr v-for="(item, key) in toys" :key="key">									
                                <td>
                                    {{ item.name }}
                                </td>
                                <td>
                                    {{ item.email }}
                                </td>                            
                                <td>
                                    {{ item.isActive }}
                                </td>
                                <td>
                                    {{ item.rol }}
                                </td>                                                        
                                <v-spacer></v-spacer>
                                <td>                                                                                                 
                                    <button
                                        v-on:click="editToy(key)"											
                                        class="btn btn-success">
                                        <i class="material-icons blue--text">create</i>																					
                                    </button>                                
                                </td>
                                <td>                                                                                                 
                                    <button
                                        v-on:click="showToy(key)"											
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
import ToyForm from '@/components/toyDetail.vue'

  export default {
    asyncData({store}) {
      return {                
        toysRef: DB.ref(`toys`)
      }
    },
    data () {
      return {
        viable: false,
        showList: false,
        isEdit: false,
        isAdd: false,                
        switch1: false,
        rol: '',
        toys: {},        
        toyKey: '',                                
        model: []
        //toy: [],                
        //proyecto: {},                                        
      }
    },
    created () {
      let vm = this          
      // The signed-in user info.
      let user = this.$store.getters.activeUser
      console.log('user.uid: ' + user.uid)
      
      //vm.toysRef.orderByChild('uid').equalTo(user.uid).on('value', function(snapshot) { si jala
        vm.toysRef.on('value', function(snapshot) {                    
        vm.toys = snapshot.val()                
        for(var key in vm.toys) {
            var toy = vm.toys[key]
            console.log('el toy es: ' + toy.name)            
            if(user.uid == toy.uid) {                
                console.log('el rol es: ' + toy.rol)
                if(toy.rol == 'Administrador') {
                    vm.viable = true
                    vm.showList = true
                    vm.rol = toy.rol                    
                }                    
            }
        }                                    
      }) 
    }, // fin del created    
    methods: {
        showAdd: function() {
            let vm = this
            vm.isAdd = true
            vm.showList = false                                                                                                                              
        },                
        editToy: function(key) {
            let vm = this
            vm.toyKey = key            
            console.log("el key en editToy es: " + key)
            vm.toysRef.child(key).on('value', function(snapshot) {
                vm.model = snapshot.val()
                vm.switch1 = vm.model.isActive
                vm.isEdit = true
                vm.showList = false                                                    
            })        
        },
        showToy: function(key) {
            console.log("el key en showToy es: " + key)
            let vm = this
            vm.toysRef.child(key).on('value', function(snapshot) {
                let model = snapshot.val()
                vm.showList = false 
                console.log("el model.name es: " + model.name)
                vm.$router.push({ 
                    name: 'admin-toys-id', 
                    params: { id: key, toy: model, rol: vm.rol } 
                })                                    
            })                                                      
        },
        //esta funcion es temporal 
        addToy: function(model) {
            let vm = this
            if(model.isActive == undefined)                
                model.isActive = false
            var postData = {
                name: model.name,
                isActive: model.isActive,
                email: model.email,
                rol: model.rol,
                uid: model.uid                
            } 
            // Get a key for a new Post.
            let newPostKey = this.toysRef.push().key
            console.log("el nuevo pushKey es: " + newPostKey)              
            let updates = {}
            updates[newPostKey] = postData        
            this.toysRef.update(updates).then(() => {
                console.log("Adición realizada! ")                
                vm.showList = true
                vm.isAdd = false                
            })      
        },
        updateToy: function(model) {
            let vm = this
            console.log("toy en updateToy voy a usar la key: " + vm.toyKey)
            var postData = {
                name: model.name,                
                isActive: model.isActive,
                email: model.email,
                rol: model.rol,
                uid: model.uid
            }                          
            let updates = {}
            updates[vm.toyKey] = postData        
            this.toysRef.update(updates).then(() => {
                console.log("Actualización realizada! ")                
                vm.toyKey = ''
                vm.showList = true
                vm.isEdit = false                
            })            
        },                      
    },
    components: {
        'toy-detail': ToyForm    
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