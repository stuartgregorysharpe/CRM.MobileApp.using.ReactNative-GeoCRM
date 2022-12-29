import React, {useState} from 'react';
import CModal from '../../../../components/common/CModal';
import {Constants} from '../../../../constants';
import AddProductContainer from '../containers/AddProductContainer';

const AddProductModal = React.forwardRef((props, ref) => {
  const {product} = props;

  const [title, setTitle] = useState('Add Product');
  const [isClear, setIsClear] = useState(false);

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
      title={title}
      modalType={Constants.modalType.MODAL_TYPE_BOTTOM}
      closableWithOutsideTouch
      onClear={async () => {
        //onButtonAction({ type: Constants.actionType.ACTION_FORM_CLEAR });
        setIsClear(true);
      }}
      {...props}>
      <AddProductContainer
        onChangeTitle={title => {
          setTitle(title);
        }}
        isClear={isClear}
        updateClear={() => {
          setIsClear(false);
        }}
        {...props}
      />
    </CModal>
  );
});

export default AddProductModal;
