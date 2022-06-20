
import React , { useState , useEffect, useRef} from 'react'
import CModal from '../../../../../../components/common/CModal';
import { Constants } from '../../../../../../constants';
import ConsumableSellToStockSignatureView from '../../components/ConsumableSellToStockSignatureView';
import ConsumableSellToTraderSignatureContainer from '../../container/ConsumableSellToTraderSignatureContainer';
import TraderContainer from '../../container/TraderContainer';

const SellToTraderSignatureModal = React.forwardRef((props, ref) => {

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
            <ConsumableSellToTraderSignatureContainer {...props} />
        </CModal>  
    )

});

export default SellToTraderSignatureModal;
