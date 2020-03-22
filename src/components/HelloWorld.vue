<template>
  <div class="hello">
   

   <LMap
      v-if="showMap"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: 800px"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <LTileLayer
        :url="url"
        :attribution="attribution"
      />
      <template v-for="(loc,index) in allFoodTrucks">
      <LMarker :lat-lng="setLatLng(loc.latitude,loc.longitude)" :icon="icon" v-if="index<100">
        <LPopup>
          <div @click="innerClick">
            <h5 v-html="loc.name"></h5>
            
            <p v-html="loc.foodItems">          
            </p>
            <p v-html="loc.address">
              </p>
              <p>
                <b-button>Order Food Item</b-button>
                </p>
          </div>
        </LPopup>
      </LMarker>
      </template>

      <LControl position="topright" >
<b-form-input placeholder="Search Food Truck"></b-form-input>
</LControl>
      <!--
      <LMarker :lat-lng="withTooltip" :icon="icon">
        <LTooltip :options="{ permanent: true, interactive: true }">
          <div @click="innerClick">
            I am a tooltip
            <p v-show="showParagraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi.
              Donec finibus semper metus id malesuada.
            </p>
          </div>
        </LTooltip>
      </LMarker>
      -->
    </LMap> 
  </div>
</template>

<script>

import { latLng } from "leaflet";
import { LMap, LMarker,LTileLayer, LPopup, LTooltip, LIcon, LControl } from "vue2-leaflet";
import Vue2LeafletLocatecontrol from 'vue2-leaflet-locatecontrol'
import 'leaflet/dist/leaflet.css';

export default {
  name: "HelloWorld",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip,
    LIcon,
    Vue2LeafletLocatecontrol,
    LControl
  },
  data() {
    return {
      zoom: 14,
      center: latLng(37.7806943774082,-122.409668813219),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
     
      withPopup: latLng(47.41322, -1.219482),
      withTooltip: latLng(47.41422, -1.350482),
      currentZoom: 11.5,
      currentCenter: latLng(47.41322, -1.219482),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true,
      icon: L.icon({
        iconUrl: 'serving-dish.png',
        iconSize: [32, 32],
        iconAnchor: [16, 37]
      }),
       initialLocation: [59.93428, 30.335098]

    };
  },
  computed:{
    allFoodTrucks:{
      get(){
       // console.log("Called from getters",store.getters['getAllFoodShop']);
       // console.log(state)
      
      return this.$store.getters.getAllFoodTrucks;
 
      },
      set(val){
        return val;
      }
    }
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    setLatLng(lat,lng){
      return latLng(parseFloat(lat),parseFloat(lng));
    },
    getImg(img){
      return '../assets/'+img;
    },
    centerUpdate(center) {
      console.log("Center Update is calleed")
      this.currentCenter = center;
      console.log(this.currentCenter.lat + ":" + this.currentCenter.lng);
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },
    innerClick() {
      alert("Click!");
    },
    getAllShops(){
      console.log("get All Shops");
      this.$store.dispatch('getAllShops');
    }
  },
  mounted(){
    //console.log(L.control.locate().addTo(map));
    this.getAllShops();
    console.log(latLng(47.50050343862717,-1.5998840332031252));
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
