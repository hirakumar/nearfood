<template>
  <div id="app">
    <!--<div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/map">Map</router-link>
    </div>-->
    <router-view/>
  </div>
</template>

<style lang="scss">
.vue2leaflet-map{
  height: 100% !important;

position: absolute;

left: 0px;

top: 0px;
}
</style>
