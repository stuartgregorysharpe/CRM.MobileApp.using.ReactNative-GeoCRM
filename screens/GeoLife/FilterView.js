import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Text } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Button, Title, Modal, Portal } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import Divider from './Divider';
import FilterButton from './FilterButton';
import Skeleton from './Skeleton';
import { SLIDE_STATUS } from '../actions/actionTypes';
import Fonts from '../constants/Fonts';
import Colors from '../../constants/Colors';


export default function FilterView({navigation}) {

  const statusLocationFilters = useSelector(state => state.location.statusLocationFilters);  
  const dispatch = useDispatch();
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
          color={Colors.selectedRedColor}
          uppercase={false} 
          onPress={() => setSelectFilters(emptyArray)}>
            
          Clear Filters
        </Button>
      </View>
      {locationFilters.map((locationFilter, key) => (
        <FilterButton text={locationFilter.filter_label} key={key} onPress={selectFilter.bind(null, key)}/>
      ))}
      <Button 
        mode="contained" 
        color={Colors.primaryColor} 
        uppercase={false} 
        labelStyle={{
          fontSize: 18, 
          fontFamily: Fonts.secondaryBold, 
          letterSpacing: 0.2
        }} 
        onPress={() => console.log("pressed")}>
        Apply Filters
      </Button>
      <Portal>
      <Modal visible={modaVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={styles.pickerContent}>
        {showFilter.map((item, key) => (
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
        ))}
      </Modal>
    </Portal>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bgColor
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  pickerContent: {
    backgroundColor: Colors.bgColor,
    paddingTop: 10,
    paddingBottom:10,
    paddingLeft: 20,
    paddingRight: 20
  },
  pickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingBottom: 8
  },
  pickerItemText: {
    fontSize: 18
  }
})