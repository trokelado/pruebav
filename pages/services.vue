<template>
  <section class="">
    <v-expansion-panel expand popout>
      <v-expansion-panel-content v-for="(item,i) in items" :key="i">
        <div slot="header"><h5>{{item.pro}}</h5></div>
        <v-card>
          <v-layout row>          
            <v-card-text>{{item.texto}}</v-card-text>
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
      <v-layout row wrap>
        <v-flex xs12 md6>
          <h5>Services</h5>
          <ul>
            <li>
                Analysis, design and development of customized information systems.
            </li>
            <li>
                Implementation of Web and GIS technology solutions.        
            </li>                       
            <li>
                Consulting and training.
            </li>
            <li>
                Establishment and monitoring of indicators for verification programs.        
            </li> 
            <li>
                Support.
            </li>
            <li>
                Recruitment and staff selection. 
            </li>
            <li>
                Implementation and monitoring of environmental verification programs.        
            </li>
            <li>
                Geophysical records, data interpretation. 
            </li>
          </ul>
        </v-flex>
        <v-flex xs12 md6>
          <h5>Servicios</h5>
          <ul>
            <li>
                Análisis, diseño y desarrollo de sistemas de información a la medida.
            </li>            
            <li>
                Implantación de soluciones Web y Geográficas.        
            </li>                       
            <li>
                Consultoría y entrenamiento GIS, etc. 
            </li>
             <li>
                Establecimiento y seguimiento de programas de verificación de indicadores.        
            </li>
            <li>
                Soporte. 
            </li>
            <li>
                Reclutamiento y selección de personal. 
            </li>
            <li>
                Implementación y seguimiento de programas de verificación ambiental.        
            </li>
            <li>
                Registros geofísicos, interpretación de datos. 
            </li>
          </ul>
        </v-flex>
      </v-layout>
    </v-expansion-panel>
  </section>  
</template>

<script>            

  export default {
    data () {
      return {                                       
        items: [
          {
            pro: 'Excellence', imagen: '/img/frames/excellence.jpg', texto: 'We are convinced that organization excellence level is only achieved through agile processes and efficient systems, in the context of permanent staff training and working as a project team correctly designed and supervised under a meticulous planning and concerted evaluation scheme.'
          },
          {
            pro: 'Excelencia', imagen: '/img/frames/excelencia.jpg', texto: 'Estamos convencidos que el nivel de excelencia en una organización solo se logra a través de procesos y sistemas agiles y eficientes, en el contexto de la capacitación permanente del personal y sobretodo trabajando como equipo sobre proyectos correctamente diseñados y supervisados bajo un esquema de planeación meticulosa y evaluación concertada.'
          },
          {
            pro: '+ Our Energy', imagen: '/img/frames/helper.jpg', texto: 'Our interdisciplinary team focus in adding value to your services and help you achieve excellence with our solutions and services portfolio.'
          },
          {
            pro: '+ Nuestra Energía', imagen: '/img/frames/alianza.jpg', texto: 'Nuestro equipo interdisciplinario se enfoca en agregar valor a sus servicios y ayudarlo a alcanzar la excelencia con nuestro portafolio de servicios y soluciones.'
          }
        ]
      }
    }    
  }
</script>