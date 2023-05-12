
import React , { useState , useEffect, useRef } from 'react'
import CModal from '../../../../../components/common/CModal';
import { Constants } from '../../../../../constants';
import DevicePriorityModalContainer from '../containers/DevicePriorityModalContainer';

const DevicePriorityModal = React.forwardRef((props, ref) => {

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
            hideClear={true}            
            modalType={Constants.modalType.MODAL_TYPE_BOTTOM}            
            closableWithOutsideTouch
            onClear={() => {
                onButtonAction({ type: Constants.actionType.ACTION_FORM_CLEAR });
            }}
            {...props}>
            <DevicePriorityModalContainer {...props} />
        </CModal>  
    )

});

export default DevicePriorityModal;
