import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet , Text, Dimensions , TouchableOpacity, ScrollView} from 'react-native';
import {Modal} from 'react-native-paper';
import { BG_COLOR } from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import CheckBox from '@react-native-community/checkbox';

const FilterOptionsModal = ({modaVisible, onClose, filters,  options, selectedType ,  fieldType,  onValueChanged }) => {
    
    const getCheckedStatus = (id) => {      
        if(selectedType === "stage"){
          if(filters.stage_id === undefined){
            return false;
          }
          var flag = false;
          filters.stage_id.forEach(element => {                
            if(element === id){          
              flag = true;       
            }
          });            
          return flag;
        }else if(selectedType === "outcome"){
          if(filters.outcome_id == undefined){
            return false;
          }
          var flag = false;
          filters.outcome_id.forEach(element => {        
            if(element === id){
              flag = true;
            }
          });      
          return flag;
        }else if(selectedType === "disposition"){
          if(filters.dispositions == undefined){
            return false;
          }
          var flag = false;
          filters.dispositions.forEach(element => {
            if(fieldType == "dropdown"){
              if(element.field_value === id){
                flag= true;
              }
            }else if(fieldType == "date"){
              if(element.start_date === id || element.end_date === id){
                flag = true;
              }
            }        
          });
          return flag;
        }else if(selectedType === "custom"){
          if(filters.customs == undefined){
            return false;
          }
          var flag = false;
          filters.customs.forEach(element => {
            if(fieldType == "dropdown"){          
              if(element.field_value === id){
                flag = true;
              }
            }else if(fieldType == "date"){
              if(element.start_date === id || element.end_date === id){
                flag = true;
              }
            }        
          });
          return flag;
        }
    }

    return (
        
        <Modal         
            visible={modaVisible} 
            transparent={true}
            onDismiss={() => onClose()} 
            onRequestClose={() => onClose()}
            contentContainerStyle={styles.pickerContent}>
          <View style={{flex:1}}>              
            <TouchableOpacity style={styles.closeModal} onPress={() =>{onClose() }}>            
              <Text style={{fontSize:18, fontFamily:Fonts.secondaryRegular}}>Close</Text>
            </TouchableOpacity>
          
            <ScrollView style={{flex:1}}>
                
                {options.map((item, key) => (                  
                  <View key={key}>
                  {
                    (selectedType == "stage" || selectedType == "outcome") &&
                    <View style={styles.pickerItem} key={key}>
                      <Text style={styles.pickerItemText}>{item.name}</Text>
                      <CheckBox
                        value={getCheckedStatus(item.id)}
                        onValueChange={value => {                        
                          onValueChanged(item.id , value);   
                        }}
                      />
                    </View>                  
                  }
                  {
                    !(selectedType == "stage" || selectedType == "outcome") &&
                    <View style={styles.pickerItem} key={key}>
                      <Text style={styles.pickerItemText}>{item}</Text>
                      <CheckBox                        
                        value={getCheckedStatus(item)}
                        onValueChange={value => {
                          onValueChanged(item , value);                                     
                        }}
                      />
                    </View>                    
                  }
                  </View>  
                ))}
            </ScrollView>

          </View>        
      </Modal>       
    )
}

const styles = StyleSheet.create({        
   
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

export default FilterOptionsModal;