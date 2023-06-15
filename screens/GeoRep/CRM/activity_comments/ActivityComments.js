
import React, { useState, useRef } from 'react';

import { View, Modal, StyleSheet, TouchableWithoutFeedback, Dimensions, Platform , TouchableOpacity} from 'react-native';
import Activity from './tabs/Activity';
import Comments from './tabs/Comments';
import { style } from '../../../../constants/Styles';
import Divider from '../../../../components/Divider';
import PagerView from 'react-native-pager-view';
import { TopTab } from '../../../../components/common/TopTab';

export default function ActivityComments(props) {
    
    const {visible , onModalClosed , locationId} =  props;
    const [tabIndex , setTabIndex] = useState(0);
    const headers = ["History", "Forms"];
    const refPagerView = useRef();    

    const changePage = (nativeEvent) => {
        setTabIndex(nativeEvent.position);
    }
    
    return (
        <Modal
            animationType="fade"        
            transparent={true}
            visible={visible}
            onRequestClose={onModalClosed}
            onModalClosed={onModalClosed}>

            <View style={[style.centeredView]}>
                
                <TouchableWithoutFeedback 
                    onPress={onModalClosed}>
                  <View style={styles.topContainer}></View>
                </TouchableWithoutFeedback>
                
                <View style={[style.modalView,  styles.modalContainer , { height: 20 + Dimensions.get("screen").height * 0.825 }]}>
                  
                    <TouchableOpacity onPress={() =>{onModalClosed()}}>
                        <Divider></Divider>
                    </TouchableOpacity>

                    <TopTab 
                            tabIndex={tabIndex}
                            headers={headers} onTabClicked={(index) => {      
                            setTabIndex(index);
                            refPagerView.current.setPage(index);
                    }} ></TopTab>
                    <PagerView
                            onPageSelected={(e) => { changePage(e.nativeEvent); }}
                            ref={refPagerView} style={styles.pagerView} initialPage={0}>
                            <View key="1">
                                <Activity {...props} location_id={locationId} />
                            </View>
                            <View key="2">
                                <Comments {...props} location_id={locationId} ></Comments>
                            </View>
                    </PagerView>

                </View>

            </View>

        </Modal>
    )    
}

const styles = StyleSheet.create({
    pagerView: {
        flex: 4,
    },
    modalContainer:{ 
        paddingLeft:0, 
        paddingRight:0, 
        paddingTop:10, 
        borderTopRightRadius:8,
        borderTopLeftRadius:8
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
