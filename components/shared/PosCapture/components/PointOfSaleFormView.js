import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Fonts, Values} from '../../../../constants';
import {whiteLabel} from '../../../../constants/Colors';
import {boxShadow, style} from '../../../../constants/Styles';

const POSItemView = props => {
  const {formData} = props;
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.headerContainer}>
        <Text style={[styles.title, {flex: 1}]}>Type</Text>
        <Text style={[styles.title, {flex: 1}]}>POS</Text>
        <Text style={[styles.title, {flex: 1}]}>Qty</Text>
      </View>
    </View>
  );
};
const PointOfSaleFormView = props => {
  const {formData} = props;
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: 'white', borderRadius: 4},
        boxShadow,
        props.style,
      ]}>
      <POSItemView formData={formData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderBottomColor: whiteLabel().actionFullButtonBackground,
    borderBottomWidth: 2,
    marginHorizontal: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: Values.fontSize.small,
    fontFamily: Fonts.primaryBold,
    color: whiteLabel().mainText,
    fontWeight: 'bold',
  },
});

export default PointOfSaleFormView;
