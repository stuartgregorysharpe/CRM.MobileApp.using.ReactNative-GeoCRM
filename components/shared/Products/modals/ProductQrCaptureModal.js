import React from 'react';
import { Constants } from '../../../../constants';
import CModal from '../../../common/CModal';
import ProductQrCaptureContainer from '../containers/ProductQrCaptureContainer';


const ProductQrCaptureModal = React.forwardRef((props, ref) => {
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
  };
  return (
    <CModal
      ref={ref}
      modalType={Constants.modalType.MODAL_TYPE_FULL}
      {...props}>
      <ProductQrCaptureContainer
        {...props}
        style={{marginTop: 14}}
        onButtonAction={onButtonAction}
      />
    </CModal>

    
  );
});
export default ProductQrCaptureModal;