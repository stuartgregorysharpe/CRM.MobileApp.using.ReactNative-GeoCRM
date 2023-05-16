import { getOfflineSyncItem } from "../../../sqlite/OfflineSyncItemsHelper"

export const haveLocationFieldPost = async (locationId) => {

    const offlineSyncItems = await getOfflineSyncItem('location_info_update');
    console.log("offlineSyncItems res" ,offlineSyncItems)
    var flag = false;
    for(var i = 0; i < offlineSyncItems.length; i++){
        const item = offlineSyncItems.item(i);
        
        const postBody =  JSON.parse(item.post_body);
        console.log("ddd", postBody.location_id)
        if(parseInt(postBody.location_id) == parseInt(locationId)){
            flag = true;
        }
    }

    return flag;
}