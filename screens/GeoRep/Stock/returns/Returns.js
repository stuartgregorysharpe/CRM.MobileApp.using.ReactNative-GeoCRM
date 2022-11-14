import { View , StyleSheet , FlatList } from 'react-native'
import React , {useEffect , useState , useRef } from 'react'
import ReturnListItem from './components/ReturnListItem';
import ReturnListHeader from './components/ReturnListHeader';
import { SubmitButton } from '../../../../components/shared/SubmitButton';
import SearchLocationModal from '../stock/modal/SearchLocationModal';
import { Constants, Strings } from '../../../../constants';
import { useSelector } from 'react-redux';
import ReturnDeviceDetailModal from './modal/ReturnDeviceDetailModal';
import StockSignatureModal from '../stock/modal/device/StockSignatureModal';
import { getLocalData } from '../../../../constants/Storage';
import { GetRequestReturnListsDAO } from '../../../../DAO';
import { expireToken, showOfflineDialog } from '../../../../constants/Helper';
import { useDispatch } from 'react-redux';
import { checkConnectivity } from '../../../../DAO/helper';

export default function Returns() {

  const [returnLists, setReturnLists] = useState([]);
  const searchLocationModalRef = useRef(null)
  const returnDeviceDetailRef = useRef(null)
  const stockSignatureModalRef = useRef(null)
  const isCheckin = useSelector(state => state.location.checkIn);
  const [locationId, setLocationId] = useState(0);
  const [stockItem , setStockItem] = useState({stock_type: Constants.stockType.RETURN})
  const [stockItemIds , setStockItemIds] = useState([]);
  const dispatch = useDispatch();

  var checkinLocationId ;

  useEffect(() => {
    var isMount = true;
    GetRequestReturnListsDAO.find({}).then((res) => {
		if(isMount){
			setReturnLists(res.return_items);
			var tmp =[];
			res.return_items.forEach(element => {
				tmp.push(element.stock_item_id);          
			});
			setStockItemIds(tmp);
		}
    }).catch((e) => {
      	expireToken(dispatch , e);
    });
    
    return () => {
      isMount = false;
    }
    
  },[]);

  useEffect(() => {
    if(isCheckin){
      initialize();
    }
  },[isCheckin]);

  const initialize = async() =>{  
    checkinLocationId = await getLocalData("@specific_location_id");    
    setLocationId(checkinLocationId);
  }


  const renderItems = (item, index) => {
    return (
        <ReturnListItem item={item}></ReturnListItem>
    )
  }

  const onReturnStock = () => {
    checkConnectivity().then((isConnected) => {
      if(isConnected){
        if(isCheckin){          
          returnDeviceDetailRef.current.showModal()
        }else{
          searchLocationModalRef.current.showModal();
        }
      }else{
        showOfflineDialog(dispatch)
      }
    })    
  }

  const onStockToWarehouse = () => {
    checkConnectivity().then((isConnected) => {
      if(isConnected){
        stockSignatureModalRef.current.showModal()
      }else{
        showOfflineDialog(dispatch)
      }
    })
    
  }

  const onSearchLocationModalClosed = ({type, value}) => {    
    if(type == Constants.actionType.ACTION_NEXT){
      if(value.stockType === Constants.stockType.RETURN){
          setLocationId(value.locationId);
          returnDeviceDetailRef.current.showModal()
      }
    }
  }

  const onStockSignature = async({type, value}) => {
    if(type == Constants.actionType.ACTION_CLOSE){
      stockSignatureModalRef.current.hideModal()
    }
  };
  
  const onReturnDeviceDetailsModalClosed = async({type, value}) => {
    if(type == Constants.actionType.ACTION_CLOSE){
      returnDeviceDetailRef.current.hideModal()
    }
  };
  
  return (
    <View style={{flexDirection:'column', flex:1}}>
        
        <View style={{flexDirection:'column' , flex:1}}>
            <FlatList                              
                ListHeaderComponent={()=>
                    <ReturnListHeader></ReturnListHeader>
                }
                removeClippedSubviews={false}                
                initialNumToRender={10}                    
                data={returnLists}            
                renderItem={
                    ({ item, index }) => renderItems(item, index)
                }
                keyExtractor={(item, index) => index.toString()}
            />
        </View>

        <View style={{marginHorizontal:10 ,  marginBottom:10}}>
          <SubmitButton title={Strings.Stock.Return_Stock} onSubmit={() => onReturnStock() } ></SubmitButton>
          <SubmitButton style={{marginTop:10}} title={Strings.Stock.Return_All_Stock} onSubmit={() => onStockToWarehouse()} ></SubmitButton>
        </View>

        <ReturnDeviceDetailModal 
          ref={returnDeviceDetailRef}
          title="Return Device Details"
          locationId={locationId}
          onButtonAction={onReturnDeviceDetailsModalClosed}
        />

        <SearchLocationModal
          ref={searchLocationModalRef}
          title={Strings.Search_Location}
          stockType={Constants.stockType.RETURN}
          onButtonAction={onSearchLocationModalClosed}
          />
        
        <StockSignatureModal
            ref={stockSignatureModalRef}
            title={Strings.Stock.Please_Sign}
            locationId={locationId}
            item={stockItem}
            page = {Constants.stockType.RETURN}
            selectedCodes={[]}
            stockItemIds={stockItemIds}
            onButtonAction={onStockSignature}
        />

    </View>
  )
}

const styles = StyleSheet.create({  
  container:{
      flex:1,                                       
      paddingTop:10
  }
  
})