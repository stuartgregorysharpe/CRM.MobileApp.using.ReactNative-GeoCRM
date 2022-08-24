import { checkConnectivity } from "./helper";

export function find(){
  
  return new Promise(function(resolve, reject) {
    
    LocationService.getLocationService().then(locationService => {      
        locationService.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;

            checkConnectivity().then((isConnected) => {
                if(isConnected){
                    
                }
            });

          },
          error => {
                                    
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 2000,
            distanceFilter: 2,
          },
        );
    });

  });  
}
export default {
  find,
};
