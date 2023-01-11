import React from 'react';
import CModal from '../../../../components/common/CModal';
import {Constants} from '../../../../constants';
import CustomerSalesHistoryContainer from './containers/CustomerSalesHistoryContainer';

const CustomerSaleHistoryModal = React.forwardRef((props, ref) => {
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
      title="Trader Turnover History"
      closableWithOutsideTouch
      onClear={() => {
        onButtonAction({type: Constants.actionType.ACTION_FORM_CLEAR});
      }}
      {...props}>
      <CustomerSalesHistoryContainer
        {...props}
        onButtonAction={onButtonAction}
      />
    </CModal>
  );
});

export default CustomerSaleHistoryModal;
