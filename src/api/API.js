import axios from 'axios';

export const API = {
    getAllFoodShopData : async function(){
        //console.log("Axios is tegring");
       
        
        return await axios.get('https://data.sfgov.org/resource/rqzj-sfat.json')
        .then((response) => response)
        .catch( error => error)
       

    }
}