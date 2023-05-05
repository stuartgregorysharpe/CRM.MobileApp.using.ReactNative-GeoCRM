
import { Platform, View } from 'react-native'
import React , {useEffect, useState , useRef} from 'react'
import DevicesModalView from '../components/DevicesModalView';
import { Constants, Strings } from '../../../../../constants';
import { useNavigation } from '@react-navigation/native';
import { expireToken } from '../../../../../constants/Helper';
import { useDispatch } from 'react-redux';
import { GetRequestLocationDevicesDAO } from '../../../../../DAO';
import { whiteLabel } from '../../../../../constants/Colors';
import SimAddModal from '../modal/SimAddModal';
import ConfirmDialog from '../../../../../components/modal/ConfirmDialog';
let isMount = true;

export default function DevicesModalContainer(props) {
    
    const { locationId } = props;
    if( !locationId) return null;

    const  [lists, setLists] = useState([]);
    const [simModalType, setSimModalType] = useState('add');
    const [sim, setSim] = useState('');
    const navigationMain = useNavigation();
    const dispatch = useDispatch()
    const confirmDialogRef = useRef()
    const simAddModalRef = useRef()
    
    useEffect(() => {
        isMount = true;
        getDeviceLists();
        return () =>{
            isMount = false;
        }
    },[]);

    const getDeviceLists = () => {
        let param = {
            location_id: locationId
        };                
        GetRequestLocationDevicesDAO.find(param).then((res) => {            
            console.log("All devices", res.devices);
            if(isMount){                             
                setLists(res.devices);
            }
        }).catch((e) => {
            console.log("location device api error: " , e);
            expireToken(dispatch , e);
        })
    }

    const handleAction = (value) => {
        props.onButtonAction({type: Constants.actionType.ACTION_CAPTURE, value: value});
    }
    
    const openStockModule = () => {
        navigationMain.navigate('DeeplinkStock');
        props.onButtonAction({type: Constants.actionType.ACTION_CLOSE, value: 0});
    }

    const onRefresh = () => {
        getDeviceLists();
    }
    
    const showConfirmModal = () => {
        if(confirmDialogRef.current){
            confirmDialogRef.current.showModal( Strings.CRM.Pleae_Select_Type , Strings.CRM.RICA_MSISDN , 'Device');
        }
    }

    const hideConfirmModal = () => {
        if(confirmDialogRef.current){
            confirmDialogRef.current.hideModal()
        }
    }

    const openAddSim = () => {
        hideConfirmModal();
        setSimModalType('add');
        if(Platform.OS == 'android'){
            showSimModal()
        }else{
            setTimeout(() => {
                showSimModal()
            }, 500);
        }
    }

    const showSimModal = () => {
        if(simAddModalRef.current){
            simAddModalRef.current.showModal();
        }
    }

    const onSimAddModalClosed = ( { type , value } ) => {
        if( type == Constants.actionType.ACTION_CLOSE){
            simAddModalRef.current.hideModal();
            onRefresh();
        }
    }

    const openSimEditModal = (sim) => {
        setSim(sim)
        setSimModalType('edit');
        showSimModal();
    }

    return (
        
        <View style={{alignSelf:'stretch' , flex:1}}>
            
            <ConfirmDialog 
                buttonTextStyle={{color: whiteLabel().mainText  }}
                buttonText2Style={{color : whiteLabel().mainText }}
                ref={confirmDialogRef}
                outSideTouch={true}
                onBack={() => {
                    openAddSim()
                }}
                onDone={() => {
                    hideConfirmModal();
                    openStockModule();
                }}
            />

            <SimAddModal
                title={Strings.CRM.RICA_MSISDN}
                clearText={'Close'}
                ref={simAddModalRef}
                location_id={locationId}
                simModalType={simModalType}
                initialValue={sim?.msisdn}
                location_device_id={sim?.location_device_id}
                onButtonAction={onSimAddModalClosed}
            />

            <DevicesModalView
                onButtonAction={handleAction}              
                lists= {lists}                  
                onRefresh={onRefresh}
                showConfirmModal={showConfirmModal}
                openSimEditModal={openSimEditModal}
                {...props}
            />
        </View>
    )
}