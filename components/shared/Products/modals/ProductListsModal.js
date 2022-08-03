
import React from 'react';
import { Constants } from '../../../../constants';
import CModal from '../../../common/CModal';
import ProductListsContainer from '../containers/ProductListsContainer';

const ProductListsModal = React.forwardRef((props, ref) => {
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
        //ref.current.hideModal();
        props.onButtonAction(data);
      }      
    }
  };
  
  return (          
    <CModal
      ref={ref}
      modalType={Constants.modalType.MODAL_TYPE_BOTTOM}
      {...props}>
      <ProductListsContainer
        {...props}
        style={{marginTop: 14}}
        onButtonAction={onButtonAction}
      />
    </CModal>
    
  );
});
export default ProductListsModal;
