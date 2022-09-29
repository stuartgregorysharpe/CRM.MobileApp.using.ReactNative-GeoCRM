import React, {useState} from 'react';
import {SubmitButton} from '../../../../../../components/shared/SubmitButton';
import ShipmentScanResultView from '../../../staging/components/ShipmentScanResultView';

export default function SimDetailsChildView(props) {
  const {
    onSellToTrader,
    onTransfer,
    items,
    lastScanedQrCode,
    onCloseScanModal,
    onAddCode,
    onViewList,
  } = props;
  return (
    <ShipmentScanResultView
      key={'scan-result'}
      items={items}
      lastScanedQrCode={lastScanedQrCode}
      onViewList={onViewList}
      onAddCode={onAddCode}
      onClose={onCloseScanModal}
      renderActionButtons={() => {
        return (
          <>
            <SubmitButton
              title="Sell To Trader"
              onSubmit={onSellToTrader}
              style={{marginTop: 10}}></SubmitButton>

            {/* <SubmitButton
              title="Transfer"
              onSubmit={onTransfer}
              style={{marginTop: 10}}></SubmitButton> */}
              
          </>
        );
      }}
    />
  );
}
