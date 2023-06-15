import React , { useRef, useImperativeHandle } from 'react';
import CModal from '../../../../../../components/common/CModal';
import QRScanModal from '../../../../../../components/common/QRScanModal';
import AlertModal from '../../../../../../components/modal/AlertModal';
import {Constants} from '../../../../../../constants';
import { filterItemsByBarcode } from '../../../staging/helper';
import SimDetailsContainer from '../../container/sim/SimDetailsContainer';

const SimDetailsModal = React.forwardRef((props, ref) => {

  const { stockList } = props;

  const alertModalRef = useRef();


  const onButtonAction = data => {
    /*if (
      data.type == Constants.actionType.ACTION_DONE ||
      data.type == Constants.actionType.ACTION_NEXT
    ) {
      if (ref) {
        ref.current.hideModal();
      }
    }*/
    if (props.onButtonAction) {
      props.onButtonAction(data);
    }
    const type = data.type;
    const value = data.value;
    if(type == Constants.actionType.ACTION_CAPTURE){
      const capturedItems = filterItemsByBarcode(stockList, value);      
      if (!(capturedItems && capturedItems.length > 0)) {
        alertModalRef.current.alert('Barcode ' + value + ' not found in stock');
      }
    }

  };

  const openSignature = value => {
    onButtonAction({type: Constants.actionType.ACTION_NEXT, value: value});
  };

  return (
    <QRScanModal
      ref={ref}
      isNotCloseAfterCapture
      isPartialDetect={true}
      onButtonAction={onButtonAction}
      onClose={props.onClose}
      showClose={true}
      renderLastScanResultView={() => {
        return (
          <>
          <SimDetailsContainer
            {...props}
            openSignature={openSignature}
            onButtonAction={onButtonAction}
          />
          <AlertModal ref={alertModalRef} />
          </>
        );            
      }}
    />
  );
});
export default SimDetailsModal;
