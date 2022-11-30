
import React , { useState} from 'react'
import CModal from '../../../../components/common/CModal';
import { Constants } from '../../../../constants';
import ProductDetailsContainer from '../containers/ProductDetailsContainer';
import ProductFilterContainer from '../containers/ProductFilterContainer';


const ProductDetailsModal = React.forwardRef((props, ref) => {

    const { product } = props;
    
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
            modalType={Constants.modalType.MODAL_TYPE_BOTTOM}
            closableWithOutsideTouch
            onClear={ async() => {
                
                onButtonAction({ type: Constants.actionType.ACTION_FORM_CLEAR });                
            }}
            {...props}>
            <ProductDetailsContainer                 
                {...props} />
        </CModal>        
    )
});


export default ProductDetailsModal;
