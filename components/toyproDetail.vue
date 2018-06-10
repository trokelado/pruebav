<!-- ./src/components/toyproDetail.vue -->
<template>
  <form @submit.prevent="saveToyPro">
    <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
      <div class="card">
        <div class="card-header">                                
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
                    :items="projects"
                    v-model="model.project"
                    label="Project"
                    placeholder="Project"
                    item-text="name"
                    item-value="key"
                    autocomplete
                    ></v-select>              
                </v-flex>
            </v-layout>                        
            <v-btn @click="saveToyPro">Save</v-btn>                                                            
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import {DB} from '@/services/fireinit.js'

  export default {
    props: ['model', 'switch1', 'projects'],    
    data () {
      return {
        
      }
    },
    created () {
      /*
    vm.projectsRef.once('value', function(snapshot) {                    
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
      */           
    },    
    methods: {
      saveToyPro () {        
        this.$emit('save-toypro', this.model)
      },      
    }
  }
</script>