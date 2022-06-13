import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';

import CModal from '../../../../../components/common/CModal';
import {Constants, Fonts, Colors} from '../../../../../constants';
import { whiteLabel } from '../../../../../constants/Colors';

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
  
  const {actionItemType} = props;
  const getModalTitle = actionItemType => {
    if (
      actionItemType == Constants.actionItemType.ACTION_ITEM_TYPE_ACTION ||
      actionItemType == Constants.actionItemType.ACTION_ITEM_TYPE_TASK
    ) {
      return 'Update Action Item';
    } else if (
      actionItemType == Constants.actionItemType.ACTION_ITEM_TYPE_RED_FLAG_CHURN
    ) {
      return 'Red Flag: Churn';
    } else if (
      actionItemType ==
      Constants.actionItemType.ACTION_ITEM_TYPE_RED_FLAG_DECLINE
    ) {
      return 'Red Flag: Decline';
    }
    return 'Update Action Item';
  };

  const title = getModalTitle(actionItemType);

  const updateModalInfo = ({createdBy}) => {
    setCreateByText('Created by: ' + createdBy);
  };
  return (
    <CModal
      ref={ref}
      title={title}
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
    color: whiteLabel().mainText,
    fontSize: 12,
    marginTop: 3,
  },
});

export default UpdateActionItemModal;
