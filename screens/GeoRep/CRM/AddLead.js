import React, {useState, useEffect, useRef } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { setWidthBreakpoints, parse } from 'react-native-extended-stylesheet-breakpoints';
import { TextInput, Button, Title } from 'react-native-paper';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import uuid from 'react-native-uuid';
import Skeleton from '../../../components/Skeleton';
import Divider from '../../../components/Divider';
import { PRIMARY_COLOR, BG_COLOR } from '../../../constants/Colors';
import { breakPoint } from '../../../constants/Breakpoint';
import { BACK_ICON_STATUS, SLIDE_STATUS } from '../../../actions/actionTypes';
import { getLeadFields, postLeadFields } from '../../../actions/location.action';
import Fonts from '../../../constants/Fonts';

export default function AddLead({screenProps}) {

  const dispatch = useDispatch();    
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const [isLoading, setIsLoading] = useState(false);
  const dispositionRef = useRef([]);
  const [leadForms, setLeadForms] = useState([]);
  const [customMasterFields, setCustomMasterFields] = useState([]);
      
  const handleSubmit = () => {        
    //dispatch(postLeadFields(postData, idempotencyKey));
  }

  useEffect(() => {
    loadingForm();
  },[]);

  useEffect(() =>{
    if(isLoading){
      getLeadFields()
      .then((res) => {
        console.log("forms", res);
        setLeadForms(res);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
      })
    }
  }, [isLoading]);

  const loadingForm = async() => {    
    setIsLoading(true);    
  }


  const reverseGeocoding = () => {
    
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
          dispatch({type: BACK_ICON_STATUS, payload: false})
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
            onPress={() => console.log('Pressed')}
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
                return (
                  <TouchableOpacity key={key}
                    onPress={() =>{

                    }}
                  >
                    <TextInput   
                      disabled={true}
                      // label={field.field_name}
                      value={field.field_name}
                      style={[styles.textInput,{borderColor:'#000', borderWidth:1, borderRadius:3}]}                       
                      outlineColor="#133C8B">
                    </TextInput>
                  </TouchableOpacity>
                );
              }else{
                return (               
                  <TouchableOpacity
                    key={key}                
                    activeOpacity={1}>

                    <View>
                      <TextInput
                        type={field.field_type}
                        ref={(element) => { dispositionRef.current[key] = element }}
                        // autoFocus={true}
                        keyboardType={field.field_type === "numeric" ? 'number-pad' : 'default'}
                        returnKeyType={field.field_type === "numeric" ? 'done' : 'next'}
                        style={styles.textInput}
                        label={<Text style={{ backgroundColor: BG_COLOR }}>{field.field_name}</Text>}
                        mode="outlined"
                        outlineColor="#133C8B"
                        activeOutlineColor="#9D9FA2"                                        
                        onChangeText={text => {}}
                        blurOnSubmit={false}
                        onSubmitEditing={()=>{ 
                          if(key <= dispositionRef.current.length - 2){
                            dispositionRef.current[key + 1].focus();
                          }
                        }}                    
                      />
                    </View>
                  </TouchableOpacity>
                );  
              }
              
            })
          }

          <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
            <Text style={[styles.addButtonText]}>Add</Text>
            <FontAwesomeIcon style={styles.addButtonIcon} size={25} color="#fff" icon={ faAngleDoubleRight } />
          </TouchableOpacity>

        </View>       
        

        
      </ScrollView>
  )
}

const styles = EStyleSheet.create(parse({
  container: {
    backgroundColor: BG_COLOR,
    zIndex: 100,
    elevation: 100
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
    fontFamily: Fonts.secondaryMedium,
    marginBottom: 8
  },
}));