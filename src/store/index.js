import Vue from 'vue'
import Vuex from 'vuex'
import {API} from '../api/API.js'
import axios from 'axios'
import { latLng } from "leaflet";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    foodTrucks:[]
  },
  mutations: {
    setAllFoodShop : function({commit, state,context},data){
      console.log("Mutation setallfood:", data);
      this.state.foodTrucks=data;
     

    }
  },
  getters:{
    getAllFoodTrucks: function(state){
      return state.foodTrucks;
    }
  },
  actions: {
    getAllShops:  function(context){
      console.log("Action : Get All Shops");
      
     return new Promise((resolve, reject) => {
     
   
       API.getAllFoodShopData().then((response)=>{
        console.log("resolve");
       
        var foodTrucks = response.data.filter(item => item.facilitytype === "Truck").map((item)=>{
          return {
            id: item.objectid,
            name : item.applicant,
            address : item.address,
            foodItems : item.fooditems,
            latitude : item.latitude,
            longitude: item.longitude,
          
            

          }
        })
        
      
        context.commit('setAllFoodShop',foodTrucks);
        resolve(foodTrucks);
        
        
       // resolve();
      }).catch((error)=>{
        console.log("Got something error");
        console.log(error)
      })
    })
     
      
    }
  },
  modules: {
  }
})
