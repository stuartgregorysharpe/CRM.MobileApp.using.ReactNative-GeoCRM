import { View, Text , FlatList, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import React , { useRef , useState } from 'react'
import { AppText } from '../../../../../components/common/AppText';
import  Colors, { whiteLabel } from '../../../../../constants/Colors';
import CardView from '../../../../../components/common/CardView';
import SvgIcon from '../../../../../components/SvgIcon';
import { style } from '../../../../../constants/Styles';
import { ScrollView } from 'react-native-gesture-handler';
import Constants from '../../../../../constants/Constants';
import DevicePriorityModal from '../modal/DevicePriorityModal';
import { Strings } from '../../../../../constants';

export default function DevicesModalView(props) {

    const { lists  } = props;

    const devicePriorityModalRef = useRef(null);    
    const [device, setDevice] = useState(null)

    const renderItem = (item, index) => {
        
        return (
            <TouchableOpacity key={index} onPress={() =>{
                 setDevice(item);
                 if(devicePriorityModalRef.current){
                    devicePriorityModalRef.current.showModal(Strings.CRM.Pleae_Select_Type);
                 }
                 
            }}>
                <CardView style={{borderColor:whiteLabel().borderColor, borderWidth:1, marginVertical:5 , padding:5 }}>                
                        <View key={index} style={{ flex:1, flexDirection:'column'}}>            
                            <View style={{flex: 1 , flexDirection:'row' ,marginRight:10}}>
                                <AppText                            
                                    size="big"
                                    type="secondaryBold"
                                    title={item.description}
                                    style={{fontSize: 12.5 , flex:1}}></AppText>
                                
                                {
                                    item.unattached_device == '0' &&
                                    <AppText
                                        size="big"
                                        type="secondaryMedinu"
                                        color={whiteLabel().mainText}
                                        title={Constants.deviceType[parseInt(item.primary_device)]}
                                        style={{fontSize: 12.5}}></AppText>                                
                                }
                            </View>
                            
                            <View style={{flex: 1, flexDirection:'row', marginRight:10}}>
                                                                
                                <AppText
                                    type="secondaryMedium"
                                    title={"MSISDN: " + item.msisdn}              
                                    color={whiteLabel().subText}
                                    style={{fontSize: 10.4 , flex:1 }}></AppText>

                                {
                                    item.unattached_device == '0' &&
                                    <AppText
                                        type="secondaryMedium"
                                        title={Constants.stockPrefix.DEVICE + item.msn}
                                        color={whiteLabel().subText}
                                        style={{fontSize: 10.4}}></AppText>
                                }
                            </View>            
                        </View>
                        {/* <View style={{height:0.5, backgroundColor:Colors.greyColor, marginVertical:3 , marginRight:10}}></View> */}                
                </CardView>
                
            </TouchableOpacity>        
        );
    };

    const onDevicePrioriyModalClosed = ({type , value}) => {
        console.log(type, value)

        if(type === Constants.actionType.ACTION_CLOSE){
            devicePriorityModalRef.current.hideModal();
            if(props.onRefresh){
                props.onRefresh()
            }                
        }
    }

    return (
        <View style={styles.container}>

                <DevicePriorityModal 
                    title="Device Priority"
                    ref={devicePriorityModalRef}
                    device={device}
                    onButtonAction={onDevicePrioriyModalClosed}
                />
                
                <ScrollView>
                    {
                        lists !=undefined && lists.length > 0 && lists.map((item, index) => {
                            return renderItem(item, index);
                        })
                    }

                </ScrollView>

                {
                    // lists.length > 0 &&
                        <TouchableOpacity
                            style={[style.plusButton, { marginBottom: 0}]}
                            onPress={() => { 
                                if(props.showConfirmModal){
                                    props.showConfirmModal();
                                }
                            }}>
                            <SvgIcon icon="Round_Btn_Default_Dark" width='70px' height='70px' />
                        </TouchableOpacity>
                }         

        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {        
        flexDirection:'column',
        marginTop:8,        
        marginHorizontal: 20,      
        paddingBottom:0,
        height:Dimensions.get("window").height * 0.85
    },  
  
})

  