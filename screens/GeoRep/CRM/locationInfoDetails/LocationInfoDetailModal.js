import React from 'react';
import CModal from '../../../../components/common/CModal';
import {Constants} from '../../../../constants';
import {LocationInfoDetails} from './LocationInfoDetails';

const LocationInfoDetailModal = React.forwardRef((props, ref) => {
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
      closableWithOutsideTouch
      hideClose
      onClear={() => {
        onButtonAction({type: Constants.actionType.ACTION_FORM_CLEAR});
      }}
      onClose={() => {
        onButtonAction({type: Constants.actionType.ACTION_CLOSE});
      }}
      {...props}>
      <LocationInfoDetails {...props} isModal={true} />
    </CModal>
  );
});

export default LocationInfoDetailModal;
