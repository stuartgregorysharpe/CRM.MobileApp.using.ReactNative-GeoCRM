
import { View } from 'react-native'
import React from 'react'
import { Constants, Strings } from '../../../../../constants';
import AddContactModalView from '../components/AddContactModalView';
import { expireToken, getPostParameter } from '../../../../../constants/Helper';
import { useSelector } from 'react-redux';
import { postApiRequest } from '../../../../../actions/api.action';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../../../../actions/notification.action';

export default function AddContactModalContainer(props) {
    
    const { locationId , pageType , contactInfo } = props;
    const dispatch = useDispatch();

    const currentLocation = useSelector(state => state.rep.currentLocation);    

    const addData = (value) => {        
        props.onButtonAction({type: Constants.actionType.ACTION_CAPTURE, value: value});
    }
    
    const handleSubmit = (formData) => {
        
        var userParam = getPostParameter(currentLocation);
        var postData = {...formData , location_id: locationId, user_local_data: userParam.user_local_data};
        if (pageType === 'update' && contactInfo != undefined) {            
            postData = {...postData , contact_id: contactInfo.contact_id};
        }
        console.log("post data" ,postData)
        postApiRequest("locations/add-edit-contacts", postData).then((res) => {
            console.log("res", res)
            if(res.status == Strings.Success){
                dispatch(showNotification({type:'success' ,message: res.message, buttonText:'Ok' }));
                if(props.onButtonAction){
                    props.onButtonAction({type: Constants.actionType.ACTION_CLOSE, value: null});
                }
                
            }
        }).catch((e) => {
            console.log(Strings.Log.Post_Api_Error, e);
            expireToken(dispatch, e);
        })        
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