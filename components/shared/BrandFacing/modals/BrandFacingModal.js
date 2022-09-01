import React from 'react';
import {Constants} from '../../../../constants';
import CModal from '../../../common/CModal';
import BrandFacingView from '../BrandFacingView';

const FormatPriceModal = React.forwardRef((props, ref) => {
  const {questionType} = props;
  const onButtonAction = data => {
    if (props.onButtonAction) {
      props.onButtonAction(data);
    }
    if (ref) {
      ref.current.hideModal();
    }
  };

  const {item} = props;
  if (item.question_text) {
  }
  const title = item.question_text;

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
      <BrandFacingView
        {...props}
        questionType={questionType}
        style={{marginTop: 14}}
        onButtonAction={onButtonAction}
      />
    </CModal>
  );
});
export default FormatPriceModal;
