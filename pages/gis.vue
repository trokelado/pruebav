
<template>
  <div id="app">
    <v-app id="inspire">      
        <div v-if="visible">
          <v-container>  
            <v-flex xs12 sm6 md2 class="ml-0 pl-0">
              <v-select
                :items="basemaps"
                v-model="basemap"                
                label="Mapa"                
                item-text="label"
                item-value="value"                
                placeholder="Mapa tipo"                             
                return-object                            
                min-width=130                                                                                                      
              ></v-select>
            </v-flex>
            <v-flex xs12 sm6 md2 class="ml-0 pl-0">
              <v-select
                :items="modes"
                v-model="mode"
                label="Acción"
                placeholder="Acción"
                autocomplete              
              ></v-select>
            </v-flex>
            <v-flex xs12 sm6 md2 text-xs-center class="ml-0 pl-0">
              <v-select
                :items="figures"
                v-model="figure"
                label="Figura"
                placeholder="Figura"
                autocomplete
              ></v-select>
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
            <v-flex xs12 sm6 md2 text-xs-center class="ml-0 pl-0">
              <v-select                
                v-bind:items="books"                
                v-model="selectedBook"
                label="Libro"
                placeholder="Libro"                                
                item-text="title"                
                item-value="key"                            
              ></v-select>                                                                                
            </v-flex>
            <v-btn
              icon
              @click.native="visible = !visible">
              <v-icon class="white blue--text">menu</v-icon>
            </v-btn>        
          </v-container>  
        </div>
        <div v-else>
          <v-toolbar>                            
            <v-toolbar-items>
              <v-container fluid>
                <v-layout row wrap class="hidden-sm-and-down">

                  <v-flex xs12 sm6 md2 class="ml-0 pl-0">
                    <v-select
                      :items="basemaps"
                      v-model="basemap"                
                      label="Mapa"                
                      item-text="label"
                      item-value="value"                
                      placeholder="Mapa tipo"                             
                      return-object                            
                      min-width=130                                                                                                      
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md2 class="ml-0 pl-0">
                    <v-select
                      :items="modes"
                      v-model="mode"
                      label="Acción"
                      placeholder="Acción"
                      autocomplete              
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md2 text-xs-center class="ml-0 pl-0">
                    <v-select
                      :items="figures"
                      v-model="figure"
                      label="Figura"
                      placeholder="Figura"
                      autocomplete
                    ></v-select>
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
                  <v-flex xs12 sm6 md2 text-xs-center class="ml-0 pl-0">
                    <v-select                
                      v-bind:items="books"                
                      v-model="selectedBook"
                      label="Libro"
                      placeholder="Libro"                                
                      item-text="title"                
                      item-value="key"                            
                    ></v-select>                                                                                
                  </v-flex>                                    
                </v-layout>                
              </v-container>                    
            </v-toolbar-items>
            <v-spacer></v-spacer>    
            <v-toolbar-items>
              <v-btn
                icon
                @click.native="visible = !visible">
                <v-icon class="white blue--text">menu</v-icon>
              </v-btn>
              <!-- <h5 class="blue--text">GIS</h5> -->
            </v-toolbar-items>            
          </v-toolbar>                                            
        </div>          
    </v-app>
  </div>          
</template>

<script>
  import {DB} from '@/services/fireinit.js'

  export default {
    asyncData({store}) {
      return {
        librariesRef: DB.ref('libraries').orderByChild('name'),        
        booksRef: DB.ref('books') //.orderByChild('title')
      }
    },
    data () {
      return {
        visible: false,                     
        selectedLibrary: [],
        selectedBook: '',
        mode: '',
        figure: '',        
        basemap: { value: 'Mapa', label: 'Selecciona' },        
        libraries: [],
        //keys: [],        
        books: [],                
        basemaps: [
            {value: 'gray', label: 'Gris claro'},
            {value: 'dark-gray', label: 'Gris obscuro'},
            {value: 'hybrid', label: 'Hibrido'},
            {value: 'national-geographic', label: 'Nat.Geogra'},
            {value: 'oceans', label: 'Oceánico'},
            {value: 'osm', label: 'Osm'},
            {value: 'satellite', label: 'Satelital'},            
            {value: 'topo', label: 'Topográfico'},
            {value: 'streets', label: 'Urbano'}                                                
        ],        
        modes: [          
            'Consultar', 'Navegar', 'Agregar'          
        ],
          figures: [                      
            'Puntos', 'Lineas', 'Poligonos', 'Circulos', 'Proyectos'
        ]
      }
    },
    methods: {
      changeLink(a) {
        //this.$router.push({path: a })
        console.log(a)
      },
      changedLib: function(value) {
        let vm = this 
        //receive the value selected (return an array if is multiple)        
        console.log("entre a la funcion changedLib con el name: " + value.name)
        console.log("entre a la funcion changedLib con el id: " + value.key)
        vm.selectedBook= ''
        vm.books= []
        let key = value.key
        vm.booksRef.orderByChild('library').equalTo(key).on('child_added', function(snapshot) {
          vm.books.push(snapshot.val())  // Push children to a local users array               
        })        
      },
    },
    created () {
      let vm = this            
      vm.librariesRef.on('value', function(snapshot) {
        var items = snapshot.val() // Keep the local links object synced with the Firebase linkRef        
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
        //vm.libraries.push(snapshot.val())  // Push children to a local users array        
        //vm.link.titulo = snapshot.child('titulo').val()
        //vm.link.autor = snapshot.child('autor').val()               
      })      
    },
    watch: { 
      /*             
      selectedLibrary: function(value) {
        // Clear previously selected values          
        this.selectedBook = ""          
        let vm = this          
        //vm.$unbind('books')
        let id = vm.value                                                        
        // Populate list of books in the second dropdown
        console.log("entre a la funcion selectedLibrary con el Id: " + id)
        if (id.length > 0) {
            console.log("entre a la funcion selectedLibrary con el Id: " + vm.selectedLibrary['.key'])
            vm.$bindAsArray('books', booksRef.orderByChild('library').equalTo(id))
        }
      }
      */
    }
  }
</script>