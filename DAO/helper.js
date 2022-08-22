import NetInfo from "@react-native-community/netinfo";
import { getLocalData } from "../constants/Storage";

export function checkConnectivity(){

    return new Promise( async function(resolve, reject) {
   
        var isOnline = await getLocalData("@online");        
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

  