import React from 'react';
import {Constants} from '../../../../constants';
import CModal from '../../../common/CModal';
import SKUSelectForm from '../SKUSelectForm';

const SKUSelectFormModal = React.forwardRef((props, ref) => {
  const {questionType, item} = props;
  const onButtonAction = data => {
    if (props.onButtonAction) {
      props.onButtonAction(data);
    }
    if (ref) {
      ref.current.hideModal();
    }
  };
  const title = item.question_text;
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
      {...props}>
      <SKUSelectForm
        {...props}
        questionType={questionType}
        style={{marginTop: 14}}
        onButtonAction={onButtonAction}
      />
    </CModal>
  );
});
export default SKUSelectFormModal;
