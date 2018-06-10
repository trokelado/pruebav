<!-- <template>
  <section class="">    
    <v-layout row wrap>
      <v-flex xs12 md6>
        <v-list>
          <v-list-tile v-for="(item, key) in links" :key="key">
            <v-list-tile-title>{{item.titulo}}</v-list-tile-title>
            <v-list-tile-title>{{item.autor}}</v-list-tile-title>
            <v-list-tile-title>{{key}}</v-list-tile-title>
            <v-spacer></v-spacer>            
          </v-list-tile>
        </v-list>
      </v-flex>           
    </v-layout>
  </section>
</template>
-->
<template>
  <section class=""> 
    <div class="card">
      <div class="card-header">
        <h4 class="card-title"> Lista de enlaces</h4>
      </div>
      <v-layout row wrap>
        <v-flex xs12 md3>
          <v-text-field
            @keyup.enter="addTitle"
            name="titulo"
            label="Add New Titulo"
            id="titulo"
            v-model="newTitulo"
          ></v-text-field>          
        </v-flex>
        <v-flex xs12 md3>
          <v-text-field
            @keyup.enter="addAutor"
            name="autor"
            label="Add New Autor"
            id="autor"
            v-model="newAutor"
          ></v-text-field>
        </v-flex>
        <v-btn @click="addLink">Add Item</v-btn>
      </v-layout>
      <div class="card-body">        
        <table class="table table-striped">
          <thead>
            <tr>              
              <th>Titulo</th>
              <th>Autor</th>
              <th>Id</th>
              <v-spacer></v-spacer>              
              <th>Editar</th>
              <th>Borrar</th>
            </tr>
          </thead>
          <tbody>								
            <tr v-for="(link, key) in links" :key="key">									
              <td>
                <a v-bind:href="link.url" target="_blank">{{ link.titulo }}</a>
              </td>
              <td>
                {{ link.autor }}
              </td>
              <td>
                {{ key }}
              </td>
              <v-spacer></v-spacer>
              <td>
                <button
                  v-on:click="updateLink(key, newTitulo, newAutor)"											
                  class="btn btn-success">
                  <i class="material-icons blue--text">save</i>																					
                </button>
              </td>
              <td>
                <button
                  class="btn btn-danger  px-0"
                  v-on:click="deleteLink(key)">                    
                  <i class="material-icons red--text">delete</i>																					
                </button>
              </td>																			
            </tr>								
          </tbody>    
        </table>  
      </div>
    </div>
  </section>
</template>

<script>
import {DB} from '@/services/fireinit.js'

export default {
  asyncData({store}) {
    return {
      linksRef: DB.ref(`links`)
    }
  },
  data () {
    return {
      link: '',
      links: {},
      newTitulo: '',
      newAutor: ''
    }
  },
  created () {
    let vm = this
    vm.linksRef.on('value', function(snapshot) {
      vm.links = snapshot.val() // Keep the local links object synced with the Firebase linkRef       
    })
  },
  methods: {
    addLink () {
      this.linksRef.push({
        titulo: this.newTitulo,
        autor: this.newAutor
      }).then(() => {
        this.newTitulo = ''
        this.newAutor = ''
      })
    },    
    updateLink: function(key, newTitulo, newAutor) {
      this.linksRef.child(key).child('titulo').set(newTitulo)
      this.linksRef.child(key).child('autor').set(newAutor)
    },
    deleteLink: function(key) {
      this.linksRef.child(key).remove()
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
  margin-top: 1em;
}
</style>
<!--  -->
