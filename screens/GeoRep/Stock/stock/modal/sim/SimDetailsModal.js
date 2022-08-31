
import React from 'react';
import CModal from '../../../../../../components/common/CModal';
import { Constants } from '../../../../../../constants';
import SimDetailsContainer from '../../container/sim/SimDetailsContainer';

const SimDetailsModal = React.forwardRef((props, ref) => {
  
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

  const openSignature = (value) => {  
    onButtonAction({ type: Constants.actionType.ACTION_NEXT , value: value });
  }
  
  return (
    <CModal
      ref={ref}
      modalType={Constants.modalType.MODAL_TYPE_FULL}     
      {...props}>
      <SimDetailsContainer
        {...props}
        style={{marginTop: 14}}
        openSignature={openSignature}
        onButtonAction={onButtonAction}
      />
    </CModal>
  );
});
export default SimDetailsModal;
