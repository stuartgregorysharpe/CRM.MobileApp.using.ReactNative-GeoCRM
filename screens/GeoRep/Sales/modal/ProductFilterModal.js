
import React , { useState} from 'react'
import CModal from '../../../../components/common/CModal';
import { Constants } from '../../../../constants';
import ProductFilterContainer from '../containers/ProductFilterContainer';


const ProductFilterModal = React.forwardRef((props, ref) => {

    const [isClearFilter, setIsClearFilter] = useState(false);
    const onButtonAction = data => {
        if (props.onButtonAction) {
          props.onButtonAction(data);
        }
        if (ref) {
          ref.current.hideModal();
        }
    };

    const haveFilter = () => {
        setIsClearFilter(false)
    }
    return (        
        <CModal
            ref={ref}
            modalType={Constants.modalType.MODAL_TYPE_BOTTOM}
            closableWithOutsideTouch
            onClear={() => {
                //onButtonAction({ type: Constants.actionType.ACTION_FORM_CLEAR });
                setIsClearFilter(true);
            }}
            {...props}>
            <ProductFilterContainer 
                isClearFilter={isClearFilter}
                haveFilter={haveFilter}
                {...props} />
        </CModal>        
    )
});


export default ProductFilterModal;
