import { View , StyleSheet , FlatList } from 'react-native'
import React , {useEffect , useState , useRef } from 'react'
import { getApiRequest } from '../../../../actions/api.action';
import ReturnListItem from './components/ReturnListItem';
import ReturnListHeader from './components/ReturnListHeader';
import { SubmitButton } from '../../../../components/shared/SubmitButton';
import SearchLocationModal from '../stock/modal/SearchLocationModal';
import { Constants } from '../../../../constants';
import { useSelector } from 'react-redux';
import ReturnDeviceDetailModal from './modal/ReturnDeviceDetailModal';
import StockSignatureModal from '../stock/modal/device/StockSignatureModal';
import { getLocalData } from '../../../../constants/Storage';

export default function Returns() {

  const [returnLists, setReturnLists] = useState([]);
  const searchLocationModalRef = useRef(null)
  const returnDeviceDetailRef = useRef(null)
  const stockSignatureModalRef = useRef(null)
  const isCheckin = useSelector(state => state.location.checkIn);
  const [locationId, setLocationId] = useState(0);
  const [stockItem , setStockItem] = useState({stock_type: Constants.stockType.RETURN})
  const [stockItemIds , setStockItemIds] = useState([]);
  var checkinLocationId ;
  useEffect(() =>{    
    var isMount = true;
    getApiRequest("stockmodule/returns-list", {}).then((res) => {      
        if(isMount){
          setReturnLists(res.return_items)
          var tmp =[];
          res.return_items.forEach(element => {
              tmp.push(element.stock_item_id);          
          });
          setStockItemIds(tmp)
        }        
    }).catch((e) => {
        console.log("E",e);
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
    if(isCheckin){          
      returnDeviceDetailRef.current.showModal()
    }else{
      searchLocationModalRef.current.showModal();
    }
  }
  const onStockToWarehouse = () => {
    stockSignatureModalRef.current.showModal()
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
          <SubmitButton title="Return Stock" onSubmit={() => onReturnStock() } ></SubmitButton>
          <SubmitButton style={{marginTop:10}} title="Return All Stock To Warehouse" onSubmit={() => onStockToWarehouse()} ></SubmitButton>
        </View>

        <ReturnDeviceDetailModal 
          ref={returnDeviceDetailRef}
          title="Return Device Details"
          locationId={locationId}
          onButtonAction={onReturnDeviceDetailsModalClosed}
        />

        <SearchLocationModal
          ref={searchLocationModalRef}
          title="Search Location"
          stockType={Constants.stockType.RETURN}
          onButtonAction={onSearchLocationModalClosed}
          />
        
        <StockSignatureModal
            ref={stockSignatureModalRef}
            title="Please Sign below:"
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