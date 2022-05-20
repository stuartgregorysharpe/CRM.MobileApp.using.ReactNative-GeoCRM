import React from 'react';
import { Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import CModal from '../../../../../components/common/CModal';
import { Constants } from '../../../../../constants';

const OdometerReadingModal = React.forwardRef((props, ref) => {
  const {title} = props;
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
      title={title}
      closableWithOutsideTouch
      modalType={Constants.modalType.MODAL_TYPE_BOTTOM}
      onClear={() => {
        onButtonAction({
          type: Constants.actionType.ACTION_FORM_CLEAR,
        });
      }}
      {...props}>      
      
    </CModal>
  );
});

export default OdometerReadingModal;
