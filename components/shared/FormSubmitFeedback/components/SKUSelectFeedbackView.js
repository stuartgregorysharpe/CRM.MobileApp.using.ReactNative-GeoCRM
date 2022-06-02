import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {whiteLabel} from '../../../../constants/Colors';
import Colors from '../../../../constants/Colors';

const SKUSelectFeedbackView = props => {
  const {data} = props;
  if (!data) return null;
  const products = data.products;
  if (!products) return null;

  return (
    <View style={[styles.container, props.style]}>
      {products.map(title => {
        return <Text style={styles.text}>{title}</Text>;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  text: {
    fontSize: 10,
    lineHeight: 14,
    color: Colors.blackColor,
  },
});

export default SKUSelectFeedbackView;
