
import React , { useState , useEffect, useRef} from 'react'
import CModal from '../../../../../components/common/CModal';
import { Constants } from '../../../../../constants';
import StockSignatureContainer from '../container/StockSignatureContainer';
import SwopAtTraderContainer from '../container/SwopAtTraderContainer';
import TraderContainer from '../container/TraderContainer';

const TraderModal = React.forwardRef((props, ref) => {

    const onButtonAction = data => {
        if (props.onButtonAction) {
          props.onButtonAction(data);
        }
        if (ref) {
          ref.current.hideModal();
        }
    };

    return (        
        <CModal
            ref={ref}
            clearText="Back"
            modalType={Constants.modalType.MODAL_TYPE_BOTTOM}            
            closableWithOutsideTouch
            onClear={() => {
                onButtonAction({ type: Constants.actionType.ACTION_FORM_CLEAR });
            }}
            {...props}>
            <TraderContainer {...props} />
        </CModal>  
    )

});

export default TraderModal;
