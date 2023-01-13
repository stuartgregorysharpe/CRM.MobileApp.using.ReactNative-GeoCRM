import React from 'react';
import CModal from '../../../../../components/common/CModal';
import {Constants} from '../../../../../constants';
import ViewOfflineSyncModalContainer from '../containers/ViewOfflineSyncModalContainer';
import {View, TouchableOpacity, Platform} from 'react-native';
import SvgIcon from '../../../../../components/SvgIcon';

const ViewOfflineSyncModal = React.forwardRef((props, ref) => {
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
      hideClear={true}
      modalType={Constants.modalType.MODAL_TYPE_BOTTOM}
      closableWithOutsideTouch
      onClear={() => {
        onButtonAction({type: Constants.actionType.ACTION_FORM_CLEAR});
      }}
      {...props}>
      <ViewOfflineSyncModalContainer {...props} />
    </CModal>
  );
});

export default ViewOfflineSyncModal;
