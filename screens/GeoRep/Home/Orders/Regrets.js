import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import RegretsList from './components/RegretsList';
import regretDummyData from './regretDummyData.json';

const Regrets = props => {
  return (
    <View style={[styles.container, props.style]}>
      <RegretsList items={regretDummyData.regrets} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
});

export default Regrets;
