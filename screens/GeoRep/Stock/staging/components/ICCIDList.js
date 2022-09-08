import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import SvgIcon from '../../../../../components/SvgIcon';
import {Constants, Fonts, Values} from '../../../../../constants';
import {whiteLabel} from '../../../../../constants/Colors';
const ICCIDItem = props => {
  const {iccid} = props.item;
  return (
    <View style={[styles.iccidItemContainer, props.style]}>
      <Text style={styles.idText}>{iccid}</Text>
      <TouchableOpacity
        onPress={() => {
          if (props.onItemAction) {
            props.onItemAction({
              type: Constants.actionType.ACTION_REMOVE,
              item: props.item,
            });
          }
        }}>
        <SvgIcon icon="DELETE" width="20" height="20" />
      </TouchableOpacity>
    </View>
  );
};

const ICCIDList = props => {
  const {items} = props;
  const renderICCIDItems = () => {
    if (!items) return null;
    return items.map((item, index) => {
      const isLast = index == items.length - 1;
      return (
        <ICCIDItem
          item={item}
          key={'iccidItem' + index}
          style={{borderBottomWidth: isLast ? 0 : 1}}
          onItemAction={props.onItemAction}
        />
      );
    });
  };
  return (
    <View style={[styles.container, props.style]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 40,
          borderBottomColor: whiteLabel().actionFullButtonBackground,
          borderBottomWidth: 2,
          marginHorizontal: 8,
          marginBottom: 8,
        }}>
        <Text style={styles.title}>Sim ICCID</Text>
      </View>
      {renderICCIDItems()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  iccidItemContainer: {
    height: 40,
    marginHorizontal: 8,
    borderBottomColor: whiteLabel().lineSeperator,
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  idText: {
    fontSize: Values.fontSize.small,
    fontFamily: Fonts.primaryBold,
    color: whiteLabel().inputText,
  },
  title: {
    fontSize: Values.fontSize.small,
    fontFamily: Fonts.primaryRegular,
    color: whiteLabel().mainText,
  },
});

export default ICCIDList;
