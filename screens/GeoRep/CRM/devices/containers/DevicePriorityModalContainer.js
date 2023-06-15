
import { Platform, View } from 'react-native'
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
    const alertModalRef = useRef();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        device_update_indempotency = generateKey();        
        isValidate(device);
    }, []);


    const onSubmit = (data) => {

        if( isValidate(data) && validateMsisdn(data?.msisdn) ){
            if(!isLoading){
                console.log("submit data" , data);
                if( !isDuplicateData(data) ){

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
                                if(Platform.OS == 'android'){
                                    showAlertModal( "update", res.message);
                                }else{
                                    setTimeout(() => {
                                        showAlertModal( "update", res.message);
                                    }, 500);
                                }                            
                    }).catch((e) => {
                        hideLoadingBar();
                        setIsLoading(false);                
                        expireToken(dispatch, e);
                    })   
                }else{
                    showAlertModal( "", Strings.Stock.Duplicate_Code);
                }               
            }    
        }else{
            showAlertModal( "validation", Strings.Complete_Compulsory_Fields);
        }         
    }

    const isDuplicateData = (data) => {

        if( data?.msn_required == '1' && data?.additional_imei_required == '1'){
            if(data?.imei.trim() === data?.msn.trim() || data?.imei.trim() === data?.additional_imei.trim() || data?.msn.trim() === data?.additional_imei.trim() ){
                return true;
            }
        }else if(data?.msn_required == '1' && data?.additional_imei_required != '1'){
            if(data?.msn === data?.imei){
                return true;
            }
        }else if(data?.msn_required != '1' && data?.additional_imei_required == '1'){
            if(data?.additional_imei === data?.imei){
                return true;
            }
        }
        return false;        
    }    

    const isValidate = (data) => {

        const _errors = {...errors};
        const type1 = data?.additional_imei_required === '1' ? 'imei1' : 'imei';
        const type2 = data?.additional_imei_required === '1' ? 'imei2' : '';
        var isAvailable = true;
        if (data?.imei == '' || data?.imei == undefined) {
          isAvailable = false;
          _errors[type1] = true;
        }
  
        if ( (data?.additional_imei == '' || data?.additional_imei == undefined) && data?.additional_imei_required == '1' ) {
          isAvailable = false;
          _errors['imei2'] = true;
        }
  
        if ( data?.msn == '' || data?.msn == undefined ) {
            if(data?.msn_required == '1'){
                isAvailable = false;
                _errors['msn'] = true;
            }          
        }

        setErrors(_errors);
        return isAvailable;
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
                errors={errors}
                {...props}
            />
        </View>
    )
}