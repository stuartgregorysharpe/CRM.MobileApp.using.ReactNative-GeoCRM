import { View, TouchableOpacity , StyleSheet } from 'react-native'
import React , { useRef } from 'react'
import { AppText } from '../../../../../components/common/AppText'
import { Colors, Constants } from '../../../../../constants'
import SvgIcon from '../../../../../components/SvgIcon'
import { whiteLabel } from '../../../../../constants/Colors'
import ViewOfflineSyncModal from '../modal/ViewOfflineSyncModal'

const ViewOfflineSyncItem = props => {

    const { count , onClosed } = props;
    const offlineSyncModalRef = useRef(null);
    
    const modalClosed = ({type, value}) => {
        
        if(type == Constants.actionType.ACTION_CLOSE){            
            
        }
    }

    const closeModal = () => {
        offlineSyncModalRef.current.hideModal();
        onClosed();
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
                <View style={styles.container}>
                    <AppText title="View Offline Sync Items" type="secondaryBold" color={Colors.primaryColor} ></AppText>      
                    <View style={{position:'absolute', flexDirection:'row', right:10, alignItems:'center'}}>          
                        <View style={styles.numberContainer}>
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

export default ViewOfflineSyncItem;

const styles = StyleSheet.create({
    container:{
        alignItems:'center', 
        padding:7, 
        marginTop:5, 
        borderRadius:10, 
        borderColor:Colors.redColor, 
        borderWidth:1, 
        marginHorizontal:10
    },
    numberContainer:{
        borderRadius:30, 
        borderColor:whiteLabel().borderColor , 
        borderWidth:1, 
        marginRight:10, 
        width:25,
        height:25 , 
        alignItems:'center', 
        justifyContent:'center'
    }
})
