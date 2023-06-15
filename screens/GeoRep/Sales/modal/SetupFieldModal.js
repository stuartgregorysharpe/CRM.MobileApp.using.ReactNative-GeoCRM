
import React , { useState } from 'react'
import CModal from '../../../../components/common/CModal';
import { Constants } from '../../../../constants';
import SetupFieldContainer from '../containers/SetupFieldContainer';

const SetupFieldModal = React.forwardRef((props, ref) => {
        
    const [isClear, setIsClear] = useState(false);
    
    const onButtonAction = data => {
        if (props.onButtonAction) {
          props.onButtonAction(data);
        }
        // if (ref) {
        //   ref.current.hideModal();
        // }
    };


    return (        
        <CModal
            ref={ref}                                    
            {...props}>
            <SetupFieldContainer 
                isClear={isClear}                
                updateClear={(flag) => {        
                    if(flag){
                        onButtonAction({ type: Constants.actionType.ACTION_FORM_CLEAR });
                    }
                    setIsClear(flag)
                }}
                {...props} />
        </CModal>        
    )
});


export default SetupFieldModal;
