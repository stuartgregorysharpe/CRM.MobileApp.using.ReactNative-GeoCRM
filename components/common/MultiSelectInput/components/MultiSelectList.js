import React from 'react';
import {StyleSheet, View} from 'react-native';
import SelectItem from '../../SelectInput/components/SelectItem';

const MultiSelectList = props => {
  const {checkedValueList, idFieldName = 'value'} = props;
  const isChecked = item => {
    if (checkedValueList) {
      return checkedValueList.includes(item[idFieldName]);
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

export default MultiSelectList;
