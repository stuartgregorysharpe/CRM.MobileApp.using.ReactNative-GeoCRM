import React from 'react'
import { Constants } from '../../../constants';
import CModal from '../../common/CModal.android';
import AddToCalendarContainer from './components/AddToCalendarContainer';


const AddToCalendarModal = React.forwardRef((props, ref) => {
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
            title="Add To Calendar"    
            modalType={Constants.modalType.MODAL_TYPE_BOTTOM}
            closableWithOutsideTouch
            onClear={() => {
                onButtonAction({ type: Constants.actionType.ACTION_FORM_CLEAR });
            }}
            {...props}>

            <AddToCalendarContainer {...props} />
                        
        </CModal>        
    )
});



export default AddToCalendarModal;
