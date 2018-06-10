<!-- ./src/components/projectDetail.vue -->

<template>
  <form @submit.prevent="saveProject">
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
                    @keyup.enter="spRef"
                    name="spRef"
                    label="spatial Ref"
                    id="spRef"
                    v-model="model.spRef"
                    ></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs12 md2>
                    <v-text-field
                    @keyup.enter="maxX"
                    name="maxX"
                    label="maxX"
                    id="maxX"
                    v-model="model.maxX"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 md2>
                    <v-text-field
                    @keyup.enter="maxY"
                    name="maxY"
                    label="maxY"
                    id="maxY"
                    v-model="model.maxY"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 md2>
                    <v-text-field
                    @keyup.enter="minX"
                    name="minX"
                    label="minX"
                    id="minX"
                    v-model="model.minX"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 md2>
                    <v-text-field
                    @keyup.enter="minY"
                    name="minY"
                    label="minY"
                    id="minY"
                    v-model="model.minY"
                    ></v-text-field>
                </v-flex>
            </v-layout>
            
            <v-btn @click="saveProject">Save</v-btn>            
                                                
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
      saveProject () {        
        this.$emit('save-project', this.model)
      },      
    }
  }
</script>