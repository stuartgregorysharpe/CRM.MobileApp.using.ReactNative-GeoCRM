
import { View } from 'react-native'
import React , {useEffect, useState , useRef} from 'react'
import { SubmitButton } from '../../../../../components/shared/SubmitButton';
import ViewListsView from '../components/ViewListsView';
import { Constants } from '../../../../../constants';
import SvgIcon from '../../../../../components/SvgIcon';

export default function ViewListsContainer(props) {

    const {selectedLists , allocateDevices} = props;
    var isMount = true;
    useEffect(() => {
        
        return () =>{
            isMount =  false;
        }
    }, []);

    const removeDevice = (item) => {
        props.onButtonAction({type: Constants.actionType.ACTION_REMOVE , value: item});        
    }

 

    return (
        <View style={{alignSelf:'stretch' , flex:1}}>
            
            <ViewListsView 
                stockItems={selectedLists}
                onItemSelected={(item) =>onItemSelected(item)}
                removeDevice={removeDevice}
                
                {...props}
            />

            <SubmitButton style={{marginHorizontal:10}} title={"Allocate Devices"} onSubmit={allocateDevices}/>
                     
        </View>
    )
}