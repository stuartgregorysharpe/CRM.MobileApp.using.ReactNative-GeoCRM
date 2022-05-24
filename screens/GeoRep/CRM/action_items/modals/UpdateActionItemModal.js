import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';

import CModal from '../../../../../components/common/CModal';
import {Constants, Fonts, Colors} from '../../../../../constants';

import UpdateActionFormContainer from '../containers/UpdateActionFormContainer';

const UpdateActionItemModal = React.forwardRef((props, ref) => {
  const [createByText, setCreateByText] = useState('');
  const onButtonAction = data => {
    if (props.onButtonAction) {
      props.onButtonAction(data);
    }
    if (ref) {
      ref.current.hideModal();
    }
  };
  const updateModalInfo = ({createdBy}) => {
    setCreateByText('created by ' + createdBy);
  };
  return (
    <CModal
      ref={ref}
      title={'Update Action Item'}
      modalType={Constants.modalType.MODAL_TYPE_BOTTOM}
      closableWithOutsideTouch
      onShowModal={() => {
        setCreateByText('');
      }}
      hideClear
      onClear={() => {
        onButtonAction({
          type: Constants.actionType.ACTION_FORM_CLEAR,
        });
      }}
      customRightHeaderView={
        <Text style={styles.createdByText}>{createByText}</Text>
      }
      {...props}>
      <UpdateActionFormContainer
        {...props}
        style={{marginTop: 14}}
        onButtonAction={onButtonAction}
        updateModalInfo={updateModalInfo}
      />
    </CModal>
  );
});
const styles = StyleSheet.create({
  createdByText: {
    fontFamily: Fonts.primaryRegular,
    color: Colors.primaryColor,
    fontSize: 12,
    marginTop: 3,
  },
});

export default UpdateActionItemModal;
