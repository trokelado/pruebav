<template>
  <div id="app">
    <v-app id="inspire">      
        <div v-if="!$store.state.user">
          <login-form></login-form>
          <!-- <v-btn outline large flat nuxt @click="$router.push('/login')" primary>Sign In</v-btn> -->
        </div>
        <div v-else>
          <v-parallax src="/img/frames/tierra67b.jpg" height="300">
          <h2 class="header black--text">WebShore</h2>
          <h3 class="black--text">Make your life easier!</h3>      
          </v-parallax>
          <div class="left-align">      
            <h4 class="white black--text pl-3">Geographic Information System</h4>      
          </div>
          <!-- <v-parallax src="https://vuetifyjs.com/static/doc-images/parallax/material2.jpg"> -->
          <v-parallax src="/img/frames/partnersAA.jpg" height="300">
            <h2 class="header">Sistema de Información Geográfica</h2>
          </v-parallax>
          <!-- quitar de aqui solo es para prueba
            <td>
                <button
                v-on:click="addUser()"											
                class="btn btn-success">
                <i class="material-icons blue--text">save</i>																					
                </button>
            </td>
          -->                                            
        </div>          
    </v-app>
  </div>    
</template>

<script>
import LoginForm from '~/components/LoginForm'
import {DB} from '@/services/fireinit.js'

export default {
  asyncData({store}) {
    return {
      fireDB: DB.ref(),
      itemsRef: DB.ref(`items/${store.state.user.uid}`),
      toysRef: DB.ref(`toys`)
    }
  },
  components: {
    LoginForm
  },  
  created () {
    let vm = this    
    //var token = result.credential.accessToken
    // The signed-in user info.
    let user = this.$store.getters.activeUser
    console.log('user.uid: ' + user.uid)
    //version ember
    vm.toysRef.orderByChild('uid').equalTo(user.uid).on('value', function(snapshot) {
      if(!snapshot.exists()) {        
        let postData = {
          name: user.displayName,
          email: user.email,
          isActive: true,
          rol: 'Visitante',
          src: user.photoURL,
          uid: user.uid
        }
        // Get a key for a new Post.
        let newPostKey = vm.toysRef.push().key
        console.log("el nuevo pushKey es: " + newPostKey)              
        let updates = {}
        updates[newPostKey] = postData 
        vm.toysRef.update(updates).then(() => {
          console.log('new user added !')
        })
      }
      else {
        console.log('el usuario ya existe !')  
      } // fin del if else        
    }) //fin del snapshot

/*    //version vue
    vm.itemsRef.on('value', function(snapshot) {
      if(!snapshot.exists()) {        
        let postData = {
          name: user.displayName,
          email: user.email,
          isActive: true,
          rol: 'Visitante',
          src: user.photoURL
        }        
        vm.itemsRef.update(postData).then(() => {
          console.log('new user added !')
        })
      }
      else {
        console.log('el usuario ya tiene rol !')  
      } // fin del if else
    }) //fin del snapshot
*/
  }, // fin del created  
/*
  //solo para prueba version vue luego quitar de aqui
  methods: {
    addUser () {
      var postData = {
        name: 'Calixto Nopalitos',
        email: 'trokelado2@hotmail.com',
        isActive: true,
        rol: 'Visitante',
        src: 'cualquier'
      }
      let newPostKey = 'KERJmQxGdNhBRpgDKBS4xNr7KF74'
      let updates = {}
      updates['/items/' + newPostKey] = postData
      this.fireDB.update(updates).then(() => {
        console.log('la adicion de usuario esta lista !')   
      })       
    },        
  }
*/ 
} // fin del export default
</script>

<style scoped>
.fake {
  background: blue;
}
.wrapper {
  margin-top: -7.5em;
}
.flexWrapper {
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
}
.container {
  height: calc(100vh - 100px);
  align-items: center;
  align-content: center;
  display: flex;
  justify-content: center;
}
.title {
  font-size: 2.5em !important;
  /*margin-top: -5em;*/
}

@media (min-width: 750px) {
  .title {
    font-size: 3.5em !important;
  }
}
</style>
