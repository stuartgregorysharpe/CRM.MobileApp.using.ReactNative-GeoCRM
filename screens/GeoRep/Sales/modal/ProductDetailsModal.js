
import React , { useState} from 'react'
import CModal from '../../../../components/common/CModal';
import { Constants } from '../../../../constants';
import ProductDetailsContainer from '../containers/ProductDetailsContainer';
import ProductFilterContainer from '../containers/ProductFilterContainer';
import { useSelector } from 'react-redux';

const ProductDetailsModal = React.forwardRef((props, ref) => {

    const { product } = props;

    const productPriceLists = useSelector(
        state => state.sales.productPriceLists,
    );

    const onButtonAction = data => {
        if (props.onButtonAction) {
          props.onButtonAction(data);
        }
        if (ref) {
          ref.current.hideModal();
        }
    };

    const onClearData = () => {
        var product_id = product.product_id;
        
    }

    return (
        <CModal
            ref={ref}
            modalType={Constants.modalType.MODAL_TYPE_BOTTOM}
            closableWithOutsideTouch
            onClear={ async() => {    
                
                var originProduct = productPriceLists.find(element => parseInt(element.product_id) == parseInt(product.product_id));
                var p = product;
                if(originProduct != undefined){
                    p = originProduct.product;
                }
                
                console.log("origin product", product);
                onButtonAction({ type: Constants.actionType.ACTION_FORM_CLEAR , value: 
                    {
                        product_id : product.product_id,
                        warehouse_id : product.warehouse_id,
                        price: product.price,
                        qty: product.qty,
                        special : product.special,
                        product : p
                    } 
                });                
            }}
            {...props}>
            <ProductDetailsContainer                 
                {...props} />
        </CModal>        
    )
});

export default ProductDetailsModal;
