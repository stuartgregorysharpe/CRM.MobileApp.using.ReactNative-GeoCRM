
import React , { useState , useEffect, useRef} from 'react'
import CModal from '../../../../../components/common/CModal';
import { Constants } from '../../../../../constants';
import SearchLocationContainer from '../container/SearchLocationContainer';

const SearchLocationModal = React.forwardRef((props, ref) => {

    const onButtonAction = data => {
        if (props.onButtonAction) {
          props.onButtonAction(data);
        }        
        if (ref) {
          ref.current.hideModal();
        }
    };
    
    const onSubmit = (stockType , locationId) => {        
        onButtonAction({ type: Constants.actionType.ACTION_NEXT , value: {stockType: stockType, locationId:locationId} });
    }

    return (
        <CModal
            ref={ref}            
            clearText={"Back"}
            modalType={Constants.modalType.MODAL_TYPE_BOTTOM}
            closableWithOutsideTouch
            onClear={() => {
                onButtonAction({ type: Constants.actionType.ACTION_FORM_CLEAR });
            }}
            {...props}>
            <SearchLocationContainer  onSubmit={onSubmit} {...props} />
        </CModal>        
    )

});

export default SearchLocationModal;
