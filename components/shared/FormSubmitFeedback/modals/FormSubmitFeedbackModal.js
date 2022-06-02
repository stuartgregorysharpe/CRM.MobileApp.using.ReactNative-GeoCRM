import React from 'react';
import {Constants} from '../../../../constants';
import CModal from '../../../common/CModal';
import FormSubmitFeedbackContainer from '../containers/FormSubmitFeedbackContainer';

const FormSubmitFeedbackModal = React.forwardRef((props, ref) => {
  const {data} = props;
  const form_name = data ? data.form_name : '';
  const onButtonAction = actionData => {
    if (props.onButtonAction) {
      props.onButtonAction(actionData);
    }
    if (ref) {
      ref.current.hideModal();
    }
  };
  const title = `${form_name} Areas for Improvement`;
  return (
    <CModal
      ref={ref}
      title={title}
      modalType={Constants.modalType.MODAL_TYPE_BOTTOM}
      closableWithOutsideTouch
      onClear={() => {
        onButtonAction({
          type: Constants.actionType.ACTION_FORM_CLEAR,
        });
      }}
      onClose={() => {
        onButtonAction({
          type: Constants.actionType.ACTION_CLOSE,
        });
      }}
      hideClear
      {...props}>
      <FormSubmitFeedbackContainer
        {...props}
        style={{marginTop: 14}}
        onButtonAction={onButtonAction}
      />
    </CModal>
  );
});
export default FormSubmitFeedbackModal;
