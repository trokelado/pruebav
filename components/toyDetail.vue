<!-- ./src/components/toyDetail.vue -->
<template>
  <form @submit.prevent="saveToy">
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
                    :items="roles"
                    v-model="model.rol"
                    label="Role"
                    placeholder="Role"
                    autocomplete
                    ></v-select>              
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs12 md3>
                    <v-text-field
                    @keyup.enter="Email"
                    name="email"
                    label="email"
                    id="email"
                    v-model="model.email"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 md3>
                    <v-text-field
                    @keyup.enter="Uid"
                    name="uid"
                    label="uid"
                    id="uid"
                    v-model="model.uid"
                    ></v-text-field>
                </v-flex>                
            </v-layout>
            
            <v-btn @click="saveToy">Save</v-btn>            
                                                
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
        roles: [                      
            'Administrador', 'Operador', 'Visitante', 'Vendedor', 'Comprador'
        ]                                                        
      }
    },  
    methods: {
      saveToy () {        
        this.$emit('save-toy', this.model)
      },      
    }
  }
</script>