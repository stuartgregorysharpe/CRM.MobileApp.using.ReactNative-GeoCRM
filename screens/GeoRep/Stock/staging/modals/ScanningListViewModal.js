import React from 'react';
import CModal from '../../../../../components/common/CModal';
import {Constants} from '../../../../../constants';
import ScanningListViewContainer from '../containers/ScanningListViewContainer';

const ScanningListViewModal = React.forwardRef((props, ref) => {
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
      hideClear
      onClose={() => {
        onButtonAction({type: Constants.actionType.ACTION_CLOSE});
      }}
      {...props}>
      <ScanningListViewContainer {...props} />
    </CModal>
  );
});

export default ScanningListViewModal;
