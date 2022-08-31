
import { View } from 'react-native'
import React from 'react'
import { SubmitButton } from '../../../../../components/shared/SubmitButton';
import ViewListsView from '../components/ViewListsView';
import { Constants, Strings } from '../../../../../constants';

export default function ViewListsContainer(props) {

    const {selectedLists , allocateDevices} = props;

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
            <SubmitButton style={{marginHorizontal:10}} title={Strings.Stock.Allocate_Device} onSubmit={allocateDevices}/>                     
        </View>
    )
}