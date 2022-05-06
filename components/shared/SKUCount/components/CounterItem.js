import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Colors, Constants, Fonts, Values} from '../../../../constants';
import NumberCounter from './NumberCounter';

const CounterItem = props => {
  const {item} = props;
  if (!item) return null;
  const {name, count} = item;
  const onCount = isPlus => {
    if (props.onItemAction) {
      props.onItemAction({
        type: isPlus
          ? Constants.actionType.ACTION_COUNT_PLUS
          : Constants.actionType.ACTION_COUNT_MINUS,
        item,
      });
    }
  };
  return (
    <View
      style={[
        styles.container,
        !props.isLast && styles.bottomBorder,
        props.style,
      ]}>
      <Text style={styles.text}>{name}</Text>
      <NumberCounter count={count} onCount={onCount} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    marginHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomBorder: {
    borderBottomColor: Colors.primaryColor,
    borderBottomWidth: 1,
  },
  text: {
    fontFamily: Fonts.primaryMedium,
    fontSize: Values.fontSize.xSmall,
    color: Colors.primaryColor,
  },
});

export default CounterItem;
