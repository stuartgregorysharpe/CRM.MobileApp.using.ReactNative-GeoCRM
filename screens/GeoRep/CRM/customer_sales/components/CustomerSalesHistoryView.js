import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import TotalTurnoverView from './TotalTurnoverView';
import SectionView from './SectionView';

const CustomerSalesHistoryView = props => {
  const {locationId, totalTurnOver, sections} = props;
  const renderItems = (item, index) => {
    return (
      <SectionView item={item} key={index} style={{marginHorizontal: 10}} />
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={() => (
          <TotalTurnoverView
            data={totalTurnOver}
            style={{marginTop: 16, marginHorizontal: 12, marginBottom: 10}}
          />
        )}
        data={sections}
        renderItem={({item, index}) => renderItems(item, index)}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    alignSelf: 'stretch',
  },
});

export default CustomerSalesHistoryView;
