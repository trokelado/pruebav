<!--
<template>
  <section class="">
    <v-flex id="adminChild" xs12>
      <nuxt-child :key="$router.fullPath"></nuxt-child>
    </v-flex>
    <v-layout row wrap>
      <v-flex xs12 md4>
        <v-list>
          <v-list-tile v-for="(item, key) in items" :key="key">
            <v-list-tile-title>{{item.name}}</v-list-tile-title>
            <v-spacer></v-spacer>
            <v-list-tile-action @click="deleteItem(key)">
              <v-btn icon><v-icon>delete</v-icon></v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex xs12 md6>
        <v-text-field
          @keyup.enter="addItem"
          name="item"
          label="Add New Item"
          id="item"
          v-model="item"
        ></v-text-field>
        <v-btn @click="addItem">Add Item</v-btn>
      </v-flex>
    </v-layout>
  </section>
</template>
-->

<template>
  <section class="">
    <v-flex id="adminChild" xs12>
      <nuxt-child :key="$router.fullPath"></nuxt-child>
    </v-flex>
    <v-flex xs12 sm6 md2 text-xs-center class="ml-0 pl-0">
      <v-select                                
        v-bind:items="libraries"                
        v-model="selectedLibrary"
        @change="changedLib"
        label="Libreria"
        placeholder="Libreria"                
        item-text="name"                
        item-value="key"
        return-object                                          
      ></v-select>              
    </v-flex>
    <div class="card">
      <div class="card-header">
        <h4 class="card-title"> Lista de libros</h4>
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
        <v-btn @click="addBook">Add Item</v-btn>
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
            <tr v-for="book in books">									
              <td>
                <a v-bind:href="book.url" target="_blank">{{ book.title }}</a>
              </td>
              <td>
                {{ book.author }}
              </td>                            
              <v-spacer></v-spacer>
              <td>
                <button
                  v-on:click="updateBook(book, newTitulo, newAutor)"											
                  class="btn btn-success">
                  <i class="material-icons blue--text">save</i>																					
                </button>
              </td>
              <td>
                <button
                  class="btn btn-danger  px-0"
                  v-on:click="deleteBook(book)">                    
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
      //itemsRef: DB.ref(`items/${store.state.user.uid}`)
      librariesRef: DB.ref('libraries').orderByChild('name'),        
      booksRef: DB.ref('books'),
      fireDB: DB.ref()
    }
  },
  data () {
    return {
      item: '',
      items: {},
      selectedLibrary: [],
      libraries: [],
      books: [],
      bookKeys: [],
      newTitulo: '',
      newAutor: '',
      libraryKey: ''        
    }
  },
  created () {    
    let vm = this            
    vm.librariesRef.on('value', function(snapshot) {
      var items = snapshot.val() // Keep the local libraries object synced with the Firebase librariesRef        
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
      vm.libraries = arr                
    })    
  },
  methods: {        
    addBook () {
      var postData = {
        title: this.newTitulo,
        author: this.newAutor,
        library: this.libraryKey
      }
      // Get a key for a new Post.
      let newPostKey = this.fireDB.child('books').push().key
      console.log("el nuevo pushKey es: " + newPostKey)      
      let updates = {}
      updates['/books/' + newPostKey] = postData
      updates['/libraries/' + this.libraryKey + '/books/' + newPostKey] = true
      this.fireDB.update(updates).then(() => {
        this.newTitulo = ''
        this.newAutor = ''
      })      
    },    
    updateBook: function(book, newTitulo, newAutor) {
      let vm = this      
      let i = this.books.indexOf(book) //es el indice del combo no del registro firebase
      let key = vm.bookKeys[i]
      console.log("entre al updateBook " + key)      
      if(key.length > 0) {        
        let postData = {         
          title: newTitulo,
          author: newAutor,
          library: book.library
        }
        let parentData = {         
          name: 'cualquiera',        
          key: book.library
        }
        let updates = {}
        updates['/books/' + key] = postData      
        this.fireDB.update(updates).then(() => {
          let x = this.changedLib(parentData) //esto es para forzar el refresh        
        })  
      }                     
      // si jalan pero son individuales
      //this.booksRef.child(key).child('title').set(newTitulo)
      //this.booksRef.child(key).child('author').set(newAutor)
    },
    deleteBook: function(book) {
      let vm = this      
      let i = this.books.indexOf(book) //es el indice del combo no del registro firebase
      let key = vm.bookKeys[i]
      console.log("entre al deleteBook " + key)
      if(key.length > 0) {              
        let parentData = {         
          name: 'cualquiera',        
          key: book.library
        }
        var updates = {}
        updates['/books/' + key] = null
        updates['/libraries/' + this.libraryKey + '/books/' + key] = null
        this.fireDB.update(updates).then(() => {
          let x = this.changedLib(parentData) //esto es para forzar el refresh        
        })
      }
      // si jalan pero son individuales
      //this.booksRef.child(key).remove()
      //this.booksRef.child(book['.key']).remove()
    },    
    changedLib: function(value) {
      let vm = this 
      //receive the value selected (return an array if is multiple)        
      console.log("entre a la funcion changedLib con el name: " + value.name)
      console.log("entre a la funcion changedLib con el id: " + value.key)
      vm.books= []
      vm.bookKeys = []      
      let keys = []                  
      vm.libraryKey = value.key
      vm.booksRef.orderByChild('library').equalTo(vm.libraryKey).on('child_added', function(snapshot) {        
        vm.books.push(snapshot.val())  // Push children to a local items array
        keys.push(snapshot.key)                
      })      
      console.log('los indices son: ' + keys)
      if(keys.length > 0) {
        vm.bookKeys = keys
      }                         
    },
    rerender(){
        //this.show = false
        this.$nextTick(() => {
            //this.show = true
            console.log('re-render start')
            this.$nextTick(() => {
                console.log('re-render end')
            })
        })
    }
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
