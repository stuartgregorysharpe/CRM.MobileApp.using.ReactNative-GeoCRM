import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import MultiSelectList from './MultiSelectList';
import SectionHeader from './SectionHeader';

const SectionItem = props => {
  const {sectionName, items, checkedItemIds, index} = props;
  const isFirst = index == 0;
  return (
    <View style={[styles.container, props.style]}>
      <SectionHeader
        title={sectionName}
        onItemAction={props.onItemAction}
        isFirst={isFirst}
      />
      <MultiSelectList
        items={items}
        onItemAction={props.onItemAction}
        checkedItemIds={checkedItemIds}
        idFieldName={'product_id'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
});
export default SectionItem;
