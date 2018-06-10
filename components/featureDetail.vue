<!-- ./src/components/featureDetail.vue -->

<template>
  <form @submit.prevent="saveFeature">
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
                    :items="figures"
                    v-model="model.figure"
                    label="Figura"
                    placeholder="Figura"
                    autocomplete
                    ></v-select>              
                </v-flex>
                <v-flex xs12 md3 offset-xs1>
                    <v-switch :label="`On sale: ${switch2.toString()}`" v-model="model.onsale"></v-switch>                            
                </v-flex>
            </v-layout>                        
            <v-btn @click="saveFeature">Save</v-btn>                                                            
        </div>
      </div>
    </div>
  </form>
</template>

<script>
  export default {
    props: ['model', 'switch1', 'switch2'],
    data () {
      return {                
        figures: [                      
            'Puntos', 'Lineas', 'Poligonos', 'Circulos', 'Proyectos'
        ]                        
      }
    },  
    methods: {
      saveFeature () {        
        this.$emit('save-feature', this.model)
      },      
    }
  }
</script>