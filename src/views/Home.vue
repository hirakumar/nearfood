<template>
  <div class="home">
  <h1><strong>NEAR FOODTRUCK</strong></h1>
   <p> <img alt="Vue logo" src="../assets/truck.jpg"> </p>
   <router-link to="/map"> <b-button variant="success"  pill size="lg">Check Food Truck in San-Fransisco</b-button></router-link>
  </div>
</template>
<style>
h1{
  font-size:35px;
  font-weight:bold;
}
.home{
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-item:'center';
  height: 100%;

position: absolute;

text-align: center;

width: 100%;
}
</style>
<script>


export default {
  name: 'Home',
  components: {
    
  },
  
}
</script>
