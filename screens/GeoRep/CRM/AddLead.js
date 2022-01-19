import React, {useState, useEffect, useRef } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { TextInput, Button, Title } from 'react-native-paper';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import uuid from 'react-native-uuid';
import Skeleton from '../../../components/Skeleton';
import Divider from '../../../components/Divider';
import { PRIMARY_COLOR, BG_COLOR } from '../../../constants/Colors';
import { BACK_ICON_STATUS, SLIDE_STATUS } from '../../../actions/actionTypes';
import { getGeocoding, getLeadFields, postLeadFields } from '../../../actions/location.action';
import Fonts from '../../../constants/Fonts';
import CustomPicker from '../../../components/modal/CustomPicker';
import SvgIcon from '../../../components/SvgIcon';
import { notifyMessage } from '../../../constants/Consts';

export default function AddLead({screenProps}) {

  const dispatch = useDispatch();    
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const [isLoading, setIsLoading] = useState(false);
  const dispositionRef = useRef([]);
  const [leadForms, setLeadForms] = useState([]);
  const [customMasterFields, setCustomMasterFields] = useState([]);
  const [dropdownId, setDropdownId] = useState(0);
  const [isDropdownModal, setIsDropdownModal] = useState([]);
  const [dropdownItems, setDropdownItems] = useState([]);
  
  var index = 0;
  const handleSubmit = () => {        
    let params = {
      coordinates:{latitude : currentLocation.latitude, longitude : currentLocation.longitude},
      custom_master_fields:customMasterFields    
    }
    console.log(params);
    postLeadFields(params, uuid.v4())
    .then((res) => {
      console.log("response", res);
      notifyMessage("Success", "");
    })
    .catch((error) =>{      
      console.log('error', error);
      notifyMessage("Fail","");
    })        
  }

  useEffect(() => {    
    setIsLoading(true);
  },[]);
  
  useEffect(() =>{
    if(isLoading){
      getLeadFields()
      .then((res) => {
        initPostData(res);
        setLeadForms(res);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
      })
    }
  }, [isLoading]);

  const initPostData = (res) => {
    var tmp = [];
    res.forEach((element) => {
      tmp.push({'custom_master_field_id':  element.custom_master_field_id, 'value' : '' , 'field_name': element.field_name });
    })
    setCustomMasterFields(tmp);
  }
 
  const reverseGeocoding = () => {
    getGeocoding(currentLocation.latitude, currentLocation.longitude)
    .then((res) => {
      if(res.results != null && res.results.length > 0 && res.results[0].address_components.length > 0){        
        var address_components = res.results[0].address_components;
        console.log("address co m", address_components);
        var tmp = [ ...customMasterFields ];
        tmp.forEach((element) => {
          address_components.forEach((item) =>{
            if(item.types.includes("street_number") && element.field_name == "Street Address" || item.types.includes("route")  && element.field_name == "Street Address" ){
              element.value = element.value + " " + item.long_name;
            }
            if( (item.types.includes("neighborhood") || item.types.includes("sublocality_level_1") ||  item.types.includes("sublocality") ) && element.field_name == "Suburb"  ){
              element.value = item.long_name;
            }
            if( ( item.types.includes("administrative_area_level_2") || item.types.includes("locality") )  && element.field_name == "City"  ){
              element.value = item.long_name;
            }
            if( item.types.includes("administrative_area_level_1")  && element.field_name == "State"  ){
              element.value = item.long_name;
            }
            if( (item.types.includes("country") && item.types.includes("political") ) && element.field_name == "Country"  ){
              element.value = item.long_name;
            }
            if( item.types.includes("postal_code") && element.field_name == "Pincode"  ){
              element.value = item.long_name;
            }
          })          
        })  
        setCustomMasterFields(tmp);       
      }
    })
    .catch((e) => {
      console.log(e);
    })
  }

  const getTextValue = (customMasterFields, id) => {        
    if(customMasterFields.length > 0){
      var tmp = customMasterFields;
      var res = "";
      tmp.forEach((element) =>{
        if(element.custom_master_field_id == id){
          res = element.value;
        }
      });
      return res;
    }else{
      return "";
    }    
  }

  const getSelectedDropdownItem = () =>{
    var tmp = customMasterFields;        
    var res = "";
    tmp.forEach((element) =>{
      if(element.custom_master_field_id == dropdownId){
        res = element.value;
      }
    });
    if(res == ""){
      return -1;
    }
    return res;
  }  

  const getSelectedDropdownItemText = (id , name) =>{
    var tmp = customMasterFields;
    var index = -1;    
    console.log("id", id);
    tmp.forEach((element) =>{
      if(element.custom_master_field_id == id && element.value != '' ){ //&& element.value != ""
        index = element.value;        
      }
    });    
    console.log("index", index);
    if(index == -1){
      return name;
    }
    
    var showName = '';
    leadForms.forEach((element) =>{
      if(element.custom_master_field_id == id && element.preset_options != ""){
        showName = element.preset_options[index];
      }
    });    
    return showName;    
  }

  const dropdownModal = () => {
    return (
      <CustomPicker 
        visible={isDropdownModal}         
        renderItems= {
        dropdownItems.map((item, key) => (
          <TouchableOpacity style={[styles.pickerItem]} key={key}
          onPress={() => { 
            var tmp = customMasterFields;
            tmp.forEach((element) => {
              if(element.custom_master_field_id == dropdownId){
                element.value = key;
              }
            });
            setCustomMasterFields(tmp);            
            setIsDropdownModal(false);
          }}>            
              <Text style={styles.pickerItemText}>{item}</Text>              
              {key == getSelectedDropdownItem() && <SvgIcon icon="Check" width='23px' height='23px' />}           
          </TouchableOpacity>
        ))
      } />
    )
  }

  if (isLoading) {
    return (
      <View style={[styles.container, {padding: 10, justifyContent: 'center', height: '100%'}]}>
        {Array.from(Array(6)).map((_, key) => (
          <Skeleton key={key} />  
        ))}
      </View>
    )
  }

  return (
      <ScrollView style={styles.container}>
        <TouchableOpacity style={{padding: 6 }} onPress={() => {
          dispatch({type: SLIDE_STATUS, payload: false})
          //dispatch({type: BACK_ICON_STATUS, payload: false})
        }}>
          <Divider />
        </TouchableOpacity>

        <View style={styles.header}>
          <Title style={{ fontFamily: Fonts.primaryBold }}>Add Lead</Title>
          <Button 
            labelStyle={{
              fontFamily: Fonts.primaryRegular, 
              letterSpacing: 0.2
            }}
            color="#DC143C" 
            uppercase={false} 
            onPress={() => {
              initPostData(customMasterFields);  
            }}
          >
            Clear
          </Button>          
        </View>
        
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          showsUserLocation = {true}
          followUserLocation = {true}
          showsMyLocationButton = {true}
          zoomEnabled = {true}
          region={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
        >
        </MapView>

        <View style={{padding:5}}>
          {
            leadForms.map((field, key) => {
              if(field.field_type == "dropdown"){
                index++;
                return (
                  <TouchableOpacity key={key}
                    onPress={() =>{
                      setDropdownItems(field.preset_options);
                      if(field.preset_options.length > 0){
                        setDropdownId(field.custom_master_field_id);
                        setIsDropdownModal(true);
                      }                      
                    }}>

                    <Text                                        
                      ref={(element) => { dispositionRef.current[key] = element }}                      
                      style={[styles.textInput,{borderColor:PRIMARY_COLOR, borderWidth:1, borderRadius:4 , paddingLeft:10 , paddingTop:5}]}                       
                      outlineColor="#133C8B">
                      {getSelectedDropdownItemText(field.custom_master_field_id , field.field_name)}
                    </Text>
                                                            
                  </TouchableOpacity>
                );
              }else{
                return (               
                  <View key={key}>
                    {
                      key == 1 && 
                      <TouchableOpacity style={[styles.linkBox,{marginTop:10}]} key={key + 100}  onPress={reverseGeocoding}>                  
                          <Text style={styles.linkBoxText}>Use Current Geo Location</Text>                  
                      </TouchableOpacity>
                    }
                    <TouchableOpacity                      
                      activeOpacity={1}>
                      <View>
                        <TextInput
                          type={field.field_type}
                          ref={(element) => { dispositionRef.current[key] = element }}                      
                          keyboardType={field.field_type === "numeric" ? 'number-pad' : 'default'}
                          returnKeyType={field.field_type === "numeric" ? 'done' : 'next'}
                          style={styles.textInput}
                          label={<Text style={{ backgroundColor: BG_COLOR }}>{field.field_name}</Text>}                        
                          value={getTextValue(customMasterFields, field.custom_master_field_id)}
                          mode="outlined"
                          outlineColor="#133C8B"
                          activeOutlineColor="#9D9FA2"                                        
                          onChangeText={text => {

                            var tmp = [ ...customMasterFields ];
                            tmp.forEach((element) => {
                              if(element.custom_master_field_id === field.custom_master_field_id){
                                console.log("enter", text);
                                element.value = text;
                              }
                            });
                            setCustomMasterFields(tmp);
                            console.log("changed", tmp);
                          }}
                          blurOnSubmit={false}
                          onSubmitEditing={()=>{ 
                            if(key <= dispositionRef.current.length - 2 && dispositionRef.current[key + 1] != null){
                              if(leadForms[key + 1].field_type == "text" ){
                                dispositionRef.current[key + 1].focus();
                              }                              
                            }
                          }}                    
                        />
                      </View>
                    </TouchableOpacity>                    
                  </View>                  
                );  
              }              
            })
          }

          <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
            <Text style={[styles.addButtonText]}>Add</Text>
            <FontAwesomeIcon style={styles.addButtonIcon} size={25} color="#fff" icon={ faAngleDoubleRight } />
          </TouchableOpacity>

        </View>       

        { dropdownModal() }        

      </ScrollView>
  )
}

const styles = EStyleSheet.create({
  container: {
    backgroundColor: BG_COLOR,
    zIndex: 100,
    padding:10,    
    // elevation: 1
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  map: {
    width: '100%',
    height: 230,
    marginBottom: 10
  },
  
  addButton: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    borderRadius: 7,
    backgroundColor: PRIMARY_COLOR
  },
  addButtonText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: Fonts.secondaryBold
  },
  addButtonIcon: {
    position: 'absolute',
    right: 10
  },
  textInput: {
    height: 40,
    fontSize: 14,
    lineHeight: 30,
    backgroundColor: BG_COLOR,
    //fontFamily: Fonts.secondaryMedium,
    marginBottom: 8
  },
  pickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingBottom: 8,
  },
  pickerItemText: {
    fontSize: 18,
    color: 'black'
  },

  linkBox: {
    position: 'relative',
    marginBottom: 8
  },
  linkBoxText: {
    color: PRIMARY_COLOR,
    fontFamily: Fonts.secondaryMedium,
    textDecorationLine: 'underline',
    textDecorationColor: PRIMARY_COLOR,
    textAlign: 'center'
  },

});