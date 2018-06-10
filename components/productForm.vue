<!-- ./src/components/products/ProductForm.vue -->
<!--
<template>
  <form @submit.prevent="saveProduct">
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
            
            <v-btn @click="updateProject(key)">Save</v-btn>
            <v-btn @click="cancelEditProject(key)">Cancel</v-btn>                                    
        </div>
      </div>
    </div>
  </form>
</template>
-->
<template>
  <form @submit.prevent="saveProduct">
    <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">      
      <div class="form-group">
        <label>Name: </label>
        <input type="text" placeholder="Name" v-model="model.name" name="name" class="form-control" />
      </div>
      <div class="form-group">
        <label>Is Active: </label>
        <input type="text" placeholder="Is Active" v-model="model.isActive" name="isActive" class="form-control" />
      </div>
      <div class="form-group">
        <label>Max X: </label>
        <input type="number" placeholder="Max X" v-model="model.maxX" name="maxX" class="form-control" />
      </div>      
      <div class="form-group">
        <label>Max Y: </label>
        <input type="number" placeholder="Max Y" v-model="model.maxY" name="maxY" class="form-control" />
      </div>
      <div class="form-group">
        <label>Min X: </label>
        <input type="number" placeholder="Min X" v-model="model.minX" name="minX" class="form-control" />
      </div>
      <div class="form-group">
        <label>Min Y: </label>
        <input type="number" placeholder="Min Y" v-model="model.minY" name="minY" class="form-control" />
      </div>
      <div class="form-group">
        <label>Sp Reference: </label>
        <input type="number" placeholder="Sp. Reference" v-model="model.spRef" name="spRef" class="form-control" />
      </div>
    </div>
    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
      <!--
      <div class="form-group">
        <label>Proyecto</label>
        <select type="text" class="form-control" v-model="model.project" name="proyecto" class="form-control">
          <template v-for="project in projects">
            <option :value="project._id" :selected="project._id == (model.project && model.project._id)">{{project.name}}</option>
          </template>
        </select>
      </div>
      </div>
        <div class="form-group">
          <label>Image</label>
          <input type="text" lass="form-control" placeholder="Image" v-model="model.image" name="image" class="form-control" />
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea class="form-control" placeholder="Description" rows="5" v-model="model.description" name="description" class="form-control"></textarea>
        </div>
        -->
      <div class="form-group new-button">
        <button class="button">
          <i class="material-icons blue--text">save</i>
          <!--<i class="fa fa-pencil"></i> -->
          <!-- Conditional rendering for input text -->
          <span v-if="isEditing">Update Product</span>
          <span v-else>Add Product</span>
        </button>
        <p><router-link to="/projects">Salida</router-link></p> 
        
      </div>
    </div>
  </form>
</template>

<script>
  export default {
    props: ['model', 'isEditing'],
    data () {
      return {        
        switch1: false                        
      }
    },  
    methods: {
      saveProduct () {
        this.$emit('save-product', this.model)
      },
      cancelEdit () {
        this.$emit('cancel-edit')
      }
    }
  }
</script>