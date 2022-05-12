import React from 'react';
import {useTranslation} from 'react-i18next';
import {Constants} from '../../../../constants';
import CModal from '../../../common/CModal';
import {getQuestionTitle} from '../helper';
import SKUCountForm from '../SKUCountForm';

const SKUCountFormModal = React.forwardRef((props, ref) => {
  const {questionType} = props;
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
      title={getQuestionTitle(questionType)}
      modalType={Constants.modalType.MODAL_TYPE_BOTTOM}
      onClear={() => {
        onButtonAction({
          type: Constants.actionType.ACTION_FORM_CLEAR,
        });
      }}
      {...props}>
      <SKUCountForm
        {...props}
        questionType={questionType}
        style={{marginTop: 14}}
        onButtonAction={onButtonAction}
      />
    </CModal>
  );
});
export default SKUCountFormModal;
