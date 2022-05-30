import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {boxShadow} from '../../constants/Styles';

const CardView = props => {
  return (
    <View style={[styles.container, boxShadow, props.style]}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  
  container: {
    alignSelf: 'stretch',
    backgroundColor: 'white',
    borderRadius: 4
  },

});

export default CardView;
