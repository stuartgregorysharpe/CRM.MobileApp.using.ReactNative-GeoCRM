import React from 'react'
import { Constants } from '../../../constants';
import CModal from '../../common/CModal.android';
import CheckinRingFenceContainer from './containers/CheckinRingFenceContainer';

const CheckinRingFenceModal = React.forwardRef((props, ref) => {

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
            modalType={Constants.modalType.MODAL_TYPE_CENTER}
            hideDivider
            closableWithOutsideTouch
            onClear={() => {
                onButtonAction({ type: Constants.actionType.ACTION_FORM_CLEAR });
            }}
            
            {...props}>

            <CheckinRingFenceContainer {...props} />
                        
        </CModal>        
    )
});

export default CheckinRingFenceModal;
