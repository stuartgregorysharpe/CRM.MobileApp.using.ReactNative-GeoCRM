import React from 'react';
import {Constants} from '../../../../constants';
import CModal from '../../../common/CModal';
import PosCaptureForm from '../PosCaptureForm';

const PosCaptureFormModal = React.forwardRef((props, ref) => {
  const {item} = props;
  const onButtonAction = data => {
    if (props.onButtonAction) {
      props.onButtonAction(data);
    }
    if (
      data.type == Constants.actionType.ACTION_FORM_SUBMIT ||
      data.type == Constants.actionType.ACTION_FORM_CLEAR
    ) {
      if (ref) {
        ref.current.hideModal();
      }
    }
  };
  const title = item.question_text;
  return (
    <CModal
      ref={ref}
      title={title}
      modalType={Constants.modalType.MODAL_TYPE_BOTTOM}
      closableWithOutsideTouch
      onClear={() => {
        onButtonAction({
          type: Constants.actionType.ACTION_FORM_CLEAR,
        });
      }}
      {...props}>
      <PosCaptureForm {...props} onButtonAction={onButtonAction} />
    </CModal>
  );
});
export default PosCaptureFormModal;
