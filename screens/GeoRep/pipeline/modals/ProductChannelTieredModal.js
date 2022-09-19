import React from 'react';
import CModal from '../../../../components/common/CModal';
import {Constants} from '../../../../constants';

import ProductChannelTieredContainer from '../containers/ProductChannelTieredContainer';

const ProductChannelTieredModal = React.forwardRef((props, ref) => {
  const onButtonAction = data => {
    if (props.onButtonAction) {
      props.onButtonAction(data);
    }
    if (ref) {
      ref.current.hideModal();
    }
  };

  const title = 'Products';

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
      <ProductChannelTieredContainer
        {...props}
        style={{marginTop: 14}}
        onButtonAction={onButtonAction}
      />
    </CModal>
  );
});
export default ProductChannelTieredModal;
