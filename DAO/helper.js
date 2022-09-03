import NetInfo from "@react-native-community/netinfo";
import { getLocalData } from "../constants/Storage";

export function checkConnectivity(){

    return new Promise( async function(resolve, reject) {
   
        var isOnline = await getLocalData("@online");        
        console.log("isOnline",isOnline)
        if(isOnline === "0"){
            resolve(false);
        }else{
            NetInfo.addEventListener(networkState => {
                try{                    
                    var isConnected = networkState.isConnected;
                    resolve(isConnected);
                }catch(e){
                    reject(e);
                }            
            });
        }   
        
    });              
}


export function getFullAddress (element){

    var address = element.street_address;
    if(element.suburb != '' && element.suburb != undefined){
        address = address + ", " + element.suburb;
    }
    if(element.city != '' && element.city != undefined){
        address = address + ", " + element.city;
    }
    if(element.state != '' && element.state != undefined){
        address = address + ", " + element.state;
    }
    if(element.country != '' && element.country != undefined){
        address = address + ", " + element.country;
    }
    if(element.pincode != '' && element.pincode != undefined){
        address = address + ", " + element.pincode;
    }

    return address;
}
  