import Vue from 'vue'
import Vuex from 'vuex'
import {API} from '../api/API.js'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    foodTrucks:[]
  },
  mutations: {
    setAllFoodShop : function(context,store){
      console.log("Mutation setallfood:");
     // this.state.foodTrucks=data;
      console.log(context)

    }
  },
  getters:{
    getAllFoodShop: function(){
      console.log("Getters :",this.state.foodTrucks);
      //return this.state.foodTrucks
    }
  },
  actions: {
    getAllShops: async function(context,getters,mutation){
      console.log("Action : Get All Shops");
      
      await API.getAllFoodShopData().then((response)=>{
        console.log("resolve");
       
        var foodTrucks = response.data.filter(item => item.facilitytype === "Truck");
        var myfoodTrucks = foodTrucks.map((item)=>{
          return {
            id: item.objectid,
            name : item.applicant,
            address : item.address,
            foodItems : item.fooditems,
            latitude : item.latitude,
            longitude: item.longitude

          }
        })
        console.log("Nedd to stae", myfoodTrucks);
      
        context.commit('setAllFoodShop')
        
        
       // resolve();
      }).catch((error)=>{
        console.log("Got something error");
        console.log(error)
      })
     
      
    }
  },
  modules: {
  }
})
