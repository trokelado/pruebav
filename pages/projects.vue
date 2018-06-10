<template>
  <section class="">          
    <div v-if="!$store.state.user">
      <login-form></login-form>
      <!-- <v-btn outline large flat nuxt @click="$router.push('/login')" primary>Sign In</v-btn> -->
    </div>
    <div v-else>
      <div v-if="viable">
        <h5 class="subheading">Welcome to projects !</h5>  
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
        itemsRef: DB.ref(`items/${store.state.user.uid}`)
      }
    },
    data () {
      return {                                       
        viable: false
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
      }) //fin del snapshot            
    }, // fin del created    
  }
</script>
