import { View, Text } from 'react-native'
import React , { useEffect, useState , useCallback } from 'react'
import { getPostParameter } from '../../../constants/Helper';
import { getDateTime } from '../../../helpers/formatHelpers';
import {useSelector, useDispatch} from 'react-redux';
import { getLocalData, storeLocalValue } from '../../../constants/Storage';
import { postApiRequest } from '../../../actions/api.action';
import { CHECKIN } from '../../../actions/actionTypes';
import HomeCheckOut from '../../../screens/GeoRep/Home/partial/CheckOut';
import SpecificCheckOut from '../../../screens/GeoRep/CRM/checkin/partial/Checkout';
import PostLocationCheckOut from '../../../DAO/PostLocationCheckOut';


export default function CheckOutViewContainer(props) {

    const { type , currentCall } = props;
    const dispatch = useDispatch()
    const currentLocation = useSelector(state => state.rep.currentLocation); 
    const [locationId, setLocationId] = useState(0);

    useEffect(() => {
        initData();
    }, []);

    const initData = async() => {        
        var specificLocationId = await getLocalData("@specific_location_id");    
        setLocationId(specificLocationId);
    }

    const checkOutLocation = useCallback(
        () => {
            _callCheckOut();
        },
        [locationId],
    );
    
    const _callCheckOut = () => {

        var userParam = getPostParameter(currentLocation);
        var currentTime = getDateTime();
        
        let postData = {
          location_id: locationId,
          checkout_time: currentTime,
          user_local_data: userParam.user_local_data,
        };
        
        PostLocationCheckOut.find(locationId, postData).then( async(res) => {
            console.log("res ponse", res);
            await storeLocalValue('@checkin', '0');
            dispatch({ type: CHECKIN, payload: false });
            if(type == "specificInfo"){
                if(props.goBack){
                    props.goBack(res);
                }
            }else{
                
            }
        });        
    };

    return (
        <View>
            {
                type == "home" &&
                <HomeCheckOut currentCall={currentCall} _callC heckOut={checkOutLocation} />
            }

            {
                type == "specificInfo" &&
                <SpecificCheckOut _callCheckOut={checkOutLocation} />
            }

        </View>
    )
}