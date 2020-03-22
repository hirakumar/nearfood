<template>
  <div class="home">
 
    <TruckMap msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import TruckMap from '@/components/TruckMap.vue'

export default {
  name: 'Map',
  components: {
    TruckMap
  }
}
</script>
