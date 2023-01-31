import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import {Modal, Title} from 'react-native-paper';
import Colors, {  
  whiteLabel,
} from '../../constants/Colors';
import {notifyMessage} from '../../constants/Helper';
import Fonts from '../../constants/Fonts';
import SvgIcon from '../SvgIcon';

const StartEndDateSelectionModal = ({
  visible,
  title,
  startDate,
  endDate,
  openDatePicker,
  onModalClose,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onDismiss={onModalClose}
      contentContainerStyle={styles.pickerContent}
      onRequestClose={onModalClose}>
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={{flexDirection: 'row'}}>
          <Title style={{fontFamily: Fonts.primaryBold, fontSize: 18}}>
            Outcome Modified Date
          </Title>
          <TouchableOpacity
            style={styles.closeModal}
            onPress={() => {
              onModalClose();
            }}>
            <Text
              style={{
                fontSize: 15,
                fontFamily: Fonts.secondaryRegular,
                color: Colors.selectedRedColor,
              }}>
              Close {}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{marginTop: 20}}>
          <Text style={styles.titleStyle}>Start Date</Text>
          <TouchableOpacity
            onPress={() => {
              openDatePicker('start');
            }}>
            <View style={styles.rowContainer}>
              <Text style={styles.hintStyle}>
                {startDate !== '' ? startDate : 'Select Start Date'}
              </Text>
              <SvgIcon icon="Angle_Left" width="20px" height="20px" />
            </View>
          </TouchableOpacity>
        </View>

        <View style={{marginTop: 20}}>
          <Text style={styles.titleStyle}>End Date</Text>
          <TouchableOpacity
            onPress={() => {
              if (startDate !== '') {
                openDatePicker('end');
              } else {
                notifyMessage('Please select start date');
              }
            }}>
            <View style={styles.rowContainer}>
              <Text style={styles.hintStyle}>
                {endDate !== '' ? endDate : 'Select End Date'}
              </Text>
              <SvgIcon icon="Angle_Left" width="20px" height="20px" />
            </View>
          </TouchableOpacity>
        </View>

        {/* <TouchableOpacity style={[styles.closeModal,{justifyContent:'center', marginTop:20}]} onPress={() =>{onModalClose() }}>            
                        <Text style={{fontSize:18, fontFamily:Fonts.secondaryRegular}}>Ok</Text>
                </TouchableOpacity> */}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  pickerContent: {
    height: Dimensions.get('window').height * 0.4,
    margin: 20,
    backgroundColor: Colors.bgColor,
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    elevation: 1,
  },
  closeModal: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 5,
    paddingTop: 10,
    marginBottom: 10,
  },

  titleStyle: {
    fontFamily: Fonts.secondaryMedium,
    fontSize: 16,
    color: '#000',
  },

  rowContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: whiteLabel().fieldBorder,
    padding: 10,
    marginTop: 5,
    borderRadius: 3,
    alignItems: 'center',
  },
  hintStyle: {
    fontFamily: Fonts.secondaryMedium,
    fontSize: 14,
    color: whiteLabel().helpText,
    flex: 1,
  },
});

export default StartEndDateSelectionModal;
