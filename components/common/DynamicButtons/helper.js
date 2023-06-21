import { getDistance } from 'geolib';
import { formattedNumber, formattedPriceWithSpace } from '../../../helpers/formatHelpers';
import { getOfflineSyncItem } from '../../../sqlite/OfflineSyncItemsHelper';

export const getDistanceBwtCurrentAndLocation = ( currentLocation , coordinates , user_settings , features) => {

    return new Promise(function (resolve, reject) {        

        var formattedDistance = '';
        if(features.includes('checkin_ringfence_check')){        
            const distance = getDistance(currentLocation , coordinates , 0.1);
            const unit = user_settings.large_distance_metric;
            var ring_fence_radius = user_settings.ring_fence_radius;
            var ring_fence_radius_in_m = ring_fence_radius;
            if(unit == 'ft'){
              ring_fence_radius_in_m = 3.280839895 * ring_fence_radius;
            }else if(unit == 'km'){ // 1km = 1000m
              ring_fence_radius_in_m = 1000 * ring_fence_radius ;
            }else if(unit == 'mi'){
              ring_fence_radius_in_m = 1609.344 * ring_fence_radius ;
            }                  
            console.log("distance" , distance , ring_fence_radius_in_m)
            if(distance > ring_fence_radius_in_m){
              formattedDistance = distance;
              if(unit == 'ft'){
                formattedDistance = distance / 3.280839895;          
              }else if(unit == 'km'){
                formattedDistance = distance / 1000;
              }else if(unit == 'mi'){
                formattedDistance = distance / 1609.344;
              }              
              resolve({isInRingFence: false, formattedDistance: formattedPriceWithSpace(formattedDistance) + unit });              
            }
        }        
        resolve({isInRingFence: true, formattedDistance: formattedDistance});
    });    
  }

  
  export const haveAddressUpdate = async(locationId) =>{

    var offlineItems = await getOfflineSyncItem('location_address_update');
    var flag = false;
    for(var i = 0; i < offlineItems.length; i++){
      var element = offlineItems.item(i);
      const body =  JSON.parse(element.post_body);
      const location_id = body.location_id;
      if(locationId == location_id){
        console.log("orign", locationId , location_id)
        flag = true;
      } 
    }
    return flag;

  }