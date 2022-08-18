
import React from 'react';
import CModal from '../../../../../../components/common/CModal';
import { Constants } from '../../../../../../constants';
import SimScanContainer from '../../container/SimScanContainer';


const SimScanModal = React.forwardRef((props, ref) => {
  
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
      <SimScanContainer
        {...props}
        style={{marginTop: 14}}
        onButtonAction={onButtonAction}
      />
    </CModal>
  );
});
export default SimScanModal;
