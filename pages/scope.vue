<template>
  <div id="app">
    <v-app id="inspire">      
        <div v-if="!$store.state.user">
          <login-form></login-form>
          <!-- <v-btn outline large flat nuxt @click="$router.push('/login')" primary>Sign In</v-btn> -->
        </div>
        <div v-else>
          <v-carousel delimiter-icon="stop" prev-icon="mdi-arrow-left" next-icon="mdi-arrow-right">
            <v-carousel-item v-for="(item,i) in items" :src="item.src" :key="i">            
              <!--<h2 class="header white--text">{{item.pro}}</h2> -->              
              <v-jumbotron dark>
                <v-container fill-height>
                  <v-layout align-center>
                    <v-flex>
                      <h2 class="header white--text">{{ item.pro }}</h2>
                      <span class="subheading white--text">{{ item.texto }}</span>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-jumbotron>              
            </v-carousel-item>
          </v-carousel>                                            
        </div>          
    </v-app>
  </div>  
</template>

<script>  

  export default {
    data () {
      return {                                       
        items: [
          {
            src: '/img/frames/tierra74.jpg', pro: 'Energy', texto: 'Distribution'
          },
          {
            src: '/img/frames/eolico.jpg', pro: 'Energy', texto: 'Wind Power'
          },
          {
            src: '/img/frames/solar.jpg', pro: 'Energy', texto: 'Solar Power'
          },
          {
            src: '/img/frames/pipe.jpg', pro: 'Pipelines', texto: 'Natural Gas'
          },
          {
            src: '/img/frames/semi2.jpg', pro: 'Offshore', texto: 'Rig Production'
          },
          {
            src: '/img/frames/manifold.jpg', pro: 'Onshore', texto: 'Oil Production'
          },          
          {
            src: '/img/frames/cities03.jpg', pro: 'Smart City', texto: 'Traffic Management'
          },          
          {
            src: 'https://vuetifyjs.com/static/doc-images/carousel/squirrel.jpg', pro: 'Biological', texto: 'Mamals Distribution'
          },
          {
            src: '/img/frames/whale.jpg', pro: 'Oceanographic', texto: 'Whale Migrations'
          },
          {
            src: '/img/frames/maya5.jpg', pro: 'Tourism', texto: 'Mayan Culture'
          }
        ]
      }
    }    
  }
</script>