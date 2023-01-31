
import React , { useState} from 'react'
import CModal from '../../../../components/common/CModal';
import { Constants } from '../../../../constants';
import TransactionSubmitContainer from '../containers/TransactionSubmitContainer';

const TransactionSubmitModal = React.forwardRef((props, ref) => {
    
    const [title, setTitle] = useState('Details');    
    
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
         
            onClear={ async() => {                
                onButtonAction({ type: Constants.actionType.ACTION_FORM_CLEAR });
            }}            
            {...props}>
                
            <TransactionSubmitContainer
                onChangeTitle={(title)=>{
                    setTitle(title)
                }}                
                {...props} />
        </CModal>        
    )
});


export default TransactionSubmitModal;
