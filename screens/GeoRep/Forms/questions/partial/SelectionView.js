import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView,TouchableWithoutFeedback, Text, Dimensions, Platform , Modal} from 'react-native';
import Colors, { whiteLabel } from '../../../../../constants/Colors';
import Fonts from '../../../../../constants/Fonts';
import Divider from '../../../../../components/Divider';
import { boxShadow, style } from '../../../../../constants/Styles';
import { SubmitButton } from '../../../../../components/shared/SubmitButton';
import SvgIcon from '../../../../../components/SvgIcon';

export const SelectionView = ({ visible, options , mode,  selectedVals, onClose , onClear, onSave , onValueChanged}) => {    
    const [localSelectedVals, setSelectedVal] = useState(selectedVals !== null && selectedVals !== undefined ? selectedVals : [] );
            
    useEffect(() => { 
        console.log('enter', selectedVals)
        if(selectedVals === null){
            setSelectedVal([]);
        }else{
            setSelectedVal(selectedVals);
        }  
    },[selectedVals]);
        
    useEffect(() => {
        if(visible){
            if(selectedVals === null){
                setSelectedVal([]);
            }
            console.log("always")     
        }
          ;
    },[visible]);
   
    const getCheckedStatus = ( item,  values ) => {
        var tmp = null;
        if(values !== null && values !== undefined && values instanceof Array ){
            tmp = values.find((element => element === item ));
            if(tmp !== null && tmp !== undefined){
                return true;
            }
        }
        return false; 
    }
    
    const onTapItem = (item) => {
        console.log("clicked", item);
        if(mode === "single"){
            setSelectedVal([item]);
           // onValueChanged([item]);
        }else {
            console.log("selectedVals",selectedVals)
            if(localSelectedVals != null && localSelectedVals !== undefined && localSelectedVals instanceof Array){
                var check = localSelectedVals.find( element => element === item);
                if(check != null){
                    var tmp = localSelectedVals.filter( element => element !== item);                
                    setSelectedVal(tmp);
                //    onValueChanged(tmp);
                }else{
                    setSelectedVal([...localSelectedVals, item]);
                   // onValueChanged([...selectedVals, item]);
                }
            }else{
                setSelectedVal([item]);
                //onValueChanged([item]);
            }              
        }
    }
   
    return (        
        <Modal             
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                //setSelectedVal([]);
                onClose();
            }}>
            

                <View style={style.centeredView}>
                    
                    <TouchableWithoutFeedback 
                        onPress={()=>{
                           // setSelectedVal([]);                        
                            onClose();
                        }}>
                      <View style={styles.topContainer}></View>
                    </TouchableWithoutFeedback>

                    <View style={style.modalView}>                                                 
                        <TouchableOpacity style={{ padding: 6 }}>
                            <Divider />
                        </TouchableOpacity>

                        <View style={styles.sliderHeader}>                
                            <Text style={{fontSize:16,fontFamily:Fonts.primaryBold , color:Colors.blackColor, fontSize:16, flex:1 }} >Select the correct answer from the list:</Text>
                            <TouchableOpacity style={styles.closeModal} onPress={() => { onClear() }}>
                                <Text style={{ fontSize: 13, fontFamily: Fonts.secondaryRegular ,  color:Colors.selectedRedColor}}>Clear</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={{maxHeight:Dimensions.get("screen").height * 0.6}}>
                            { options && options.map((item, key) => (
                                <View key={key}>                            
                                    <View style={[style.card , Platform.OS === 'android' ? boxShadow : {}, {paddingHorizontal:20}]} key={key}>
                                        <View style={{flex:1}}>
                                            <Text style={styles.pickerItemText}>{item}</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => onTapItem(item) }>
                                            <View style={[styles.checkBoxStyle , getCheckedStatus(item, localSelectedVals)? {} : {backgroundColor:'white'}]}>
                                                <SvgIcon icon="Yes_No_Button_Check" width='15px' height='15px' />
                                            </View>
                                        </TouchableOpacity>                                                
                                    </View>     
                                </View>
                            ))}
                        </ScrollView>                        

                        <SubmitButton onSubmit={ () => {                                
                                onValueChanged(localSelectedVals);                                
                                onSave()
                        }} title="Save"></SubmitButton>
                                            
                    </View>
                    
                </View>

                

            
        </Modal>
    );
}

const styles = StyleSheet.create({

    container: {
        width:Dimensions.get("screen").width,                
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.bgColor,
        elevation: 2,
        zIndex: 2000,
        padding: 10,
    },
    
    sliderHeader: {                
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
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
    closeModal: {            
        paddingRight: 5  
    },
    topContainer:{
        width:Dimensions.get("screen").width,        
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height:Dimensions.get("screen").height,        
    },

});