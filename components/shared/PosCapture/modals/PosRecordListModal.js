import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Constants} from '../../../../constants';
import CModal from '../../../common/CModal';
import SvgIcon from '../../../SvgIcon';
import PosRecordList from '../components/PosRecordList';

const PosRecordListModal = React.forwardRef((props, ref) => {
  const {item} = props;
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
      hideClear
      title="Point of Sale Record"
      closableWithOutsideTouch
      customRightHeaderView={renderCloseIcon()}
      modalType={Constants.modalType.MODAL_TYPE_BOTTOM}
      {...props}>
      <PosRecordList {...props} onButtonAction={onButtonAction} />
    </CModal>
  );
});
export default PosRecordListModal;
