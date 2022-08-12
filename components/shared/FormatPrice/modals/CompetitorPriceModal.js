import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Constants} from '../../../../constants';
import CModal from '../../../common/CModal';
import SvgIcon from '../../../SvgIcon';
import CompetitorView from '../CompetitorView';

const CompetitorPriceModal = React.forwardRef((props, ref) => {
  const {questionType} = props;
  const onButtonAction = data => {
    if (props.onButtonAction) {
      props.onButtonAction(data);
    }
    if (ref) {
      ref.current.hideModal();
    }
  };

  const {title} = props;
  const renderRightPart = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          ref.current.hideModal();
        }}>
        <SvgIcon icon="Close" width="20" height="20" />
      </TouchableOpacity>
    );
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
      hideClear
      customRightHeaderView={renderRightPart()}
      {...props}>
      <CompetitorView
        {...props}
        questionType={questionType}
        style={{marginTop: 14}}
        onButtonAction={onButtonAction}
      />
    </CModal>
  );
});
export default CompetitorPriceModal;
