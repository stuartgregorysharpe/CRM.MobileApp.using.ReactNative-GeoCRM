import React from 'react';
import {Constants} from '../../constants';
import CModal from './CModal';
import ScanView from './ScanView';

const QRScanModal = React.forwardRef((props, ref) => {
  const {isNotCloseAfterCapture} = props;
  const onButtonAction = data => {
    if (props.onButtonAction) {
      props.onButtonAction(data);
    }
    if (data.type == Constants.actionType.ACTION_CAPTURE) {
      if (!isNotCloseAfterCapture) {
        if (ref) {
          ref.current.hideModal();
        }
      }
    }
  };
  return (
    <CModal
      ref={ref}
      modalType={Constants.modalType.MODAL_TYPE_FULL}
      {...props}>
      <ScanView {...props} onButtonAction={onButtonAction} />
    </CModal>
  );
});
export default QRScanModal;
