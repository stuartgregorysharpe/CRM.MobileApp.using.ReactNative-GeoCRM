import React from 'react';
import { View, Modal, TouchableWithoutFeedback, StyleSheet, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import Colors, { whiteLabel } from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { boxShadow, style } from '../../constants/Styles';
import Divider from '../Divider';
import SvgIcon from '../SvgIcon';

const FilterOptionsModal = ({ modaVisible,customFieldId, onClose, filters, options, selectedType, fieldType, onValueChanged , title, clearTitle }) => {
  
  const getCheckedStatus = (id) => {
    if(selectedType === "form_type"){
      if (filters.form_type === undefined) {
        return false;
      }
      var flag = false;
      filters.form_type.forEach(element => {
        if (element === id) {
          flag = true;
        }
      });
      return flag;
    }else if (selectedType === "stage") {
      if (filters.stage_id === undefined) {
        return false;
      }
      var flag = false;
      filters.stage_id.forEach(element => {
        if (element === id) {
          flag = true;
        }
      });
      return flag;
    } else if (selectedType === "outcome") {
      if (filters.outcome_id == undefined) {
        return false;
      }
      var flag = false;
      filters.outcome_id.forEach(element => {
        if (element === id) {
          flag = true;
        }
      });
      return flag;
    } else if (selectedType === "pipeline") {
      if (filters.pipeline === undefined) {
        return false;
      }
      var flag = false;
      if (filters.pipeline === id) {
        flag = true;
      }
      return flag;
    } else if (selectedType === "opportunity_status") {
      if (filters.opportunity_status_id == undefined) {
        return false;
      }
      var flag = false;
      filters.opportunity_status_id.forEach(element => {
        if (element === id) {
          flag = true;
        }
      });
      return flag;
    } else if (selectedType === "disposition") {
      if (filters.dispositions == undefined) {
        return false;
      }
      var flag = false;
      filters.dispositions.forEach(element => {
        if (fieldType == "dropdown") {
          if (element.field_value === id) {
            flag = true;
          }
        } else if (fieldType == "date") {
          if (element.start_date === id || element.end_date === id) {
            flag = true;
          }
        }
      });
      return flag;
    } else if (selectedType === "opportunity") {
      if (filters.opportunity_fields == undefined) {
        return false;
      }
      var flag = false;
      filters.opportunity_fields.forEach(element => {
        if (fieldType == "dropdown") {
          if (element.field_value === id) {
            flag = true;
          }
        } else if (fieldType == "date") {
          if (element.start_date === id || element.end_date === id) {
            flag = true;
          }
        }
      });
      return flag;
    } else if (selectedType === "custom") {
      if (filters.customs == undefined) {
        return false;
      }
      var flag = false;
      filters.customs.forEach(element => {
        if (fieldType == "dropdown") {
          console.log("XXXDD", element);
          if (element.field_value === id && element.custom_field_id == customFieldId) {
            flag = true;
          }
        } else if (fieldType == "date") {
          if (element.start_date === id || element.end_date === id) {
            flag = true;
          }
        }
      });
      return flag;
    }
  }

  return (
        <Modal             
            animationType="slide"
            transparent={true}
            visible={modaVisible}
            onRequestClose={onClose}>

            <TouchableWithoutFeedback onPress={onClose}>
                                
              <View style={style.centeredView}>
                  <View style={style.modalView}>                            
                      <TouchableOpacity style={{ padding: 6 }}>
                          <Divider></Divider>
                      </TouchableOpacity>

                      <View style={styles.sliderHeader}>             
                          <Text style={{fontSize:16,fontFamily:Fonts.primaryBold , color:Colors.blackColor, fontSize:16, flex:1 }} >
                              {title}
                          </Text>
                          <TouchableOpacity style={styles.closeModal} onPress={() => { onClose(); }}>
                              <Text style={{ fontSize: 13, fontFamily: Fonts.secondaryRegular ,  color:Colors.selectedRedColor}}>
                                  {clearTitle}
                              </Text>
                          </TouchableOpacity>
                      </View>
                      <ScrollView style={{maxHeight:400}}>
                      {
                          options.map((item, index) => (                              
                              <TouchableOpacity  key={index}
                                  onPress={() => {            
                                      if(item){
                                        var value = getCheckedStatus(item.id ? item.id : item);
                                        onValueChanged(item.id ? item.id : item , !value);     
                                      }                                                                       
                                  }}>
                                <View style={[style.card , Platform.OS === 'android' ? boxShadow : {}, {paddingHorizontal:20}]} key={index}>                                        
                                    <Text style={styles.pickerItemText}>{ item && item.name ? item.name : item}</Text>
                                    <TouchableOpacity onPress={() => {
                                        if(item){
                                          var value = getCheckedStatus(item.id ? item.id : item);                                          
                                          onValueChanged(item.id ? item.id : item , !value);                                      
                                        }                                      
                                      } }>
                                            <View style={[styles.checkBoxStyle , getCheckedStatus( item && item.id ? item.id : item)? {} : {backgroundColor:'white'}]}>
                                            <SvgIcon icon="Yes_No_Button_Check" width='15px' height='15px' />
                                        </View>
                                    </TouchableOpacity>                                                                        
                                </View>
                              </TouchableOpacity>
                            ))
                      }
                      </ScrollView>
                      {/* {
                          buttonTitle &&
                          <SubmitButton onSubmit={ () =>  onSave()} title={buttonTitle}></SubmitButton>
                      } */}                      
                  </View>
              </View>                
            </TouchableWithoutFeedback >
        </Modal>
        
    // <Modal
    //   animationType='slide'
    //   visible={modaVisible}
    //   transparent={true}      
    //   onRequestClose={() => onClose()}>

    //   <TouchableWithoutFeedback onPress={onClose()}>
    //     <View style={style.centeredView}>
    //       <View style={style.modalView}>

    //         <TouchableOpacity style={{ padding: 6 }}>
    //             <Divider></Divider>
    //         </TouchableOpacity>

    //         <TouchableOpacity style={styles.closeModal} onPress={() => { onClose() }}>
    //           <Text style={{ fontSize: 18, fontFamily: Fonts.secondaryRegular }}>Close</Text>
    //         </TouchableOpacity>

    //         <ScrollView style={{ flex: 1 }}>

    //           {options.map((item, key) => (
    //             <View key={key}>
    //               {
    //                 (selectedType == "stage" || selectedType == "outcome"
    //                   || selectedType == "pipeline" || selectedType == "opportunity_status" || selectedType == "form_type") &&
    //                 <View style={styles.pickerItem} key={key}>
    //                   <Text style={styles.pickerItemText}>{item.name}</Text>
    //                   <CheckBox
    //                     tintColors={TICK_BOX_COLOR}
    //                     onCheckColor={TICK_BOX_COLOR}
    //                     onTintColor={TICK_BOX_COLOR}
    //                     value={getCheckedStatus(item.id)}
    //                     onValueChange={value => {
    //                       onValueChanged(item.id, value);
    //                     }}
    //                   />
    //                 </View>
    //               }
    //               {
    //                 !(selectedType == "stage" || selectedType == "outcome"
    //                   || selectedType == "pipeline" || selectedType == "opportunity_status" || selectedType == "form_type") &&
    //                 <View style={styles.pickerItem} key={key}>
    //                   <Text style={styles.pickerItemText}>{item}</Text>
    //                   <CheckBox
    //                     value={getCheckedStatus(item)}
    //                     tintColors={TICK_BOX_COLOR}
    //                     onCheckColor={TICK_BOX_COLOR}
    //                     onTintColor={TICK_BOX_COLOR}
    //                     onValueChange={value => {
    //                       onValueChanged(item, value);
    //                     }}
    //                   />
    //                 </View>
    //               }
    //             </View>
    //           ))}
    //         </ScrollView>
    //       </View>
    //     </View>
    //   </TouchableWithoutFeedback>
    // </Modal>
  )
}

const styles = StyleSheet.create({

  pickerContent: {
    height: Dimensions.get("window").height * 0.85,
    margin: 20,
    backgroundColor: Colors.bgColor,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 0,
    borderRadius: 5,
    elevation: 1,
  },
  pickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingRight: 20,
    paddingBottom: 8
  },
  pickerItemText: {
    fontSize: 18
  },
  closeModal: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 15,
    paddingTop: 10,
    marginBottom: 10
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
  checkBoxStyle:{
      width:25,
      height:25,
      borderRadius:15,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:whiteLabel().itemSelectedBackground,
      borderWidth:1,
      borderColor:whiteLabel().itemSelectedBackground
  },
  sliderHeader: {                
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10
  },   
})

export default FilterOptionsModal;