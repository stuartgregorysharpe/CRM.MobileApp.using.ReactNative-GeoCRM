import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import SectionItem from './SectionItem';

const SectionList = props => {
  const {sections, checkedItemIds} = props;
  if (!sections) return null;
  const sectionViews = [];
  let index = 0;
  for (const sectionName in sections) {
    const sectionItemList = sections[sectionName];
    sectionViews.push(
      <SectionItem
        items={sectionItemList}
        key={index + 'section'}
        index={index}
        sectionName={sectionName}
        checkedItemIds={checkedItemIds}
        onItemAction={props.onItemAction}
      />,
    );
    index++;
  }
  return <View style={[styles.container, props.style]}>{sectionViews}</View>;
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
});

export default SectionList;
