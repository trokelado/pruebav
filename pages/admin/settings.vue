<template>
  <section>
    <div>
      <h1 class="title">Settings Here</h1>
      <p>Some content will go here about this project.</p>
      <nuxt-link to="/admin">< Admin Dashboard</nuxt-link>      
    </div>
  </section>
</template>

<script>
//import async from 'async'
import map from 'async/map'
export default {
    data () {
      return {
        MAP_DATA_1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        numbers: [4, 9, 16, 30],
        sol: [],
        salida: []
      }
    },
    created () {
      //var async = require('async')
      let vm = this      
      vm.sol = vm.numbers.map(Math.sqrt)
      console.log('sol : ' + vm.sol)
      // when to we start
      let startTime = new Date().getTime()
      console.log('Inicio : ' + startTime)
      console.log('data inicial : ' + vm.MAP_DATA_1)      
      // run with our demo inputs      
      map(vm.MAP_DATA_1, (item, cb) => {

      // wait a bit since we are doing async
      setTimeout(() => {
        // how long has it been since we started running
        const secondsElapsed = (new Date().getTime() - startTime) /
        1000;
        console.log('MAP 1 ITERATEE: ' + secondsElapsed);
        // callback with result
        cb(null, item * 2)
        // wait between 1 and 2 seconds
      }, 1000 + 1000 * Math.random())
      }, (err, results) => {
        // done either with error or no error
        if (err) {
          console.log('MAP 1 ERROR: ')
          console.log(err);
          console.log('=============')
        } else {
          console.log('MAP 1 RESULTS: ' + ((new Date().getTime() - startTime) / 1000) + ' seconds')
          console.log(results)
          console.log('===============')
        }
      })  
    }, // fin del created  

}
</script>
