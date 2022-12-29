import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {AppText} from '../../../../components/common/AppText';
import SvgIcon from '../../../../components/SvgIcon';
import {Fonts} from '../../../../constants';
import Colors, {whiteLabel} from '../../../../constants/Colors';
import {boxShadow, cardShadow} from '../../../../constants/Styles';

const CartSettingsView = props => {
  const {customerName, address} = props;
  const onPressSettings = () => {
    if (props.onPressSettings) {
      props.onPressSettings();
    }
  };
  return (
    <TouchableOpacity
      style={[styles.container, cardShadow, props.style]}
      onPress={onPressSettings}>
      <View style={styles.settingButton}>
        <SvgIcon icon="Setting" width="20" height="20" />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <SvgIcon icon="Person_Sharp_White" width="12px" height="12px" />
        <Text style={styles.sectionText}>Customer Name</Text>
      </View>
      <Text style={[styles.text, {marginTop: 5}]}>{customerName}</Text>
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 8}}>
        <SvgIcon icon="Location_Arrow_White" width="12px" height="12px" />
        <Text style={styles.sectionText}>Address</Text>
      </View>
      <Text style={[styles.text, {marginTop: 5}]}>{address}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    backgroundColor: whiteLabel().headerBackground,
    borderRadius: 4,
    padding: 8,
  },
  settingButton: {
    position: 'absolute',
    top: 6,
    right: 8,
  },
  sectionText: {
    fontFamily: Fonts.primaryRegular,
    fontSize: 12,
    marginLeft: 5,
    color: whiteLabel().headerText,
  },
  text: {
    fontFamily: Fonts.primaryBold,
    fontSize: 14,
    fontWeight: 'bold',
    color: whiteLabel().headerText,
  },
});

export default CartSettingsView;
