import {View} from 'react-native';
import React, {useRef} from 'react';
import {SubmitButton} from '../../../../../../components/shared/SubmitButton';
import SimScanModal from '../../modal/sim/SimScanModal';
import {Constants} from '../../../../../../constants';
import SimViewListsModal from '../../modal/sim/SimViewListsModal';

export default function SimView(props) {
  const simScanModalRef = useRef(null);
  const simViewListModalRef = useRef(null);

  const openScan = () => {
    simScanModalRef.current.showModal();
  };

  const onSimScan = async ({type, value}) => {
    if (type == Constants.actionType.ACTION_CAPTURE) {
      props.onDataChangedSim(value);
    } else if (type == Constants.actionType.ACTION_DONE) {
      props.addStock();
    } else if (type == Constants.actionType.ACTION_CLOSE) {
      simScanModalRef.current.hideModal();
    } else if (type == Constants.actionType.ACTION_REMOVE) {
      props.removeCode(value);
    }
  };

  const onSimViewListClosed = ({type, value}) => {
    if (type == Constants.actionType.ACTION_CHANGE_NETWORK) {
      simViewListModalRef.current.hideModal();
    }
    if (type == Constants.actionType.ACTION_REMOVE) {
      props.removeCode(value);
    }
    if (type == Constants.actionType.ACTION_CLOSE) {
      simViewListModalRef.current.hideModal();
    }

    if (type == Constants.actionType.ACTION_DONE) {
      props.addStock();
    }
  };

  return (
    <View style={{flexDirection: 'row', marginTop: 15}}>
      <SubmitButton
        svgIcon={'Check_List'}
        title="View List"
        style={{flex: 1}}
        onSubmit={() => simViewListModalRef.current.showModal()}></SubmitButton>

      <SubmitButton
        svgIcon={'QR_SCAN'}
        title="Scan  ICCID"
        style={{flex: 1, marginLeft: 10}}
        onSubmit={openScan}></SubmitButton>

      <SimScanModal
        ref={simScanModalRef}
        codeLists={props.codeLists}
        isAdded={props.isAdded}
        count={props.codeLists.length != 0 ? props.codeLists.length : ''}
        onButtonAction={onSimScan}
      />

      <SimViewListsModal
        ref={simViewListModalRef}
        lists={props.codeLists}
        type="add_stock_view_lists"
        onButtonAction={onSimViewListClosed}
      />
    </View>
  );
}
