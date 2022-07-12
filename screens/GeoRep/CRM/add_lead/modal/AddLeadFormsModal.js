import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Modal, ScrollView, Dimensions, } from 'react-native';
import { Button, Title } from 'react-native-paper';
import Divider from '../../../../../components/Divider';
import { Colors, Fonts } from '../../../../../constants';
import { style } from '../../../../../constants/Styles';
import { FormListItem } from '../../../Forms/partial/FormListItem';
let isInfoWindow = false;


export default function AddLeadFormsModal(props) {

    const { onClose } = props;
    const navigationMain = props.navigation;// useNavigation();
    const [isInfo, setIsInfo] = useState(false);
    const [bubbleText, setBubleText] = useState({});

    const _onTouchStart = (e, text) => {
        setBubleText(text);
        setIsInfo(true);
    }
    
  return (
    <Modal             
        animationType="slide"
        transparent={true}
        visible={props.visible}
        onRequestClose={onClose}>

        <TouchableWithoutFeedback onPress={onClose}>                            
          <View style={style.centeredView}>
              <View style={style.modalView}>                            
                  <TouchableOpacity style={{ padding: 6 }}>
                      <Divider></Divider>
                  </TouchableOpacity>

                  <View style={styles.sliderHeader}>             
                      <Text style={{fontSize:16,fontFamily:Fonts.primaryBold , color:Colors.blackColor, fontSize:16, flex:1 }} >
                        Forms
                      </Text>
                      <TouchableOpacity style={styles.closeModal} onPress={() => { onClose(); }}>
                          <Text style={{ fontSize: 13, fontFamily: Fonts.secondaryRegular ,  color:Colors.selectedRedColor}}>
                              Clear
                          </Text>
                      </TouchableOpacity>
                  </View>
                  <ScrollView style={{maxHeight:400}}>
                  {
                      props.formLists.map((item, index) => (
                            <FormListItem key={index} item={item}
                                onItemPress={() => {
                                    // props.onClose();
                                    if (!isInfoWindow) {
                                        onClose();
                                        console.log("item", item)                                        
                                        props.onNext(item);                                        
                                    } else {
                                        isInfoWindow = false;
                                    }
                                }}
                                onTouchStart={(e, text) => _onTouchStart(e, text)}>                                                
                            </FormListItem>
                        ))
                  }
                  </ScrollView>
                                        
              </View>
          </View>                
        </TouchableWithoutFeedback >
    </Modal>
  )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },

    sliderHeader: {                
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },   

})