
import React , { useState } from 'react'
import CModal from '../../../../components/common/CModal';
import { Constants } from '../../../../constants';
import SimCardReportContainer from './containers/SimCardReportContainer';

const SimCardReportModal = React.forwardRef((props, ref) => {

    const [title, setTitle] = useState("Add Lead");

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
            title={title}
            modalType={Constants.modalType.MODAL_TYPE_BOTTOM}
            closableWithOutsideTouch
           
            onClear={() => {
                onButtonAction({ type: Constants.actionType.ACTION_FORM_CLEAR });
            }}
            {...props}>

            <SimCardReportContainer {...props}  />

        </CModal>        
    )
});

export default SimCardReportModal;
