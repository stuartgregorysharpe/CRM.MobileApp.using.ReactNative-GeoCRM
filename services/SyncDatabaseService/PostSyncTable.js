import { postApiRequest } from "../../actions/api.action";
import { OfflineBaskets } from "../../sqlite/helper"
import { getOfflineSyncItem } from "../../sqlite/OfflineSyncItemsHelper";
export const syncPostData = (basketName) => {

    return new Promise( async function (resolve, reject) {
        console.log("basketName", basketName);
        const basket = OfflineBaskets.find((element) => element.basketName == basketName);
        console.log("basket", basket);
        if(basket != undefined && basket.itemTypes){
            var res  = await syncBasketItemType( basket.itemTypes, 0 ); 
            resolve(res);
        }        
        resolve({});        
    });    
}

const syncBasketItemType = async(itemTypes, index ) => {

    const itemType = itemTypes[index];
    console.log("itemTypes", itemTypes)
    if(itemType != undefined){
        console.log("Item ", itemType);
        var res = await syncItemLists(itemType);
        if(index < itemTypes.length - 1){
            return await syncBasketItemType(itemTypes, index + 1);
        }else{
            return res;
        }
    }        
}

const syncItemLists = async(itemType) => {
    const items = await getOfflineSyncItem(itemType);
    if(items.length > 0){
        console.log("one api items === ", items);
        var res =  await syncItemTypeApi(items, 0);           
        return res;                             
    }
}


const syncItemTypeApi = async(items, index) =>{

    const item = items.item(index);
    if(item != undefined){
        console.log("url" , item.url);
        console.log("indempotency" , item.indempotency_key);
        var apiRes = await postApiRequest(item.url, JSON.parse(item.post_body) , item.indempotency_key);     
        console.log("api res", apiRes);
        console.log("items.length",items.length);
        if(index < items.length - 1 ){
            var res = await syncItemTypeApi(items, index + 1);
            return res;
        }
        return apiRes;
    }

}