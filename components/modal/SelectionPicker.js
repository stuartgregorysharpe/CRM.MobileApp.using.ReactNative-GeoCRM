import React , {useState} from 'react';
import { View, Modal, TouchableWithoutFeedback, StyleSheet, ScrollView ,TouchableOpacity, Text, Dimensions } from 'react-native';
import Colors, { whiteLabel } from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { boxShadow, style } from '../../constants/Styles';
import Divider from '../Divider';
import { SubmitButton } from '../shared/SubmitButton';
import SvgIcon from '../SvgIcon';

const SelectionPicker = ({ title, clearTitle, buttonTitle, visible, mode, options, value, onModalClose, onValueChanged }) => {

    const [selectedVals, setSelectedVal] = useState(value !== null && value !== undefined ? value : [] );
    //console.log("options-options" ,options)
    const getCheckedStatus = ( item,  values ) => {
        //console.log("selectedVals - ----", selectedVals);
        if( mode === "single"){
            var tmp = null;
            if(values !== null && values !== undefined){
                if(mode == "single"){
                    if(values === item){
                        return true;
                    }
                }else{
                    tmp = values.find((element => element === item ));
                    if(tmp !== null && tmp !== undefined){
                        return true;
                    }
                }                
            }
        }
        return false; 
    }

    const onTapItem = (item , index) => {
        console.log("clicked", item);
        if(mode === "single"){
            setSelectedVal([item]);
            if(mode === "single"){
                onValueChanged(item ,index);
            }else{
                onValueChanged([item] ,index);
            }            
        }else {
            var check = selectedVals.find( element => element === item);
            if(check != null){
                var tmp = selectedVals.filter( element => element !== item);                
                setSelectedVal(tmp);
                if(mode === "single"){
                    onValueChanged(tmp , index);    
                }else{
                    onValueChanged(tmp , index);
                }
                
            }else{
                setSelectedVal([...selectedVals, item]);
                if(mode === "single"){
                    onValueChanged(item , index);
                }else{
                    onValueChanged([...selectedVals, item] , index);
                }
            }            
        }
    }

    return (
        <Modal             
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onModalClose}>
            <TouchableWithoutFeedback onPress={onModalClose}>
                                
                    <View style={style.centeredView}>
                        <View style={style.modalView}>                            
                            <TouchableOpacity style={{ padding: 6 }}>
                                <Divider></Divider>
                            </TouchableOpacity>

                            <View style={styles.sliderHeader}>                
                                <Text style={{fontSize:16,fontFamily:Fonts.primaryBold , color:Colors.blackColor, fontSize:16, flex:1 }} >
                                    {title}
                                </Text>
                                <TouchableOpacity style={styles.closeModal} onPress={() => { onModalClose() }}>
                                    <Text style={{ fontSize: 13, fontFamily: Fonts.secondaryRegular ,  color:Colors.selectedRedColor}}>
                                        {clearTitle}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <ScrollView style={{maxHeight:400}}>
                            {
                                options != null && options != undefined && options.map((item, index) => (
                                    <TouchableOpacity  key={index}
                                        onPress={() => {                                                                                  
                                            onTapItem(item , index);
                                        }}>
                                    <View style={[style.card , Platform.OS === 'android' ? boxShadow : {}, {paddingHorizontal:20}]} key={index}>
                                        
                                        <Text style={styles.pickerItemText}>{item}</Text>
                                        <TouchableOpacity onPress={() => onTapItem(item , index) }>
                                                <View style={[style.checkBoxStyle , getCheckedStatus(item, value !== null && value !== undefined ? value : [] )? {} : {backgroundColor:'white'}]}>
                                                <SvgIcon icon="Yes_No_Button_Check" width='15px' height='15px' />
                                            </View>
                                        </TouchableOpacity>                
                                        {/* {index === getSelectedDropdownItem() && <SvgIcon icon="Check" width='23px' height='23px' />} */}
                                        
                                    </View>
                                    </TouchableOpacity>
                                  ))
                            }
                            </ScrollView>

                            {
                                buttonTitle &&
                                <SubmitButton onSubmit={ () =>  onSave()} title={buttonTitle}></SubmitButton>
                            }
                            
                        </View>
                    </View>
                {/* </ScrollView> */}
            </TouchableWithoutFeedback >
        </Modal>
    )
}

const styles = StyleSheet.create({
  
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

    sliderHeader: {                
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },   
})

export default SelectionPicker;