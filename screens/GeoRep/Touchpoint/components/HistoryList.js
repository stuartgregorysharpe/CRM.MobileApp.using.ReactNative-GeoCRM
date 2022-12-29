import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import HistoryItem from './HistoryItem';

const HistoryList = props => {
  const {items} = props;
  const totalCount = items.length;
  const renderItem = (item, index) => {
    const isLast = totalCount == index + 1;
    return (
      <HistoryItem
        item={item}
        index={index}
        isLast={isLast}
        onItemAction={props.onItemAction}
      />
    );
  };
  return (
    <FlatList      
      data={items}
      renderItem={({item, index}) => renderItem(item, index)}
      keyExtractor={(item, index) => index.toString()}
      style={styles.container}
      onEndReachedThreshold={0.4}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    paddingTop:10
  },
});

export default HistoryList;
