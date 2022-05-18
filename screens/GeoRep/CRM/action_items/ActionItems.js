

import { View, Text , StyleSheet , TouchableWithoutFeedback, TouchableOpacity, Modal, Dimensions } from 'react-native'
import React , {useState, useEffect} from 'react'
import { style } from '../../../../constants/Styles';
import Divider from '../../../../components/Divider';
import Actions from '../../Home/Actions/Actions';
import ScrollTab from '../../../../components/common/ScrollTab';

export default function ActionItems(props) {

    const {visible , onModalClosed , locationId} =  props;
    const [tabIndex, setTabIndex] = useState(0);
    const screenMargin = Platform.OS === "ios" ? 100 : 115;
    const tabs = [{name:'All' , id: 0 } , {name:'Tasks' , id: 1 } , {name:'Action Items' , id: 2 } , {name:'Completed' , id: 3 }]
    
    console.log("DDD", tabIndex)

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

                    <View style={[style.modalView,  styles.modalContainer , {height: Dimensions.get("screen").height -  screenMargin }]}>
                        
                        <TouchableOpacity onPress={() =>{onModalClosed()}}>
                            <Divider></Divider>                        
                        </TouchableOpacity>
                        
                        <View style={{marginTop:10, marginHorizontal:10}}>
                            <ScrollTab tabs={tabs} onTabSelection={(item) => { setTabIndex(item.id)}} ></ScrollTab> 
                        </View>
                        <Actions locationId={locationId}  tabIndex={tabIndex} ></Actions>

                    </View>

                </View>

        </Modal>
        
    );
}


const styles = StyleSheet.create({
    pagerView: {
        flex: 4,
    },
    modalContainer:{ 
        paddingLeft:0, 
        paddingRight:0, 
        paddingTop:10, 
        
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

