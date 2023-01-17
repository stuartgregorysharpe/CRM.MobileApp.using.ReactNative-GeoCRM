import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useRef, useEffect} from 'react';
import {AppText} from '../../../../../components/common/AppText';
import {Colors, Constants} from '../../../../../constants';
import SvgIcon from '../../../../../components/SvgIcon';
import {whiteLabel} from '../../../../../constants/Colors';
import ViewOfflineSyncModal from '../modal/ViewOfflineSyncModal';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons';
import {useSelector} from 'react-redux';

const ViewOfflineSyncItem = props => {
  const {count, onClosed, updateCount, isManual} = props;
  const offlineSyncModalRef = useRef(null);
  const offlineStatus = useSelector(state => state.auth.offlineStatus);

  useEffect(() => {
    if (!offlineStatus && !isManual) {
      openModal();
      // if(props.changeIsManual){
      //     props.changeIsManual(true);
      // }
    }
  }, [offlineStatus, isManual]);

  const onOfflineSyncModalAction = ({type, value}) => {
    if (type == Constants.actionType.ACTION_CLOSE) {
      offlineSyncModalRef.current.hideModal();
      console.log(' modal closed value', value, type);
      updateCount(value);
    }
  };

  const closeModal = () => {
    offlineSyncModalRef.current.hideModal();
    onClosed();
  };

  const renderCloseIcon = () => {
    return (
      <TouchableOpacity onPress={closeModal}>
        <SvgIcon icon="Close" width="22" height="22" style={{marginLeft: 10}} />
      </TouchableOpacity>
    );
  };

  const openModal = () => {
    setTimeout(() => {
      if (offlineSyncModalRef.current) {
        offlineSyncModalRef.current.showModal();
      }
    }, 400);
  };

  return (
    <TouchableOpacity
      onPress={() => {
        openModal();
      }}>
      <View style={styles.container}>
        <AppText
          title="View Offline Sync Items"
          type="secondaryBold"
          color={whiteLabel().mainText}></AppText>
        <View
          style={{
            position: 'absolute',
            flexDirection: 'row',
            right: 10,
            alignItems: 'center',
          }}>
          <View style={styles.numberContainer}>
            <AppText title={count} color={whiteLabel().subText}></AppText>
          </View>
          {/* <SvgIcon icon="DoubleArrow" width="30" height='30' /> */}
          <FontAwesomeIcon
            size={25}
            color={whiteLabel().actionFullButtonIcon}
            icon={faAngleDoubleRight}
          />
        </View>
      </View>

      <ViewOfflineSyncModal
        ref={offlineSyncModalRef}
        isManual={isManual}
        title="Offline Sync"
        customRightHeaderView={renderCloseIcon()}
        onButtonAction={onOfflineSyncModalAction}
      />
    </TouchableOpacity>
  );
};

export default ViewOfflineSyncItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
    marginTop: 5,
    borderRadius: 10,
    borderColor: Colors.redColor,
    borderWidth: 1,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberContainer: {
    borderRadius: 30,
    borderColor: whiteLabel().borderColor,
    borderWidth: 1,
    paddingLeft: 1,
    marginRight: 10,
    width: 23,
    height: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
