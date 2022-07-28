import React from 'react';
import {Constants} from '../../constants';
import CModal from '../common/CModal';
import FilterView from '../FilterView';

const LocationFilterModal = React.forwardRef((props, ref) => {
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
      {...props}>
      <FilterView
        {...props}
        onClose={() => {
          onButtonAction({type: Constants.actionType.ACTION_CLOSE});
        }}
      />
    </CModal>
  );
});

export default LocationFilterModal;
