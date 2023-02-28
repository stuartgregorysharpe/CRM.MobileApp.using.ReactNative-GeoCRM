
import React from 'react';
import CModal from '../../../../components/common/CModal';
import { Constants } from '../../../../constants';
import CalendarEditDeleteModalContainer from '../containers/CalendarEditDeleteModalContainer';

const CalendarEditDeleteModal = React.forwardRef((props, ref) => {

  const onButtonAction = data => {
    if (props.onButtonAction) {
      props.onButtonAction(data);
    }
    if (data.type == Constants.actionType.ACTION_DONE) {
      if (ref) {
        ref.current.hideModal();
      }
    }
    if(data.type ==  Constants.actionType.ACTION_CLOSE) {
      if (ref) {
        props.onButtonAction(data);
      }      
    }
  };

  return (
    <CModal
      ref={ref}
      modalType={Constants.modalType.MODAL_TYPE_BOTTOM}
      {...props}>
      <CalendarEditDeleteModalContainer
          {...props}
          style={{marginTop: 14}}
          onButtonAction={onButtonAction}
      />
    </CModal>
        
  );
});

export default CalendarEditDeleteModal;
