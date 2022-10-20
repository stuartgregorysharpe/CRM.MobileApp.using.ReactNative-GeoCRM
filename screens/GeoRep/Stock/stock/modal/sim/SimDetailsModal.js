import React from 'react';
import CModal from '../../../../../../components/common/CModal';
import QRScanModal from '../../../../../../components/common/QRScanModal';
import {Constants} from '../../../../../../constants';
import SimDetailsContainer from '../../container/sim/SimDetailsContainer';

const SimDetailsModal = React.forwardRef((props, ref) => {
  const onButtonAction = data => {
    /*if (
      data.type == Constants.actionType.ACTION_DONE ||
      data.type == Constants.actionType.ACTION_NEXT
    ) {
      if (ref) {
        ref.current.hideModal();
      }
    }*/
    if (props.onButtonAction) {
      props.onButtonAction(data);
    }
  };

  const openSignature = value => {
    onButtonAction({type: Constants.actionType.ACTION_NEXT, value: value});
  };

  return (
    <QRScanModal
      ref={ref}
      isNotCloseAfterCapture
      isPartialDetect={true}
      onButtonAction={onButtonAction}
      onClose={props.onClose}
      showClose={true}
      renderLastScanResultView={() => {
        return (
          <SimDetailsContainer
            {...props}
            openSignature={openSignature}
            onButtonAction={onButtonAction}
          />
        );
      }}
    />
  );
});
export default SimDetailsModal;
