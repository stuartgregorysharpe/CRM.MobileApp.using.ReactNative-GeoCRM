
import { View } from 'react-native'
import React , { useState , useEffect } from 'react'
import { Constants, Strings } from '../../../../../constants';
import AddContactModalView from '../components/AddContactModalView';
import { expireToken, getPostParameter } from '../../../../../constants/Helper';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearLoadingBar, showLoadingBar, showNotification } from '../../../../../actions/notification.action';
import { PostRequestDAO } from '../../../../../DAO';
import { generateKey } from '../../../../../constants/Utils';

var add_edit_indempotency = '';

export default function AddContactModalContainer(props) {
    
    const { locationId , pageType , contactInfo } = props;
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const currentLocation = useSelector(state => state.rep.currentLocation);    

    useEffect(() => {
        add_edit_indempotency = generateKey();
    }, []);


    const addData = (value) => {        
        props.onButtonAction({type: Constants.actionType.ACTION_CAPTURE, value: value});
    }
    
    const handleSubmit = (formData) => {
        
        if(!isLoading){
            setIsLoading(true);
            dispatch(showLoadingBar({'type' : 'loading'}));
            var userParam = getPostParameter(currentLocation);
            var postData = {...formData , location_id: locationId, user_local_data: userParam.user_local_data};
            if (pageType === 'update' && contactInfo != undefined) {            
                postData = {...postData , contact_id: contactInfo.contact_id};
            }
            console.log("post data" ,postData);

            PostRequestDAO.find(0, postData , 'add-edit-contacts' , 'locations/add-edit-contacts' , '' , '' , add_edit_indempotency).then((res) => {
                console.log("res", res)
                setIsLoading(false);
                dispatch(clearLoadingBar());
                if(res.status == Strings.Success){
                    dispatch(showNotification({type:'success' ,message: res.message, buttonText:'Ok' }));
                    if(props.onButtonAction){
                        props.onButtonAction({type: Constants.actionType.ACTION_DONE, value: null});
                    }                
                }
            }).catch((e) => {
                console.log(Strings.Log.Post_Api_Error, e);
                setIsLoading(false);
                dispatch(clearLoadingBar());
                expireToken(dispatch, e);
            })
 
        }
            
    }

    return (
        <View style={{alignSelf:'stretch' , flex:1}}>
            <AddContactModalView                
                onButtonAction={addData}
                handleSubmit={handleSubmit}     
                {...props}
            />
        </View>
    )
}