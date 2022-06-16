
import { View, Text , StyleSheet , TextInput} from 'react-native'
import React , { useState , useEffect, useRef} from 'react'
import CModal from '../../../../../components/common/CModal';
import { Constants } from '../../../../../constants';
import StockDetailsContainer from '../container/StockDetailsContainer';
import { value } from 'react-native-extended-stylesheet';

const StockDetailsModal = React.forwardRef((props, ref) => {

    const onButtonAction = data => {
        if (props.onButtonAction) {
          props.onButtonAction(data);
        }
        if (ref) {
          ref.current.hideModal();
        }
    };
    
    const openSignature = (value) => {        
        onButtonAction({ type: Constants.actionType.ACTION_NEXT , value: value });
    }
    const openSwopAtTrader = (value) => {  
        onButtonAction({ type: Constants.actionType.ACTION_NEXT , value: value });
    }
    const openTrader = (value) => {
        onButtonAction({ type: Constants.actionType.ACTION_NEXT , value: value });
    }

    return (
        <CModal
            ref={ref}            
            modalType={Constants.modalType.MODAL_TYPE_BOTTOM}
            closableWithOutsideTouch
            onClear={() => {
                onButtonAction({ type: Constants.actionType.ACTION_FORM_CLEAR });
            }}
            {...props}>
            <StockDetailsContainer
                openSignature={openSignature}            
                openSwopAtTrader={openSwopAtTrader}
                openTrader={openTrader}
                {...props} />
        </CModal>        
    )

});

export default StockDetailsModal;
