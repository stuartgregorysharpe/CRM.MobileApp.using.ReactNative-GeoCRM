import React from 'react';
import CModal from '../../../../../components/common/CModal';
import {Constants} from '../../../../../constants';

import AddActionFormContainer from '../containers/AddActionFormContainer';

const AddActionItemModal = React.forwardRef((props, ref) => {
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
      title={'Add Action Item'}
      modalType={Constants.modalType.MODAL_TYPE_BOTTOM}
      closableWithOutsideTouch
      onClear={() => {
        onButtonAction({
          type: Constants.actionType.ACTION_FORM_CLEAR,
        });
      }}
      {...props}>
      <AddActionFormContainer
        {...props}
        style={{marginTop: 14}}
        onButtonAction={onButtonAction}
      />
    </CModal>
  );
});
export default AddActionItemModal;
