
import { Platform, View } from 'react-native'
import React , { useState , useEffect , useRef , Keyboard } from 'react'
import { Constants, Strings } from '../../../../../constants';
import AddContactModalView from '../components/AddContactModalView';
import { expireToken, getPostParameter } from '../../../../../constants/Helper';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearLoadingBar, showLoadingBar, showNotification } from '../../../../../actions/notification.action';
import { PostRequestDAO } from '../../../../../DAO';
import { generateKey } from '../../../../../constants/Utils';
import AlertDialog from '../../../../../components/modal/AlertDialog';
import LoadingBar from '../../../../../components/LoadingView/loading_bar';

var add_edit_indempotency = '';

export default function AddContactModalContainer(props) {
    
    const { locationId , pageType , contactInfo } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [isConfirmModal, setIsConfirmModal] = useState(false);
    const [message, setMessage] = useState('');
    const loadingBarRef = useRef(null);

    const dispatch = useDispatch();
    
    const currentLocation = useSelector(state => state.rep.currentLocation);    

    useEffect(() => {
        add_edit_indempotency = generateKey();
    }, []);


    const addData = (value) => {        
        props.onButtonAction({type: Constants.actionType.ACTION_CAPTURE, value: value});
    }
    
    const handleSubmit = (formData) => {
        
        //Keyboard.dismiss();

        if(!isLoading){
            setIsLoading(true);
            
            var userParam = getPostParameter(currentLocation);
            var postData = {...formData , location_id: locationId, user_local_data: userParam.user_local_data};
            if (pageType === 'update' && contactInfo != undefined) {            
                postData = {...postData , contact_id: contactInfo.contact_id};
            }            
            
            loadingBarRef.current.showModal();
            PostRequestDAO.find(0, postData , 'add-edit-contacts' , 'locations/add-edit-contacts' , '' , '' , add_edit_indempotency , null).then((res) => {
                hideLoadingBar();                
                setIsLoading(false);
                if(res.status == Strings.Success){
                    showConfirmModal(res.message);                    
                }

            }).catch((e) => {
                console.log(Strings.Log.Post_Api_Error, e);
                hideLoadingBar();
                setIsLoading(false);
                expireToken(dispatch, e);
            }) 
        }            
    }

    const hideLoadingBar = () => {
        if(loadingBarRef.current){
            loadingBarRef.current.hideModal();
        }
    }
    
    const showConfirmModal = (message) =>{
        setMessage(message);
        if(Platform.OS == 'android'){
            setIsConfirmModal(true)
        }else{
            setTimeout(() => {
                setIsConfirmModal(true);
            }, 500)
        }
    }

    return (
        <View style={{alignSelf:'stretch' , flex:1}}>

            <AlertDialog 
                visible={isConfirmModal}
                message={message}
                onModalClose={() => {
                    setIsConfirmModal(false);
                    setIsLoading(false);
                    if(props.onButtonAction){
                        props.onButtonAction({type: Constants.actionType.ACTION_CLOSE, value: null});
                    }
                }}
            />

            <LoadingBar 
                ref={loadingBarRef}
            />

            <AddContactModalView
                onButtonAction={addData}
                handleSubmit={handleSubmit}     
                {...props}
            />
        </View>
    )
}