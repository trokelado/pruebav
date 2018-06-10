<template>
  <section class="">
    <v-expansion-panel expand popout>
      <v-expansion-panel-content v-for="(item,i) in items" :key="i">
        <div slot="header"><h5>{{item.pro}}</h5></div>
        <v-card>
          <v-layout row>          
            <v-card-text>{{item.texto}}</v-card-text>                        
          </v-layout>
          <v-layout row>                      
            <v-card-text>{{item.textob}}</v-card-text>
            <v-flex xs5>
              <v-card-media
                :src='item.imagen'                
                height="125px"
                contain
              ></v-card-media>
            </v-flex>            
          </v-layout>
        </v-card>

      </v-expansion-panel-content>      
    </v-expansion-panel>
  </section>  
</template>

<script>            

  export default {
    data () {
      return {                                       
        items: [
          {
            pro: 'Our team', imagen: '/img/frames/office01.jpg', 
            texto: 'We are a multidisciplinary team of Mexican consultants committed to technological innovation at the service of the community.',
            textob: 'With more than 25 years developing computer solutions that allow our customers to be more competitive and efficient, increasing their levels of control through meticulous planning and a concerted assessment scheme that allows to reduce response times and the cost of operations, increasing performance, profit margin and business positioning.'
          },
          {
            pro: 'Nosotros', imagen: '/img/frames/office02.jpg', 
            texto: 'Somos un equipo multidisciplinario de consultores Mexicanos comprometidos con la innovación tecnológica al servicio de la comunidad.',
            textob: 'Contamos con más de 25 años desarrollando soluciones informáticas que permiten a nuestros clientes ser más competitivos y eficientes, aumentando sus niveles de control mediante una planeación meticulosa y un esquema de evaluaciones concertadas que permiten reducir los tiempos de respuesta y el costo de las operaciones, aumentando el rendimiento, la utilidad y el posicionamiento empresarial.'
          }          
        ]
      }
    }    
  }
</script>
