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

export default function Returns() {

  const [returnLists, setReturnLists] = useState([]);
  const searchLocationModalRef = useRef(null)
  const returnDeviceDetailRef = useRef(null)
  const isCheckin = useSelector(state => state.location.checkIn);
  const [locationId, setLocationId] = useState(0);

  useEffect(() =>{    
    getApiRequest("stockmodule/returns-list", {}).then((res) => {      
        setReturnLists(res.return_items)
    }).catch((e) => {
        console.log("E",e);
    });
},[]);

  
  const renderItems = (item, index) => {
    return (
        <ReturnListItem item={item}></ReturnListItem>
    )
  }

  const onReturnStock = () => {
    if(isCheckin){

    }else{
      searchLocationModalRef.current.showModal();
    }
  }
  const onSearchLocationModalClosed = ({type, value}) => {    
    if(type == Constants.actionType.ACTION_NEXT){
      if(value.stockType === Constants.stockType.RETURN){
          setLocationId(value.locationId);
          returnDeviceDetailRef.current.showModal()
      }
    }
  }

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
          <SubmitButton style={{marginTop:10}} title="Return All Stock To Warehouse"></SubmitButton>
        </View>

        <ReturnDeviceDetailModal 
          ref={returnDeviceDetailRef}
          title="Return Device Details"
          locationId={locationId}
        />

        <SearchLocationModal
          ref={searchLocationModalRef}
          title="Search Location"
          stockType={Constants.stockType.RETURN}
          onButtonAction={onSearchLocationModalClosed}
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