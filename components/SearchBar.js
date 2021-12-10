import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import SvgIcon from './SvgIcon';
import { boxShadow } from '../constants/Styles';
import { SLIDE_STATUS } from '../actions/actionTypes';

export default function SearchBar({animation}) {
  const dispatch = useDispatch();

  const [text, setText] = useState('');
  return (
    <View style={styles.searchBox}>
      <TextInput
        style={[styles.searchInput, boxShadow]}
        placeholder='Search.....'
        value={text}
        onChangeText={text => setText(text)}
        onFocus={() => dispatch({type: SLIDE_STATUS, payload: false})}
      />
      <FontAwesomeIcon style={styles.searchIcon} size={16} color="#9D9FA2" icon={ faSearch } />
      <TouchableOpacity style={styles.filterImageButton} onPress={animation}>
        <SvgIcon icon="Filter" width="30px" height="30px" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  searchBox: {
    position: 'relative',
    padding: 10,
  },
  searchInput: {
    paddingLeft: 36,
    paddingRight: 50,
    color: '#5d5d5d',
    fontSize: 12,
    backgroundColor: '#fff',
    borderRadius: 7,
    fontFamily: 'Gilroy-Medium',
    height: 45,
  },
  searchIcon: {
    position: 'absolute',
    top: 24,
    left: 20,
    elevation: 1,
    zIndex: 1
  },
  filterImageButton: {
    position: 'absolute',
    top: 18,
    right: 20,
    zIndex: 1,
    elevation: 1
  },
})