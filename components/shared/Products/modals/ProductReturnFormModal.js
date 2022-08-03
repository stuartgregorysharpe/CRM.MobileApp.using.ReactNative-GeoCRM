import React , { useRef } from 'react';
import {Constants} from '../../../../constants';
import CCircleButton from '../../../common/CCircleButton';
import CModal from '../../../common/CModal';
import ProductReturnFormContainer from '../containers/ProductReturnFormContainer';

const ProductReturnFormModal = React.forwardRef((props, ref) => {

  const {questionType, item} = props;
  const productFormRef = useRef(null);
  const onButtonAction = data => {
    
    if (props.onButtonAction) {
      props.onButtonAction(data);
    }
    if (ref) {
      ref.current.hideModal();
    }
  };
  const title = item.question_text;

  const viewLists = () => {    
    productFormRef.current.openViewLists();
  }
  
  const renderViewLists = () => {
    return <CCircleButton onClick={() => viewLists() } title="View Returns" icon="Check_List_Active"></CCircleButton>
  }
  
  return (
    <CModal
      ref={ref}
      title={"Product"}
      hideClear={true}    
      customRightHeaderView={renderViewLists()}
      modalType={Constants.modalType.MODAL_TYPE_BOTTOM}
      closableWithOutsideTouch
      onClear={() => {
        onButtonAction({
          type: Constants.actionType.ACTION_FORM_CLEAR,
        });
      }}
      onButtonAction={onButtonAction}      
      {...props}>
      <ProductReturnFormContainer 
        onSave={onButtonAction}
        ref={productFormRef} {...props} />
    </CModal>
  );
});

export default ProductReturnFormModal;
