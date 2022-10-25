import React from 'react';
import {StyleSheet, View} from 'react-native';
import SelectItem from './SelectItem';

const SingleSelectList = props => {
  const {checkedValue, idFieldName = 'value', mode} = props;

  const isChecked = item => {
    if (mode === 'single') {
      if (checkedValue) {
        return checkedValue == item[idFieldName];
      }
    } else if (mode === 'multi') {
      if (checkedValue != '' && checkedValue != undefined) {
        var tmp = checkedValue.find(element => element === item[idFieldName]);
        if (tmp !== null && tmp !== undefined) {
          return true;
        }
      }
    }

    return false;
  };
  const renderItem = (item, index, isLast, isChecked, onItemAction) => {
    if (props.renderItem) {
      return props.renderItem(item, index, isLast, isChecked, onItemAction);
    }    

    return (
      <SelectItem
        isChecked={isChecked}
        item={item}
        key={index + 'item'}
        isLast={isLast}
        onItemAction={onItemAction}
      />
    );
  };
  const renderItems = items => {
    return items.map((item, index) => {
      const isLast = index == items.length - 1;

      return renderItem(
        item,
        index,
        isLast,
        isChecked(item),
        props.onItemAction,
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
