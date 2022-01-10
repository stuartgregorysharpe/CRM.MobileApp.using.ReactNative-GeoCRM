import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Text, Dimensions } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Button, Title, Modal, Portal, TextInput } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';

import Divider from './Divider';
import FilterButton from './FilterButton';
import Skeleton from './Skeleton';
import { PRIMARY_COLOR, BG_COLOR } from '../constants/Colors';
import { SLIDE_STATUS } from '../actions/actionTypes';
import Fonts from '../constants/Fonts';
import SvgIcon from './SvgIcon';

import axios from 'axios';

export default function FilterView({navigation}) {
  const dispatch = useDispatch();
  const statusLocationFilters = useSelector(state => state.location.statusLocationFilters);
  const locationFilters = useSelector(state => state.location.locationFilters);

  const [modaVisible, setModalVisible] = useState(false);
  const [selectFilterId, setSelectFilterId] = useState(0);
  const [showFilter, setShowFilter] = useState([]);
  const [emptyArray, setEmptyArray] = useState([]);
  const [selectFilters, setSelectFilters] = useState([]);

  useEffect(() => {
    let doubleArray = [];
    for(let i = 0; i < locationFilters.length; i++) {
      let items = [];
      for(let j = 0; j < locationFilters[i].options.length; j++) {
        items.push(false);
      }
      doubleArray.push(items);
    }
    setEmptyArray(doubleArray);
    setSelectFilters(doubleArray);
  }, [locationFilters]);

  const selectFilter = (key) => {
    setSelectFilterId(selectFilterId);
    setModalVisible(true);
    setShowFilter(locationFilters[key].options);
  }

  if (statusLocationFilters == "request") {
    return (
      <ScrollView style={styles.container}>
        <View style={{padding: 10, justifyContent: 'center'}}>
          {Array.from(Array(6)).map((_, key) => (
            <Skeleton key={key} />  
          ))}
        </View>
      </ScrollView>
    )
  }
  
  const submit = () => {
    console.log('ddd')
    let data = {
      "location_id": "1",
      "campaign_id": "2",
      "disposition_fields": [
          {
              "disposition_field_id": 4,
              "value": "Test Comment"
          },
          {
              "disposition_field_id": 5,
              "value": "2021-12-10 15:33"
          },
          {
              "disposition_field_id": 7,
              "value": ""
          }
      ]
    }
    console.log(data)

    let config = {
      method: 'post',
      url: 'https://www.dev.georep.com/local_api_phase_2/location-info/updateDispositionFields',
      headers: { 
        'Indempotency-Key': 'key1234567893424234', 
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NDE0OTExMTMsImV4cCI6MTY0MjA5NTkxMywiZXhwZGF0ZSI6IjIwMjItMDEtMTMgMTE6NDU6MTMiLCJpc3MiOiJ1bml2ZXJzYWxfYXBpLmdlb3JlcC5jb20iLCJlbWFpbCI6ImNsaW50b25AY3lkY29yLmNvbSIsInVuaXZlcnNhbF91c2VyX2lkIjoiNiIsImV4dGVybmFsX2p3dCI6ImFkZmRmYXNhZGZhYXNkZmRzZmRmYWFhYWEiLCJkZWZhdWx0X3Byb2plY3QiOiJnZW9fcmVwIiwidXNlcl9zY29wZXMiOnsiZ2VvX3JlcCI6eyJiYXNlX3VybCI6Imh0dHBzOlwvXC9kZXYuZ2VvcmVwLmNvbVwvbG9jYWxfYXBpX3BoYXNlXzIiLCJwcm9qZWN0X2N1c3RvbV9uYW1lIjoiR2VvIENSTSIsImJ1c2luZXNzX3VuaXRfaWQiOiI0IiwiY2xpZW50X2lkIjoiODAiLCJ1c2VyX3R5cGUiOiJTdXBlciBBZG1pbiIsInVzZXJfaWQiOiIxMDEiLCJ1c2VyX2VtYWlsIjoiY2xpbnRvbkBjeWRjb3IuY29tIiwibW9kdWxlc19uYXZfb3JkZXIiOlsiY3JtX2xvY2F0aW9ucyIsImNhbGVuZGFyIiwiY29udGVudF9saWJyYXJ5Iiwid2ViX2xpbmtzIiwic3VwcG9ydCJdLCJmZWF0dXJlcyI6WyJkaXNwb3NpdGlvbl9maWVsZHMiLCJjaGVja2luIiwiYWNjZXNzX2NybSJdfX19.Tb6Vs6TVXuFsf8iBWVIxNDgtbYgzs9nfLjWsOUXSnpY', 
      },
      data : data
    };

    axios(config)
      .then(function (response) {
        console.log("3333")
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={{ padding: 6 }} onPress={() => dispatch({type: SLIDE_STATUS, payload: false})}>
        <Divider />
      </TouchableOpacity>
      <View style={styles.sliderHeader}>
        <Title style={{ fontFamily: Fonts.primaryBold }}>Filter your search</Title>
        <Button 
          labelStyle={{
            fontFamily: Fonts.primaryRegular, 
            letterSpacing: 0.2
          }}
          color="#DC143C" 
          uppercase={false} 
          onPress={() => setSelectFilters(emptyArray)}
        >
          Clear Filters
        </Button>
      </View>
      {locationFilters.map((locationFilter, key) => (
        <FilterButton text={locationFilter.filter_label} key={key} 
        onPress={selectFilter.bind(null, key)}
        />
      ))}
      <Button 
        mode="contained" 
        color={PRIMARY_COLOR} 
        uppercase={false} 
        labelStyle={{
          fontSize: 18, 
          fontFamily: 'Gilroy-Bold', 
          letterSpacing: 0.2
        }} 
        onPress={submit}>
        Apply Filters
      </Button>
      <Portal>

      <Modal 
        
        visible={modaVisible} 
        transparent={true}
        onDismiss={() => setModalVisible(false)} 
        onRequestClose={() => setModalVisible(true)}
        contentContainerStyle={styles.pickerContent}>
          <View style={{flex:1}}>
            
          <TouchableOpacity style={styles.closeModal} onPress={() =>{        
            setModalVisible(false)
          }}>
            {/* <SvgIcon icon="Close" width="30px" height="30px" /> */}
            <Text style={{fontSize:18, fontFamily:Fonts.secondaryRegular}}>Close</Text>
          </TouchableOpacity>
          
            <ScrollView style={{flex:1}}>  
        {showFilter.map((item, key) => (
          
          <View style={{}} key={key}>
          {
            item[Object.keys(item)[0]] != null &&
          <View style={styles.pickerItem} key={key}>
            <Text style={styles.pickerItemText}>{item[Object.keys(item)[0]]}</Text>
            <CheckBox
              value={selectFilters[selectFilterId][key]}
              onValueChange={value => {
                setSelectFilters([
                  ...selectFilters.slice(0, selectFilterId),
                  [
                    ...selectFilters[selectFilterId].slice(0, key),
                    value,
                    ...selectFilters[selectFilterId].slice(key + 1, selectFilters[selectFilterId].length)
                  ],
                  ...selectFilters.slice(selectFilterId + 1, selectFilters.length)
                ])
              }}
            />
            </View>
                    }

          </View>  
        ))}
        </ScrollView>
          </View>
        
      </Modal>

    </Portal>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: BG_COLOR
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  pickerContent: {
    height:Dimensions.get("window").height * 0.7,  
    margin:20,
    backgroundColor: BG_COLOR,
    paddingTop: 10,
    paddingBottom:10,
    paddingLeft: 20,
    paddingRight: 0,
    borderRadius:5,
    elevation:1,

  },
  pickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingRight:20,
    paddingBottom: 8
  },
  pickerItemText: {
    fontSize: 18
  },
  closeModal:{
    flexDirection:'row',    
    justifyContent:'flex-end',        
    paddingRight:15,
    paddingTop:10,
    marginBottom:10
  }
})