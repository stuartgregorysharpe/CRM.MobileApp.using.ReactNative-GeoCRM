
import { View, Text , StyleSheet , TextInput} from 'react-native'
import React , { useState , useEffect, useRef} from 'react'
import CModal from '../../../../../components/common/CModal';
import { Constants } from '../../../../../constants';
import StockDetailsContainer from '../container/StockDetailsContainer';

const StockDetailsModal = React.forwardRef((props, ref) => {

    const onButtonAction = data => {
        if (props.onButtonAction) {
          props.onButtonAction(data);
        }
        if (ref) {
          ref.current.hideModal();
        }
    };
    
    const openSignature = () => {
        onButtonAction({ type: Constants.actionType.ACTION_NEXT });
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
            <StockDetailsContainer openSignature={openSignature} {...props} />
        </CModal>        
    )

});

export default StockDetailsModal;
