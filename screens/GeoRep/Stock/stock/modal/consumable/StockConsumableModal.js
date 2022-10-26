import React from 'react';
import CModal from '../../../../../../components/common/CModal';
import {Constants} from '../../../../../../constants';
import StockConsumableContainer from '../../container/StockConsumableContainer';

const StockConsumableModal = React.forwardRef((props, ref) => {
  const onButtonAction = data => {
    if (ref) {
      ref.current.hideModal();
    }
    if (props.onButtonAction) {
      props.onButtonAction(data);
    }
  };

  const openSellToTrader = (typeValue, locationId) => {
    onButtonAction({
      type: Constants.actionType.ACTION_NEXT,
      value: {stockType: typeValue, locationId: locationId},
    });
  };
  const openTransfer = value => {
    onButtonAction({
      type: Constants.actionType.ACTION_NEXT,
      value: {stockType: value},
    });
  };

  return (
    <CModal
      ref={ref}
      modalType={Constants.modalType.MODAL_TYPE_BOTTOM}
      hideClear={true}
      closableWithOutsideTouch
      onClear={() => {
        onButtonAction({type: Constants.actionType.ACTION_FORM_CLEAR});
      }}
      {...props}>
      <StockConsumableContainer
        openSellToTrader={openSellToTrader}
        openTransfer={openTransfer}
        {...props}
      />
    </CModal>
  );
});

export default StockConsumableModal;
