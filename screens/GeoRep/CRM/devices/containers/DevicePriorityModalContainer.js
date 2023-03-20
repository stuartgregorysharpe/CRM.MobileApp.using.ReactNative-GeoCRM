
import { View } from 'react-native'
import React , {useEffect, useState , useRef } from 'react'
import { Constants, Strings } from '../../../../../constants';
import { expireToken, getPostParameter } from '../../../../../constants/Helper';
import { useDispatch } from 'react-redux';
import { PostRequestDAO } from '../../../../../DAO';
import DevicePriorityModalView from '../components/DevicePriorityModalView';
import { generateKey } from '../../../../../constants/Utils';
import { useSelector } from 'react-redux';
import LoadingBar from '../../../../../components/LoadingView/loading_bar';
import AlertModal from '../../../../../components/modal/AlertModal';
import { validateMsisdn } from '../../../../../helpers/validateHelper';

var device_update_indempotency = '';

export default function DevicePriorityModalContainer(props) {
            
    const dispatch = useDispatch()
    const { device } = props;
    if(!device) return null;

    const currentLocation = useSelector(state => state.rep.currentLocation);
    const [isLoading, setIsLoading] = useState(false);
    const [modalType, setModalType] = useState('update');
    const loadingBarRef = useRef();
    const alertModalRef = useRef()

    useEffect(() => {
        device_update_indempotency = generateKey();
    }, []);

    const onSubmit = (data) => {
                
        if( validateMsisdn(data?.msisdn) ){
            if(!isLoading){
                setIsLoading(true);
                showLoadingBar();
    
                var userParam = getPostParameter(currentLocation);
                var postData = {
                    ...data ,
                    mode : 'online',
                    user_local_data: userParam.user_local_data,
                }
    
                let primaryText = data?.primary_device == "1" ? "Primry" : "Additional";                         
                                

                PostRequestDAO.find(0, 
                        postData, 
                        "device_update", 
                        "devices/update-device", 
                        device.description, 
                        device.msisdn + "("  + primaryText  +  ")" ,
                        device_update_indempotency                    
                        ).then((res) => {
                            hideLoadingBar();                 
                            setIsLoading(false);                            
                            showAlertModal( "update", res.message);                        
                }).catch((e) => {
                    hideLoadingBar();
                    setIsLoading(false);                
                    expireToken(dispatch, e);
                })   
                
            }    
        }else{
            showAlertModal( "validation", Strings.Complete_Compulsory_Fields);
        }         
    }

    const showLoadingBar = () => {
        if(loadingBarRef.current)
            loadingBarRef.current.showModal();
    }

    const hideLoadingBar = () => {
        if(loadingBarRef.current)
            loadingBarRef.current.hideModal();
    }

    const showAlertModal = ( type , message) => {
        setModalType(type);
        if(alertModalRef.current)
            alertModalRef.current.alert(message)
    }

    const onModalClose = () => {
        if(modalType == "update"){
            props.onButtonAction({type: Constants.actionType.ACTION_CLOSE, value: 0});
        }        
    }
        
    return (
        <View style={{alignSelf:'stretch' , flex:1}}>
            <LoadingBar ref={loadingBarRef}/>
            <AlertModal ref={alertModalRef} onModalClose={onModalClose}/>

            <DevicePriorityModalView                 
                onSubmit={onSubmit}                
                {...props}
            />
        </View>
    )
}