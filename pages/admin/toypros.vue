<template>
  <section class="">
    <v-flex id="adminChild" xs12>      
        <nuxt-child :key="$router.fullPath">      
        </nuxt-child>      
    </v-flex>                      
    <div v-if="viable">               
        <div class="card">
            <div class="card-header">                
                <div v-if="isEdit"> 
                    <toypro-detail :model="model" :projects="projects" :switch1="switch1" @save-toypro="updateToyProject"></toypro-detail>
                </div>
                <div v-if="isAdd"> 
                    <toypro-detail :model="model" :projects="projects" :switch1="false" @save-toypro="addToyProject"></toypro-detail>
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
                                <v-spacer></v-spacer>              
                                <th>Modifica</th>                            
                            </tr>
                        </thead>
                        <tbody>								
                            <tr v-for="(item, key) in toyprojects" :key="key">									                            
                                <td>
                                    {{ item.name }}
                                </td>                            
                                <td>
                                    {{ item.isActive }}
                                </td>                                                                                    
                                <v-spacer></v-spacer>
                                <td>
                                    <!-- <nuxt-link to="/admin/projects/_id", props: { key: key }>< Edit record</nuxt-link> -->
                                    <!--<nuxt-link :to="{ name: 'admin-toypros-id', params: { id:key } } ">{{item.name}}</nuxt-link>-->                                                                
                                    <button                                
                                        v-on:click="editToyProject(key)"											
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
  </section>  
</template>

<script>  
import {DB} from '@/services/fireinit.js'
import ToyProForm from '@/components/toyproDetail.vue'

  export default {    
    asyncData({store}) {
      return {
        fireDB: DB.ref(),                
        toyprojectsRef: DB.ref(`toyprojects`),
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
        toyprojects: {},        
        toyproKey: '',
        projects: {},        
        model: []
                
      }
    },
    computed: {    
      toyKey () {
        return this.$route.params.id
      },
      rol () {
        return this.$route.params.rol
      },
      toy () {
        return this.$route.params.toy
      },    
    },
    created () {                
      let vm = this      
      if(vm.rol == 'Administrador') {
          vm.viable = true
          vm.showList = true
      }
      vm.toyprojectsRef.orderByChild('toy').equalTo(vm.toyKey).on('value', function(snapshot) {            
        vm.toyprojects = snapshot.val() 
      })
      vm.projectsRef.once('value', function(snapshot) {                    
        //vm.projects = snapshot.val()
        var items = snapshot.val() 
        var keys = Object.keys(items)
        console.log(keys)
        var arr = []                      
        for (var i = 0; i < keys.length; i++) {
            var k = keys[i]
            arr.push({
                key: k,
                name: items[k].name
            })          
        }        
        vm.projects = arr
      })         
    /*                     
        vm.toyprojectsRef.orderByChild('toy').equalTo(vm.toyKey).on('value', function(snapshot) {
            //vm.toyprojects.push(snapshot.val())
            snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key
                var childData = childSnapshot.val()
                console.log('The childKey is: ' + childKey)
                vm.toyproject.push(childSnapshot.val())
                vm.toyproKeys.push(childSnapshot.key)                                                                                                                                                         
            })
        })
    */                        
    }, // fin del created    
    methods: {
        showAdd: function() {
            let vm = this
            vm.isAdd = true
            vm.showList = false                                                                                                                              
        },
        editToyProject: function(key) {
            let vm = this
            vm.toyproKey = key
            console.log("Selected key to edit is: " + key)            
            vm.toyprojectsRef.child(key).once('value', function(snapshot) {
              vm.model = snapshot.val()
              vm.switch1 = vm.model.isActive              
              vm.showList = false
              vm.isEdit = true
            })                       
        },
        addToyProject: function(model) {
            let vm = this
            if(model.isActive == undefined)                
                model.isActive = false               
            var postData = {
                name: model.name,
                isActive: model.isActive,                                
                project: model.project,
                toy: vm.toyKey                                
            } 
            // Get a key for a new Post.
            let newPostKey = this.fireDB.child('toyprojects').push().key            
            console.log("el nuevo pushKey es: " + newPostKey)              
            let updates = {}
            updates['/toyprojects/' + newPostKey] = postData
            updates['/toys/' + vm.toyKey + '/toyprojects/' + newPostKey] = true                   
            vm.fireDB.update(updates).then(() => {
                console.log("Adición realizada! ")
                vm.showList = true
                vm.isAdd = false                                
            })      
        },
        updateToyProject: function(model) {
            let vm = this            
            console.log("toy en updateToyProject de: " + model.name)
            var postData = {
                name: model.name,
                isActive: model.isActive,                
                project: model.project,
                toy: vm.toyKey
            }                           
            let updates = {}
            updates[vm.toyproKey] = postData        
            this.toyprojectsRef.update(updates).then(() => {
                console.log("Actualización realizada! ")                
                vm.showList = true
                vm.isEdit = false
                //this.$router.push('projects')                                                
            })            
        },                                               
    },
    components: {
        'toypro-detail': ToyProForm    
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