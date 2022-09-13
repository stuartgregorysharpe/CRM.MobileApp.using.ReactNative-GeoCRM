import { postApiRequest } from "../../actions/api.action";
import { OfflineBaskets } from "../../sqlite/helper"
import { deleteOfflineSyncItem, getOfflineSyncItem, getOfflineSyncItems } from "../../sqlite/OfflineSyncItemsHelper";

export const syncPostData = (basketName, callBack) => {

    return new Promise( async function (resolve, reject) {
        console.log("basketName", basketName);
        const basket = OfflineBaskets.find((element) => element.basketName == basketName);        
        if(basket != undefined && basket.itemTypes){            
            var offlineItems = await getOfflineSyncItems(basket.itemTypes);       
            const totalValue = offlineItems.length;
            callBack(0, totalValue);
            var res  = await syncBasketItemType( basket.itemTypes, 0 , callBack , totalValue); 
            resolve(res);
        }        
        resolve({});        
    });    
}

const syncBasketItemType = async(itemTypes, index , callBack , totalValue) => {

    const itemType = itemTypes[index];
    console.log("itemTypes", itemTypes)
    if(itemType != undefined){
        console.log("Item ", itemType);
        var res = await syncItemLists(itemType , callBack ,totalValue);
        if(index < itemTypes.length - 1){
            return await syncBasketItemType(itemTypes, index + 1 , callBack  , totalValue);            
        }else{
            return res;
        }
    }        
}


const syncItemLists = async(itemType , callBack , totalValue) => {
    const items = await getOfflineSyncItem(itemType);
    if(items.length > 0){        
        var res =  await syncItemTypeApi(items, 0 , callBack , totalValue);           
        return res;                             
    }
}

const syncItemTypeApi = async(items, index , callBack , totalValue) =>{

    const item = items.item(index);
    if(item != undefined){        
        callBack(index + 1, totalValue);        
        var apiRes = await postApiRequest(item.url, JSON.parse(item.post_body) , item.indempotency_key);
        if(apiRes.status == 'success'){            
            await deleteOfflineSyncItem(item.id)
        }
        if(index < items.length - 1 ){
            var res = await syncItemTypeApi(items, index + 1 , callBack , totalValue);
            return res;
        }
        return apiRes;
    }

}