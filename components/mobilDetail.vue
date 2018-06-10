<!-- ./src/components/mobilDetail.vue -->

<template>
  <form @submit.prevent="saveMobil">
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
                <v-flex xs12 md3>
                    <v-text-field
                    @keyup.enter="logo"
                    name="logo"
                    label="Logo"
                    id="logo"
                    v-model="model.logo"
                    ></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs12 md2>
                    <v-text-field
                    @keyup.enter="size"
                    name="size"
                    label="size"
                    id="size"
                    v-model="model.size"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 md2>
                    <v-text-field
                    @keyup.enter="taxo"
                    name="taxo"
                    label="taxo"
                    id="taxo"
                    v-model="model.taxo"
                    ></v-text-field>
                </v-flex>                
            </v-layout>
            
            <v-btn @click="saveMobil">Save</v-btn>            
                                                
        </div>
      </div>
    </div>
  </form>
</template>

<script>
  export default {
    props: ['model', 'switch1'],
    data () {
      return {                                        
      }
    },  
    methods: {
      saveMobil () {        
        this.$emit('save-mobil', this.model)
      },      
    }
  }
</script>