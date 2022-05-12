import React from 'react';
import {StyleSheet, View} from 'react-native';
import SelectItem from './SelectItem';

const MultiSelectList = props => {
  const {checkedItemIds, idFieldName = 'id'} = props;

  const isChecked = item => {
    if (checkedItemIds) {
      const foundItem = checkedItemIds.find(x => {
        return x == item[idFieldName];
      });
      return foundItem != null;
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

export default MultiSelectList;
