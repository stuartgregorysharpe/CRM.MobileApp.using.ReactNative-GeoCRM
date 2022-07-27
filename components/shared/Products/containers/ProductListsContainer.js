
import { Platform, View } from 'react-native'
import React , {useEffect, useState , useRef} from 'react'
import ProductListsView from '../components/ProductListsView';
import { Constants } from '../../../../constants';
import ProductReturnListsView from '../components/ProductReturnListsView';

export default function ProductListsContainer(props) {
    
    const { questionType } = props;

    const addData = (value) => {    
        props.onButtonAction({type: Constants.actionType.ACTION_CAPTURE, value: value});
    }
    
    
    const removeProduct = (value) => {
        props.onButtonAction({type: Constants.actionType.ACTION_REMOVE, value: value});   
    }

    const onSave = () => {        
        props.onButtonAction({type: Constants.actionType.ACTION_DONE, value: 0});   
    }

    return (
        <View style={{alignSelf:'stretch' , flex:1 , marginBottom: Platform.OS == 'android' ? 0 : 30}}>

            {
                questionType === Constants.questionType.FORM_TYPE_PRODUCT_RETURN && 
                <ProductReturnListsView
                    onButtonAcstion={addData}            
                    removeProduct={(item) =>removeProduct(item)}
                    onSave={() => onSave()}
                    {...props}
                />
            }

            {
                questionType != Constants.questionType.FORM_TYPE_PRODUCT_RETURN && 
                <ProductListsView
                    onButtonAcstion={addData}            
                    removeProduct={(item) =>removeProduct(item)}
                    onSave={() => onSave()}
                    {...props}
                />
            }


            
        </View>
    )
}