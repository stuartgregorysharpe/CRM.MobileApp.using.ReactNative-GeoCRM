import { View, Text } from 'react-native'
import React , { useEffect, useState , useCallback } from 'react'
import { expireToken, getPostParameter } from '../../../constants/Helper';
import { getDateTime } from '../../../helpers/formatHelpers';
import {useSelector, useDispatch} from 'react-redux';
import { getLocalData, storeLocalValue } from '../../../constants/Storage';
import { CHECKIN } from '../../../actions/actionTypes';
import HomeCheckOut from '../../../screens/GeoRep/Home/partial/CheckOut';
import SpecificCheckOut from '../../../screens/GeoRep/CRM/checkin/partial/Checkout';
import { PostRequestDAO } from '../../../DAO';
var specificLocationId;



export default function CheckOutViewContainer(props) {

    const { type , currentCall } = props;
    const dispatch = useDispatch()
    const currentLocation = useSelector(state => state.rep.currentLocation);    

    useEffect(() => {
        initData();
    }, []);

    const initData = async() => {        
        specificLocationId = await getLocalData("@specific_location_id");            
    }

    const checkOutLocation = useCallback(
        () => {
            _callCheckOut();
        },
        [],
    );
    
    const _callCheckOut = () => {

        var userParam = getPostParameter(currentLocation);
        var currentTime = getDateTime();
        
        let postData = {
          location_id: specificLocationId,
          checkout_time: currentTime,
          user_local_data: userParam.user_local_data,
        };
                
        PostRequestDAO.find(specificLocationId, postData , 'checkout', 'location-info/check-out').then( async(res) => {            
            await storeLocalValue('@checkin', '0');
            dispatch({ type: CHECKIN, payload: false });
            if(type == "specificInfo"){
                if(props.goBack){
                    props.goBack(res);
                }
            }else{                
            }
        }).catch((e) => {
            console.log("checkout error:" , e);
            expireToken(dispatch, e);
        });
    };

    return (
        <View>
            {
                type == "home" &&
                <HomeCheckOut currentCall={currentCall} _callCheckOut={checkOutLocation} />
            }

            {
                type == "specificInfo" &&
                <SpecificCheckOut _callCheckOut={checkOutLocation} />
            }

        </View>
    )
}