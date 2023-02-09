
import React , { useState , useEffect, useRef} from 'react'
import { Constants } from '../../../constants';
import CModal from '../../common/CModal';

import LoadingBarContainer from './container/LoadingBarContainer';

const LoadingBar = React.forwardRef((props, ref) => {

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
            hideDivider={true}
            modalType={Constants.modalType.MODAL_TYPE_CENTER}
            backButtonDisabled={true}
            closableWithOutsideTouch={false}            
            onClear={() => {
                onButtonAction({ type: Constants.actionType.ACTION_FORM_CLEAR });
            }}
            {...props}>
            <LoadingBarContainer {...props} />
        </CModal>  
    )

});

export default LoadingBar;
