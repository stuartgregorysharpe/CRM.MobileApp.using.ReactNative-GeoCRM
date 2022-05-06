import React from 'react';
import {useTranslation} from 'react-i18next';
import {Constants} from '../../../../constants';
import CModal from '../../../common/CModal';
import SKUCountForm from '../SKUCountForm';

const SKUCountFormModal = React.forwardRef((props, ref) => {
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
      title={'SKU Count'}
      modalType={Constants.modalType.MODAL_TYPE_BOTTOM}
      {...props}>
      <SKUCountForm
        {...props}
        style={{marginTop: 14}}
        onButtonAction={onButtonAction}
      />
    </CModal>
  );
});
export default SKUCountFormModal;
