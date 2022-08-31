
import React from 'react'
import CModal from '../../../../../../components/common/CModal';
import { Constants } from '../../../../../../constants';
import StockSignatureContainer from '../../container/StockSignatureContainer';

const StockSignatureModal = React.forwardRef((props, ref) => {

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
            modalType={Constants.modalType.MODAL_TYPE_BOTTOM}
            headerType="center"
            closableWithOutsideTouch
            onClear={() => {
                onButtonAction({ type: Constants.actionType.ACTION_FORM_CLEAR });
            }}
            {...props}>
            <StockSignatureContainer {...props} />
        </CModal>        
    )
});

export default StockSignatureModal;
