import React from 'react';
import {Constants} from '../../../../constants';
import CModal from '../../../common/CModal';
import ContactEmailContainer from '../containers/ContactEmailContainer';
import SingleSelectContainer from '../containers/SingleSelectContainer';

const ContactEmailModal = React.forwardRef((props, ref) => {

  const {modalTitle , mode} = props;

  const onButtonAction = data => {
    if (props.onButtonAction) {
      props.onButtonAction(data);
    }
    if (ref && data.type ===  Constants.actionType.ACTION_CLOSE ) {
      ref.current.hideModal();
    }
  };

  return (
    <CModal
      ref={ref}
      title={modalTitle}
      modalType={Constants.modalType.MODAL_TYPE_BOTTOM}
      closableWithOutsideTouch
      onClear={() => {
        onButtonAction({
          type: Constants.actionType.ACTION_FORM_CLEAR,
        });
      }}
      {...props}>

      <ContactEmailContainer
        {...props}
        style={{marginTop: 14}}
        onButtonAction={onButtonAction}
      />
      
    </CModal>
  );
  
});

export default ContactEmailModal;
