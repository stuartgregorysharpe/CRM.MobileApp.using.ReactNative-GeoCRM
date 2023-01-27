import {View, StyleSheet, Keyboard} from 'react-native';
import React, {useState, useRef} from 'react';
import {Constants} from '../../../../../../constants';
import SimDetailsChildView from './SimDetailsChildView';
import ScanningListViewModal from '../../../staging/modals/ScanningListViewModal';

export default function SimDetailsView(props) {
  const [isScan, setIsScan] = useState(true);
  const simViewListModalRef = useRef(null);
  const {items} = props;

  const onAddCode = value => {
    // Manual Input
    if (isScan) {
      props.onButtonAction({
        type: Constants.actionType.ACTION_INPUT_BARCODE,
        value: value,
      });
    }
  };

  const onSellToTrader = () => {
    setIsScan(false);
    props.onSellToTrader();
  };

  const onTransfer = () => {
    setIsScan(false);
    props.onTransfer();
  };

  const onViewList = () => {
    simViewListModalRef.current.showModal();
  };

  const onListAction = ({type, item}) => {
    if (
      type == Constants.actionType.ACTION_CLOSE ||
      type == Constants.actionType.ACTION_CHANGE_NETWORK
    ) {
      simViewListModalRef.current.hideModal();
    }
    if (type == Constants.actionType.ACTION_REMOVE) {
      props.onButtonAction({
        type: Constants.actionType.ACTION_REMOVE,
        item: item,
      });
    }
  };

  return (
    <View style={[styles.container, props.style]}>
      <SimDetailsChildView
        onClose={() => {
          Keyboard.dismiss();
        }}
        onSellToTrader={onSellToTrader}
        onTransfer={onTransfer}
        onViewList={onViewList}
        onAddCode={value => onAddCode(value)}
        {...props}></SimDetailsChildView>

      <ScanningListViewModal
        key={'capture-list'}
        ref={simViewListModalRef}
        title={`Items: ${items.length}`}
        items={items}
        onItemAction={onListAction}
        onSellToTrader={onSellToTrader}
        onTransfer={onTransfer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
});
