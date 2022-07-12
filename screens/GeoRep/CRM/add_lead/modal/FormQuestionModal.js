
import React from 'react';
import CModal from '../../../../../components/common/CModal';
import { Constants } from '../../../../../constants';
import { FormQuestions } from '../../../Forms/questions/FormQuestions';
import FormQuestionContainer from '../containers/FormQuestionContainer';
import ViewListsContainer from '../containers/ViewListsContainer';

const FormQuestionModal = React.forwardRef((props, ref) => {

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
    if(data.type ==  Constants.actionType.ACTION_CLOSE) {
      if (ref) {
        props.onButtonAction(data);
      }      
    }
  };

  return (    
    <CModal
      ref={ref}
      modalType={Constants.modalType.MODAL_TYPE_FULL}
      {...props}>
      <FormQuestionContainer
        {...props}
        style={{marginTop: 14}}
        onButtonAction={onButtonAction}
      />
    </CModal>
        
  );
});
export default FormQuestionModal;
