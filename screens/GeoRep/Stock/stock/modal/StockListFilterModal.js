import React from 'react';
import CModal from '../../../../../components/common/CModal';
import {Constants} from '../../../../../constants';
import StockListFilterContainer from '../container/StockListFilterContainer';

const StockListFilterModal = React.forwardRef((props, ref) => {
  const onButtonAction = data => {
    if (props.onButtonAction) {
      props.onButtonAction(data);
    }
    if (ref) {
      ref.current.hideModal();
    }
  };

  const onApply = filters => {
    onButtonAction({
      type: Constants.actionType.ACTION_APPLY,
      value: filters,
    });
  };

  return (
    <CModal
      ref={ref}
      clearText={'Clear Filters'}
      modalType={Constants.modalType.MODAL_TYPE_BOTTOM}
      title={'Filter your search'}
      closableWithOutsideTouch
      onClear={() => {
        onButtonAction({type: Constants.actionType.ACTION_FORM_CLEAR});
      }}
      {...props}>
      <StockListFilterContainer onApply={onApply} {...props} />
    </CModal>
  );
});

export default StockListFilterModal;
