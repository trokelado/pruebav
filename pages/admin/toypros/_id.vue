<!-- ./src/pages/admin/toypros/_id.vue -->
<template>
  <section class="">
    <v-flex id="adminChild" xs12>
      <nuxt-child :key="$router.fullPath"></nuxt-child>
    </v-flex>        
    <!--<project-detail :model="model" :isEditing="isEditing" @save-toyproject="saveToyProject"></project-detail>-->
    <v-layout row wrap>
      <v-flex xs12 md3>
          <v-text-field
          @keyup.enter="Name"
          name="name"
          label="Name"
          id="name"
          v-model="model.name"
          ></v-text-field>          
      </v-flex>                        
      <v-flex xs12 md3 offset-xs1>
          <v-switch :label="`is Active: ${switch1.toString()}`" v-model="model.isActive"></v-switch>                            
      </v-flex>                                                                                                       
      <v-flex xs12 sm6 md2 text-xs-center class="ml-0 pl-0">
          <v-select                                
          v-bind:items="projects"                
          v-model="selectedProject"
          @change="changedPro"
          label="Project"
          placeholder="Project"                
          item-text="name"                
          item-value="key"
          return-object                                          
          ></v-select>              
      </v-flex>                        
    </v-layout>
    <v-btn @click="saveToyProject">Save</v-btn>    
  </section>
</template>

<script>
import {DB} from '@/services/fireinit.js'

export default {  
  asyncData({store}) {
    return {
      //toyprosRef: DB.ref(`toypros`),
      projectsRef: DB.ref(`projects`),                                       
    }
  },        
  data () {
    return {
      model: [],
      key: [],                  
      switch1: false,
      selectedProject: [],      
      proKey: '',
      projectName: ''
    }
  },  
  created () {
    let vm = this                    
    vm.key = this.$route.params.id
    vm.model = this.$route.params.model
    vm.proKey = vm.model.project
    console.log('The id received from toyproject $route is: ' + vm.key)
    console.log('el proyecto recibido es: ' + vm.proKey)    
    vm.projectsRef.once('value', function(snapshot) {
            let items = snapshot.val() 
            let keys = Object.keys(items)
            console.log(keys)
            var arr = []                      
            for (var i = 0; i < keys.length; i++) {
                var k = keys[i]
                arr.push({
                        key: k,
                        name: items[k].name
                })
                if(k == vm.model.project) {
                  vm.projectName = items[k].name
                  console.log('el proyecto origen es : ' + items[k].name)
                }                            
            }        
            vm.projects = arr
            vm.selectedProject = vm.proKey //no jala  
        })      
  },
  methods: {
    saveToyProject: function (model) {
      let vm = this                   
      var modelo = {
            name: this.model.name,
            isActive: this.model.isActive,
            project: vm.proKey
      }      
      console.log('toy en saveToyProject de _id.vue The model.name is: ' + modelo.name)
        this.$router.push({ name: 'admin-toypros'})      
        this.$emit('save-toy-project', modelo)                                      
    },
    changedPro: function(value) {
        let vm = this                     
        console.log("entre a la funcion changedPro con el name: " + value.name)
        console.log("entre a la funcion changedPro con el id: " + value.key)            
        vm.proKey = value.key                
    },                 
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
  margin-top: 1em;
}
</style>