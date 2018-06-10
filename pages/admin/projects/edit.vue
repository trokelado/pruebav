<!-- ./src/pages/admin/Edit.vue -->
<template>    
  <product-form :model="model" :isEditing="isEditing" @save-product="saveProduct">
  </product-form>
</template>

<script>
  import ProductFrom from '@/components/productForm.vue'  

  export default {
    props: ['model'],      
    data () {
      return {        
        isEditing: true        
      }
    },
    methods: {
      saveProduct (model) {
        this.$emit('saveProduct', this.model)
      },      
    },
    components: {
      'product-form': ProductFrom
    },    
  }
</script>