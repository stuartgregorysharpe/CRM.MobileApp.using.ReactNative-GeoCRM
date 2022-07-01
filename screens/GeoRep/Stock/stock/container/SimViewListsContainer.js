
import { View } from 'react-native'
import React , {useEffect, useState , useRef} from 'react'
import { Constants } from '../../../../../constants';
import SimViewListsView from '../components/SimViewListsView';

export default function SimViewListsContainer(props) {
    
    const addData = (value) => {    
        props.onButtonAction({type: Constants.actionType.ACTION_CAPTURE, value: value});
    }
       
    const removeCode = (value) => {
        props.onButtonAction({type: Constants.actionType.ACTION_REMOVE, value: value});   
    }

    const addStock = () => {        
        props.onButtonAction({type: Constants.actionType.ACTION_DONE, value: 0});   
    }

    return (
        <View style={{alignSelf:'stretch' , flex:1}}>
            <SimViewListsView
                onButtonAcstion={addData}            
                removeCode={(value) =>removeCode(value)}
                addStock={() => addStock()}
                {...props}
            />
        </View>
    )
}