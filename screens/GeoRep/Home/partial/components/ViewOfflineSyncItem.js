import { View, TouchableOpacity } from 'react-native'
import React , { useRef } from 'react'
import { AppText } from '../../../../../components/common/AppText'
import { Colors } from '../../../../../constants'
import SvgIcon from '../../../../../components/SvgIcon'
import { whiteLabel } from '../../../../../constants/Colors'
import ViewOfflineSyncModal from '../modal/ViewOfflineSyncModal'

export default function ViewOfflineSyncItem(props) {

    const { count } = props;
    const offlineSyncModalRef = useRef(null);
    

    const modalClosed = (type, value) => {

    }

    const closeModal = () => {
        offlineSyncModalRef.current.hideModal();
    }

    const renderCloseIcon = () => {
        return (
            <TouchableOpacity onPress={closeModal}>
                <SvgIcon icon="Close" width='22' height='22'  style={{marginLeft:10}} />
            </TouchableOpacity>            
        )
    }
    
    return (
        <TouchableOpacity onPress={() => {
                if(offlineSyncModalRef.current){
                    offlineSyncModalRef.current.showModal()
                }
            }}>
                <View style={{alignItems:'center', padding:7, marginTop:5, borderRadius:10, borderColor:Colors.redColor, borderWidth:1, marginHorizontal:10}}>
                    <AppText title="View Offline Sync Items" type="secondaryBold" color={Colors.primaryColor} ></AppText>      
                    <View style={{position:'absolute', flexDirection:'row', right:10, alignItems:'center'}}>          
                        <View style={{borderRadius:30, borderColor:whiteLabel().borderColor , borderWidth:1, marginRight:10, width:25,height:25 , alignItems:'center', justifyContent:'center'}}>
                            <AppText title={count} color={Colors.primaryColor}></AppText>
                        </View>
                        <SvgIcon icon="DoubleArrow" width="30" height='30' />
                    </View>
                </View>
                
                <ViewOfflineSyncModal
                    ref={offlineSyncModalRef}
                    title="Offline Sync"          
                    customRightHeaderView={renderCloseIcon()}
                    onButtonAction={modalClosed}
                />


        </TouchableOpacity>        
    )


}