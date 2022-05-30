import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Colors, Constants, Fonts, Values} from '../../../../constants';
import NumberCounter from './NumberCounter';

const CounterItem = props => {
  const {item, step, fixed} = props;
  if (!item) return null;
  const {count} = item;
  const name = item.name? item.name : ''
  const onCount = nextCount => {
    if (props.onItemAction) {
      props.onItemAction({
        type: Constants.actionType.ACTION_COUNT,
        nextCount: nextCount,
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
      <NumberCounter
        count={count}
        step={step}
        fixed={fixed}
        onCount={onCount}
      />
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
