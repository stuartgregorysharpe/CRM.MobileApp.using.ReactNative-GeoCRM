import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import React from 'react';
import {style} from '../../../../../constants/Styles';
import Divider from '../../../../../components/Divider';
import ActionItemsContainer from '../containers/ActionItemsContainer';

export default function ActionItems(props) {
  const {visible, onModalClosed} = props;

  const screenMargin = Platform.OS === 'ios' ? 100 : 115;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onModalClosed}
      onModalClosed={onModalClosed}>
      <View style={[style.centeredView]}>
        <TouchableWithoutFeedback onPress={onModalClosed}>
          <View style={styles.topContainer}></View>
        </TouchableWithoutFeedback>

        <View
          style={[
            style.modalView,
            styles.modalContainer,
            {height: Dimensions.get('screen').height - screenMargin},
          ]}>
          <TouchableOpacity
            onPress={() => {
              onModalClosed();
            }}>
            <Divider></Divider>
          </TouchableOpacity>
          <ActionItemsContainer {...props} hasAdd />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  pagerView: {
    flex: 4,
  },
  modalContainer: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 10,
  },
  topContainer: {
    width: Dimensions.get('screen').width,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Dimensions.get('screen').height,
  },
});
