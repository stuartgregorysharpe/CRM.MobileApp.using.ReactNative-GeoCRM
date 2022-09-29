import React from 'react';
import {Constants} from '../../../../constants';
import CModal from '../../../common/CModal';
import SKUScanContainer from '../containers/SKUScanContainer';

const SKUCaptureModal = React.forwardRef((props, ref) => {
  const {item} = props;
  const onButtonAction = data => {
    if (props.onButtonAction) {
      props.onButtonAction(data);
    }
    if (data.type == Constants.actionType.ACTION_DONE) {
      if (ref) {
        ref.current.hideModal();
      }
    }
  };
  return (
    <CModal
      ref={ref}
      modalType={Constants.modalType.MODAL_TYPE_FULL}
      {...props}>
      <SKUScanContainer {...props} onButtonAction={onButtonAction} />
    </CModal>
  );
});
export default SKUCaptureModal;
