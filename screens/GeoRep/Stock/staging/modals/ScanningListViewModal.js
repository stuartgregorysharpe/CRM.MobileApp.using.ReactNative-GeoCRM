import React from 'react';
import {TouchableOpacity} from 'react-native';
import CModal from '../../../../../components/common/CModal';
import SvgIcon from '../../../../../components/SvgIcon';
import {Constants} from '../../../../../constants';
import ScanningListViewContainer from '../containers/ScanningListViewContainer';

const ScanningListViewModal = React.forwardRef((props, ref) => {
  const onButtonAction = data => {
    if (props.onButtonAction) {
      props.onButtonAction(data);
    }
    closeModal();
  };
  const closeModal = () => {
    if (ref) {
      ref.current.hideModal();
    }
  };
  const renderCloseIcon = () => {
    return (
      <TouchableOpacity onPress={closeModal}>
        <SvgIcon icon="Close" width="22" height="22" style={{marginLeft: 10}} />
      </TouchableOpacity>
    );
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
      customRightHeaderView={renderCloseIcon()}
      {...props}>
      <ScanningListViewContainer {...props} />
    </CModal>
  );
});

export default ScanningListViewModal;
