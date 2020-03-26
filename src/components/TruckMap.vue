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
      <template v-if="index<100">
        <LMarker :zIndexOffset="markerZindex" v-if="farFoodTruck(center.lat,center.lng,loc.latitude,loc.longitude)" :lat-lng="setLatLng(loc.latitude,loc.longitude)"  :icon="icon">
          <LPopup>
            <div @click="innerClick">
              <h5 v-html="loc.name"></h5>
              
              <p v-html="loc.foodItems">          
              </p>
              <p v-html="loc.address">
                </p>
                <p>
              Farest : {{distance(center.lat,center.lng,loc.latitude,loc.longitude)}}
              </p>
                <p>
                  <b-button>Order Food Item</b-button>
                  </p>
            </div>
          </LPopup>
        </LMarker>
        <LMarker :zIndexOffset="markerZindex" v-else :lat-lng="setLatLng(loc.latitude,loc.longitude)" :options="farOption" :icon="iconNext" >
          <LPopup>
            <div @click="innerClick">
              <h5 v-html="loc.name"></h5>
              <p>
              Farest : {{distance(center.lat,center.lng,loc.latitude,loc.longitude)}}
              </p>
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
       </template>

      <LMarker :lat-lng="center" :zIndexOffset="meZindex" :icon="me" :draggable="meDragabble" @update:latLng="myLat" />
     
     <LCircle
      :lat-lng="center"
      :radius="circle.radius"
      :color="circle.color"
      :fill="circle.fill"
      :opacity="circle.opacity"
      :className="circle.className"
    />
    
     

      <LControl position="bottomleft" >
        <b-alert  show dismissible><strong>Nearest Food Truck around 1Km is bounded in red </strong></b-alert>
      </LControl>
   
    </LMap> 
   
  </div>
</template>

<script>

import { latLng } from "leaflet";
import { LMap, LMarker,LTileLayer, LPopup, LTooltip, LIcon, LControl,LCircle } from "vue2-leaflet";
import Vue2LeafletLocatecontrol from 'vue2-leaflet-locatecontrol'
import 'leaflet/dist/leaflet.css';

export default {
  name: "TrukMap",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip,
    LIcon,
    Vue2LeafletLocatecontrol,
    LControl,
    LCircle
  },
  data() {
    return {
      meDragabble : true,
      markerZindex:800,
      meZindex:1000,
      circle:{
        radius:1000,
        color:'red',
        fill:false,
        fillOpacity:0,
        opacity:1,
        className:'circle'
        },
        places:[],
        zoom: 14.5,
        center: latLng(37.7806943774082,-122.409668813219),
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        selected:null,
        withPopup: latLng(47.41322, -1.219482),
        withTooltip: latLng(47.41422, -1.350482),
        currentZoom: 11.5,
        currentCenter: null,
        showParagraph: false,
        mapOptions: {
          zoomSnap: 0.5
        },
        farOption :{
            opacity:1
        },
        showMap: true,
        icon: L.icon({
          iconUrl: 'serving-dish.png',
          iconSize: [32, 32],
          iconAnchor: [16, 37]
        }),
        iconNext: L.icon({
          iconUrl: 'serving-dish-bw.png',
          iconSize: [32, 32],
          iconAnchor: [16, 37]
        }),
        me: L.icon({
          iconUrl: 'location.png',
          iconSize: [32, 32],
          iconAnchor: [16, 37]
        }),
        initialLocation: [59.93428, 30.335098]

    };
  },
  created(){
    
    
  },
  computed:{
    allFoodTrucks:{
      get(){
        try{
          return this.$store.getters.getAllFoodTrucks;
        }catch(error){
          console.log("Error on allFoodTruks/computed :");
        }        
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
    myLat(point){
      console.log(point)
      this.center=point;
    },
    setLatLng(lat,lng){
      return latLng(parseFloat(lat),parseFloat(lng));
    },
    distance(lat1, lon1, lat2, lon2) {
      if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
      }
      else {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
          dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
       
        dist= dist * 1.609344*1000
        return dist.toFixed(2);
      }
    },
    farFoodTruck(lat1, lon1, lat2, lon2){
      if(this.distance(lat1, lon1, lat2, lon2)<1000){
        return true;
      }else{
        return false;
      }
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
      //alert("Click!");
    },
    getAllShops(){
      console.log("get All Shops");
      this.$store.dispatch('getAllShops');
    }
  },
  mounted(){
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
