import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';

const ShipmentViewListItem = props => {
  const {item} = props;
  if (!item) return null;
  const {network, items} = item;
  return (
    <View style={[styles.container, props.style]}>
      <Text>{network}</Text>
      <Text>{`Items: ${items.length}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
});

export default ShipmentViewListItem;
