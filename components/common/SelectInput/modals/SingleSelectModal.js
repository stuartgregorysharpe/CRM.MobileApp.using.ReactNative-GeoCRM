import React from 'react';
import {Constants} from '../../../../constants';
import CModal from '../../../common/CModal';
import SingleSelectContainer from '../containers/SingleSelectContainer';

const SingleSelectModal = React.forwardRef((props, ref) => {

  const {modalTitle , mode} = props;

  const onButtonAction = data => {
    if (props.onButtonAction) {
      props.onButtonAction(data);
    }
    if (ref && mode === 'single') {
      ref.current.hideModal();
    }
  };

  return (
    <CModal
      ref={ref}
      title={modalTitle}
      modalType={Constants.modalType.MODAL_TYPE_BOTTOM}
      closableWithOutsideTouch
      onClear={() => {
        onButtonAction({
          type: Constants.actionType.ACTION_FORM_CLEAR,
        });
      }}
      {...props}>
      <SingleSelectContainer
        {...props}
        style={{marginTop: 14}}
        onButtonAction={onButtonAction}
      />
    </CModal>
  );
  
});
export default SingleSelectModal;
