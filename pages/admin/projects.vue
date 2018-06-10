<template>
  <section class="">
  <!-- cuando viene un evento de un child
      <v-flex id="adminChild" xs12>
      <nuxt-child :key="$router.fullPath"         
        @save-project="saveProject">
      </nuxt-child>
    </v-flex>
  -->
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
                    <project-detail :model="model" :switch1="switch1" @save-project="updateProject"></project-detail>
                </div>
                <div v-if="isAdd"> 
                    <project-detail :model="model" :switch1="false" @save-project="addProject"></project-detail>
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
                                <th>Max X</th>
                                <th>Max Y</th>
                                <th>Min X</th>
                                <th>Min Y</th>
                                <th>Sp Reference</th>
                                <v-spacer></v-spacer>              
                                <th>Edita</th>
                                <th>Consulta</th>                            
                            </tr>
                        </thead>
                        <tbody>								
                            <tr v-for="(item, key) in projects" :key="key">									
                                <td>
                                    {{ item.name }}
                                </td>                            
                                <td>
                                    {{ item.isActive }}
                                </td>
                                <td>
                                    {{ item.maxX }}
                                </td>
                                <td>
                                    {{ item.maxY }}
                                </td>
                                <td>
                                    {{ item.minX }}
                                </td>
                                <td>
                                    {{ item.minY }}
                                </td>
                                <td>
                                    {{ item.spRef }}
                                </td>
                                <v-spacer></v-spacer>
                                <td>
                                    <!-- <nuxt-link to="/admin/projects/_id", props: { key: key }>< Edit record</nuxt-link> -->
                                    <!--<nuxt-link :to="{ name: 'admin-projects-id', params: { id:key } } ">{{project.name}}</nuxt-link>-->                                
                                    <button
                                        v-on:click="editProject(key)"											
                                        class="btn btn-success">
                                        <i class="material-icons blue--text">create</i>																					
                                    </button>
                                    <button
                                        v-on:click="showProject(key)"											
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
import ProjectForm from '@/components/projectDetail.vue'

  export default {
    asyncData({store}) {
      return {
        toysRef: DB.ref(`toys`),                        
        projectsRef: DB.ref(`projects`)
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
        projects: {},                        
        projectkey: '',        
        model: []               
      }
    },
    created () {
    /* version anterior
      let vm = this          
      // The signed-in user info.
      let user = this.$store.getters.activeUser
      console.log('user.uid: ' + user.uid)    
      vm.itemsRef.child('rol').on('value', function(snapshot) {      
        vm.rol = snapshot.val()
        console.log('el rol es: ' + vm.rol)
        if(vm.rol == 'Administrador') {
          vm.viable = true
          vm.showList = true
        }
    */
      let vm = this          
      // The signed-in user info.
      let user = this.$store.getters.activeUser
      console.log('user.uid: ' + user.uid)      
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
      vm.projectsRef.on('value', function(snapshotB) {
        vm.projects = snapshotB.val() 
      })
    }, // fin del created    
    methods: {
        showAdd: function() {
            let vm = this
            vm.isAdd = true
            vm.showList = false                                                                                                                              
        },
        editProject: function(key) {
            let vm = this
            vm.projectKey = key            
            console.log("selected key to edit is: " + key)            
            vm.projectsRef.child(key).once('value', function(snapshot) {
              vm.model = snapshot.val()
              vm.switch1 = vm.model.isActive
              vm.isEdit = true
              vm.showList = false                           
            }) 
            //this.$router.push({ name: 'admin-projects-id', params: { id: key, mode: modo }})            
        },
        showProject: function(key) {
            console.log("el key en showProject es: " + key)
            let vm = this
            vm.projectsRef.child(key).on('value', function(snapshot) {
                let model = snapshot.val()
                console.log("el model.name es: " + model.name)
                vm.showList = false 
                vm.$router.push({ 
                    name: 'admin-projects-id', 
                    params: { id: key, project: model, rol: vm.rol } 
                })                                    
            })                       
        },                        
        addProject: function(model) {
            let vm = this
            if(model.isActive == undefined)                
                model.isActive = false
            var postData = {
                name: model.name,
                isActive: model.isActive,
                maxX: model.maxX,
                maxY: model.maxY,
                minX: model.minX,
                minY: model.minY,
                spRef: model.spRef,
            } 
            // Get a key for a new Post.
            let newPostKey = this.projectsRef.push().key
            console.log("el nuevo pushKey es: " + newPostKey)              
            let updates = {}
            updates[newPostKey] = postData        
            this.projectsRef.update(updates).then(() => {
                console.log("Adición realizada! ")                
                vm.showList = true
                vm.isAdd = false                
            })      
        },                
        updateProject: function(model) {
            let vm = this            
            console.log("toy en updateProject voy a usar la key: " + vm.projectKey)
            var postData = {
                name: model.name,
                isActive: model.isActive,
                maxX: model.maxX,
                maxY: model.maxY,
                minX: model.minX,
                minY: model.minY,
                spRef: model.spRef,
            }                           
            let updates = {}
            updates[vm.projectKey] = postData        
            this.projectsRef.update(updates).then(() => {
                console.log("Actualización realizada! ")                
                vm.projectkey = ''
                vm.showList = true
                vm.isEdit = false
                //this.$router.push('projects')
            })            
        },                
    },
    components: {
        'project-detail': ProjectForm    
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