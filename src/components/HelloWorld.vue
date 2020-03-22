<template>
  <div class="hello">
   {{allFoodTrucks}}
 
   <LMap
      v-if="showMap"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: 500px"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <LTileLayer
        :url="url"
        :attribution="attribution"
      />
      <template v-for="loc in locationList">
      <LMarker :lat-lng="loc" :icon="icon">
        <LPopup>
          <div @click="innerClick">
            I am a popup
            <p v-show="showParagraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi.
              Donec finibus semper metus id malesuada.
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
      zoom: 10,
      center: latLng(47.41322, -1.219482),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      locationList:[
        latLng(47.34905859411952,-1.0656738281250002),
         latLng(47.41322, -1.219482),
         latLng(47.135556272359196,-1.0972595214843752),
         latLng(47.5079250985124,-1.481781005859375),
         latLng(47.50050343862717,-1.5998840332031252)
      ],
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
       return "Empty array";
      }
    }
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
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
