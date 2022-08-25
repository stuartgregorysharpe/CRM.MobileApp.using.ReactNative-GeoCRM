import { View ,StyleSheet , TouchableOpacity } from 'react-native'
import React , { useState, useEffect } from 'react'
import { whiteLabel } from '../../../../constants/Colors'
import { style } from '../../../../constants/Styles'
import SvgIcon from '../../../../components/SvgIcon'
import { AppText } from '../../../../components/common/AppText'
import { getLocalData, storeLocalValue } from '../../../../constants/Storage'
import { CHECKIN } from '../../../../actions/actionTypes'
import {useSelector, useDispatch} from 'react-redux';
import { getPostParameter } from '../../../../constants/Helper'
import { postApiRequest } from '../../../../actions/api.action'
import { getDateTime } from '../../../../helpers/formatHelpers'


export default function CheckOut({ currentCall , checkinStatus }) {

  const dispatch = useDispatch();
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const [locationId, setLocationId] = useState(0);
  
  useEffect(() => {
    initData();
  }, []);

  const initData = async() => {    
    var specificLocationId = await getLocalData("@specific_location_id");
    setLocationId(specificLocationId);
  }

  const _callCheckOut = () => {
    var userParam = getPostParameter(currentLocation);
    var currentTime = getDateTime();
    
    let postData = {
      location_id: checkinStatus,
      checkout_time: currentTime,
      user_local_data: userParam.user_local_data,
    };
    
    postApiRequest('location-info/check-out', postData)
      .then( async(res) => {        
        await storeLocalValue('@checkin', '0');
        dispatch({ type: CHECKIN, payload: false });              
      })
      .catch(e => {
        console.log('che e', e);
      });
  };

  return (
    <View style={{backgroundColor:whiteLabel().actionFullButtonBackground, borderRadius:7}}>

      <View style={{
        justifyContent:'space-between' , 
        flexDirection:'row', alignItems:'center', paddingHorizontal:10, marginTop:5}}>
        <View style={{flexDirection:'row' , alignItems:'center' , }}>
          <SvgIcon icon="Profile_Done" width='15' height='15' style={{marginRight:5}} />    
          <AppText title="Current Call" color="white"></AppText>
        </View>
        <View style={{flexDirection:'row' , alignItems:'center' , }}>
          <SvgIcon icon="Hour_Glass" width='15' height='15' style={{marginRight:5}} />   
          <AppText title={currentCall != "" ? currentCall.checkin_time : "1h 23min 23sec"}  color="white"></AppText>          
          <SvgIcon icon="Bottom_Arrow" width='20px' height='20px' />
        </View>
      </View>
      
      <View style={[style.scrollTabCard, {marginTop:5, marginBottom:10, marginLeft:10, marginRight:10, paddingTop:0 , paddingBottom:0, alignItems:'center'}]}>      
        <View style={{ marginLeft:10 , height:'100%', paddingTop:12, marginRight:5}}> 
            <SvgIcon icon="Location_Arrow" width='15px' height='15px' />
        </View>
        <View style={{flex:1, marginTop:10 , marginBottom:10 , paddingTop:7, paddingBottom:7}}>
          <AppText title={currentCall != "" ? currentCall.location_name : 'Spar Century City Cape town df'}           
            size="medium" type="secondaryBold" color={whiteLabel().mainText} ></AppText>
                    
        </View>
        <TouchableOpacity onPress={() => { _callCheckOut() }}>
          <View style={styles.checkoutStyle}>         
            <AppText title="Check Out" size="medium" type="primaryMedium" color={whiteLabel().actionFullButtonText} ></AppText>
          </View> 
        </TouchableOpacity>
        

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  checkoutStyle : { 
    backgroundColor:whiteLabel().actionFullButtonBackground, 
    flexDirection:'row', 
    marginRight:10, 
    alignItems:'center', 
    paddingTop:10, 
    paddingBottom:10,
    paddingLeft:25,
    paddingRight:25,
    borderRadius:20
  }

});