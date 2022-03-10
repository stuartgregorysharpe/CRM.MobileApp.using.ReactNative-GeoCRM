import React , {useState , useEffect} from 'react';
import { View, TouchableWithoutFeedback, StyleSheet, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Modal } from 'react-native-paper';
import Colors, { whiteLabel } from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import CheckBox from '@react-native-community/checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { SubmitButton } from '../shared/SubmitButton';

const MultipleOptionsModal = ({ modaVisible, mode, value, onClose, options, onValueChanged , onSave }) => {

  
  const [selectedVal, setSelectedVal] = useState(value);


  const getCheckedStatus = ( item,  value ) => {
    var flag = false;
    if(item === value){
      return true;
    }
    return flag;
  }


  const getCheckedStatusForMultiple = ( item,  value ) => {    
    if(item === value){
      return true;
    }
    return false;
  }

  return (

    <Modal
      visible={modaVisible}
      transparent={true}
      onDismiss={() => onClose()}
      onRequestClose={() => onClose()}
      contentContainerStyle={styles.pickerContent}>
      <View style={{ flex: 1 }}>

        <View style={{flexDirection:'row' , justifyContent:'center' , alignItems:'center' , marginTop:20}}>
          <Text style={{fontSize:16,fontFamily:Fonts.primaryBold}} >Select the correct answer from the list:</Text>
          <TouchableOpacity style={styles.closeModal} onPress={() => { onClose() }}>
            <Text style={{ fontSize: 13, fontFamily: Fonts.secondaryRegular ,  color:Colors.selectedRedColor}}>Clear</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView style={{ flex: 1 , marginTop:10}}>

          { options && options.map((item, key) => (
            <View key={key}>
              
                <View style={styles.pickerItem} key={key}>
                  <Text style={styles.pickerItemText}>{item}</Text>
                  <CheckBox
                    tintColors={Colors.tickBoxColor}
                    onCheckColor={Colors.tickBoxColor}
                    onTintColor={Colors.tickBoxColor}
                    value={ mode === "single" ? getCheckedStatus(item, selectedVal) :  getCheckedStatusForMultiple( item, value) }
                    onValueChange={value => {                      
                      setSelectedVal(item);        
                      onValueChanged(item);

                    }}
                  />
                </View>                          
            </View>
          ))}
      
          <SubmitButton onSubmit={ () =>  onSave()} title="Save"></SubmitButton>

        </ScrollView>
      </View>
    </Modal>
  )
}


const styles = StyleSheet.create({

  pickerContent: {
    height: Dimensions.get("window").height * 0.7,
    margin: 10,
    backgroundColor: Colors.bgColor,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
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
    fontSize: 16,
    color: Colors.blackColor
  },
  closeModal: {   
    marginLeft:5, 
    justifyContent: 'flex-end',
    paddingRight: 0,
    paddingTop: 0,
    marginBottom: 0
  },
  
  
})

export default MultipleOptionsModal;