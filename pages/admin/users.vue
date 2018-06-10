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
                <h5 class="card-title"> Usuarios</h5>
            </div>            
            <div class="card-body">        
                <table class="table table-striped">
                    <thead>
                        <tr>              
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Activo</th>
                            <th>Rol</th>
                            <v-spacer></v-spacer>              
                            <th>Activo/Inactivo</th>
                            <th>
                                <v-flex xs12 sm6 md6 class="ml-0 pl-0">
                                    <v-select
                                        :items="roles"
                                        v-model="rol"                                                    
                                        placeholder="Rol"
                                        autocomplete                         
                                        min-width=130                                                                                                      
                                    ></v-select>
                                </v-flex>
                            </th>
                        </tr>
                    </thead>
                    <tbody>								
                        <tr v-for="(usuario, key) in usuarios" :key="key">									
                            <td>
                                {{ usuario.name }}
                            </td>
                            <td>
                                {{ usuario.email }}
                            </td>
                            <td>
                                {{ usuario.isActive }}
                            </td>
                            <td>
                                {{ usuario.rol }}
                            </td>
                            <v-spacer></v-spacer>
                            <td>
                                <button
                                v-on:click="updateUsuario(key, usuario)"											
                                class="btn btn-success">
                                <i class="material-icons blue--text">save</i>																					
                                </button>
                            </td>
                            <td>
                                <button
                                v-on:click="updateRol(key, rol)"											
                                class="btn btn-success">
                                <i class="material-icons blue--text">save</i>																					
                                </button>
                            </td>
                        </tr>								
                    </tbody>    
                </table>  
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

  export default {
    asyncData({store}) {
      return {        
        itemsRef: DB.ref(`items/${store.state.user.uid}`),        
        usersRef: DB.ref(`items`)
      }
    },
    data () {
      return {
        viable: false,
        usuario: '',
        usuarios: {},
        rol: '',
        roles: [                      
            'Administrador', 'Operador', 'Visitante', 'Vendedor', 'Comprador'
        ]
      }
    },
    created () {
      let vm = this          
      // The signed-in user info.
      let user = this.$store.getters.activeUser
      console.log('user.uid: ' + user.uid)    
      vm.itemsRef.child('rol').on('value', function(snapshot) {      
        vm.rol = snapshot.val()
        console.log('el rol es: ' + vm.rol)
        if(vm.rol == 'Administrador') {
          vm.viable = true
        }     
      }) //fin del 1er snapshot      
      vm.usersRef.on('value', function(snapshotB) {
        vm.usuarios = snapshotB.val() 
      })
    }, // fin del created    
    methods: {            
        updateUsuario: function(key, usuario) {
            usuario.isActive = !usuario.isActive
        this.usersRef.child(key).child('isActive').set(usuario.isActive)        
        },
        updateRol: function(key, newRol) {            
        this.usersRef.child(key).child('rol').set(newRol)        
        },
    }     
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