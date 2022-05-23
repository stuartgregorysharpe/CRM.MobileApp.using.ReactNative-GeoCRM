import React from 'react';
import {StyleSheet, View} from 'react-native';
import SelectItem from './SelectItem';

const SingleSelectList = props => {
  const {checkedValue, idFieldName = 'value'} = props;
  console.log('checkedValue', checkedValue);
  const isChecked = item => {
    if (checkedValue) {
      return checkedValue == item[idFieldName];
    }
    return false;
  };
  const renderItems = items => {
    return items.map((item, index) => {
      const isLast = index == items.length - 1;
      return (
        <SelectItem
          isChecked={isChecked(item)}
          item={item}
          key={index + 'item'}
          isLast={isLast}
          onItemAction={props.onItemAction}
        />
      );
    });
  };
  return (
    <View style={[styles.container, props.style]}>
      {renderItems(props.items)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'stretch',
  },
  itemStyle: {
    marginBottom: 14,
  },
});

export default SingleSelectList;
