import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import SvgIcon from '../../../../../components/SvgIcon';
import {Colors, Fonts} from '../../../../../constants';
import {whiteLabel} from '../../../../../constants/Colors';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons';

const RegretItem = props => {
  const {order_number, product_name, location_name} = props.item;
  const onPressSummary = () => {
    if (props.onItemAction) {
      props.onItemAction(props.item);
    }
  };
  return (
    <View style={[styles.container, props.style]}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text
          style={styles.title}>{`# ${order_number} | ${product_name}`}</Text>
        <Text style={styles.description}>{location_name}</Text>
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={onPressSummary}>
        <Text style={styles.buttonTitle}>{'Re-Order'}</Text>
        <FontAwesomeIcon
          style={styles.submitButtonIcon}
          size={25}
          color={whiteLabel().actionFullButtonIcon}
          icon={faAngleDoubleRight}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    borderBottomColor: whiteLabel().lineSeperator,
    borderBottomWidth: 1,
  },
  buttonTitle: {
    fontSize: 14,
    fontFamily: Fonts.primaryBold,
    color: Colors.whiteColor,
    fontWeight: 'bold',
    marginRight: 4,
  },
  buttonContainer: {
    height: 32,

    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 4,
    marginVertical: 8,
    backgroundColor: whiteLabel().actionFullButtonBackground,
  },
  title: {
    fontSize: 12,
    lineHeight: 15,
    fontWeight: 'bold',
    color: whiteLabel().mainText,
    fontFamily: Fonts.primaryBold,
  },
  description: {
    fontSize: 10,
    marginTop: 2,
    lineHeight: 13,
    fontWeight: '500',
    color: whiteLabel().helpText,
    fontFamily: Fonts.primaryMedium,
  },
});

export default RegretItem;
