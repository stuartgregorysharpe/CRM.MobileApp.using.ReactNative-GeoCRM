import { postApiRequest, postApiRequestMultipart } from "../../actions/api.action";
import { Strings } from "../../constants";
import { jsonToFormData } from "../../helpers/jsonHelper";
import { OfflineBaskets } from "../../sqlite/helper"
import { deleteOfflineSyncItem, getOfflineSyncItem, getOfflineSyncItems, getOfflineSyncItemsInBasket } from "../../sqlite/OfflineSyncItemsHelper";

export const syncPostData = (basketName, callBack) => {

    return new Promise( async function (resolve, reject) {
        console.log("basketName", basketName);
        const basket = OfflineBaskets.find((element) => element.basketName == basketName);        
        if(basket != undefined && basket.itemTypes){            
            var offlineItems = await getOfflineSyncItems(basket.itemTypes);       
            const totalValue = offlineItems.length;
            callBack(0, totalValue , '');
            var res  = await syncBasketItemType( basket, 0 , callBack , totalValue); 
            resolve(res);
        }
        resolve({});        
    });
}

const syncBasketItemType = async(bascket, index , callBack , totalValue) => {

    var res = await syncItemLists(bascket , callBack ,totalValue);
    return res;
    // const itemType = itemTypes[index];
    
    // if(itemType != undefined){
    //     console.log("Item ", itemType);
    //     var res = await syncItemLists(itemType , callBack ,totalValue);
    //     if(index < itemTypes.length - 1){
    //         return await syncBasketItemType(itemTypes, index + 1 , callBack  , totalValue);            
    //     }else{
    //         return res;
    //     }
    // }        
}

const syncItemLists = async(backet , callBack , totalValue) => {
    
    const items = await getOfflineSyncItems(backet.itemTypes);
    console.log("items",items);
    //const items = await getOfflineSyncItem(itemType);
    if(items.length > 0){        
        var res =  await syncItemTypeApi(items, 0 , callBack , totalValue);           
        return res;
    }
}

const syncItemTypeApi = async(items, index , callBack , totalValue) =>{

    const item = items.item(index);
    if(item != undefined){        
        callBack(index + 1, totalValue , "");

        try{

            var apiRes = {};
            if(
                item.item_type == "form_submission" || 
                item.item_type == "leadfields" || 
                item.item_type == "sell_to_trader" ||
                item.item_type == "transaction-submit"
            ){  
                console.log("item.post_body" ,item.post_body)
                var body = jsonToFormData(JSON.parse(item.post_body));
                body.append("mode", "offline");
                apiRes = await postApiRequestMultipart(item.url, body , item.indempotency_key );
            }else{
                apiRes = await postApiRequest(item.url, { ...JSON.parse(item.post_body), mode: 'offline'} , item.indempotency_key);
            }

            console.log("Response : " , apiRes);
            if(apiRes.status == Strings.Success){  
                await deleteOfflineSyncItem(item.id);
            }else if(apiRes.status != Strings.Success) { 
                await deleteOfflineSyncItem(item.id);
                callBack(-1, -1 , apiRes);
                return apiRes;
            }
            
        }catch(e){
            console.log("sync 400 error");
            callBack(-2 , -2 , {errors: 'Some items could not be synced, please contact support'});
        }

        if(index < items.length - 1 ){
            var res = await syncItemTypeApi(items, index + 1 , callBack , totalValue);
            return res;
        }
        return apiRes;
    }

}