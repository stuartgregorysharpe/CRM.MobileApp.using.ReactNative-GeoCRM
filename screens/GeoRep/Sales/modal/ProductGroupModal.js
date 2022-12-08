import React from 'react';
import CModal from '../../../../components/common/CModal';
import {Constants} from '../../../../constants';
import ProductGroupContainer from '../containers/ProductGroupContainer';
import {useSelector, useDispatch} from 'react-redux';
import {setProductPriceLists} from '../../../../actions/sales.action';
import {storeJsonData} from '../../../../constants/Storage';

const ProductGroupModal = React.forwardRef((props, ref) => {
  const {products} = props;
  const productPriceLists = useSelector(state => state.sales.productPriceLists);
  const dispatch = useDispatch();

  const onButtonAction = data => {
    if (props.onButtonAction) {
      props.onButtonAction(data);
    }
    if (ref) {
      ref.current.hideModal();
    }
  };

  const onClearData = () => {
    if (props.onClearData) {
      props.onClearData();
    }
    var productIds = [];
    products.forEach(element => {
      productIds.push(element.product_id);
    });
    const productLists = productPriceLists.filter(
      item => !productIds.includes(item.product_id),
    );
    dispatch(setProductPriceLists(productLists));

    storeJsonData('@product_price', productLists);
  };

  return (
    <CModal
      ref={ref}
      modalType={Constants.modalType.MODAL_TYPE_BOTTOM}
      closableWithOutsideTouch
      onClear={() => {
        //onButtonAction({ type: Constants.actionType.ACTION_FORM_CLEAR });
        onClearData();
      }}
      {...props}>
      <ProductGroupContainer {...props} />
    </CModal>
  );
});

export default ProductGroupModal;
