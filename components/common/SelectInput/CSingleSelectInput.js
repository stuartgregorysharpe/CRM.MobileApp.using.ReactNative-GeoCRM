import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import SelectInputView from './components/SelectInputView';

const CSingleSelectInput = props => {
  const [text, setText] = useState('');
  const {placeholder} = props;
  const onOpenPicker = () => {};
  return (
    <View style={[styles.container, props.containerStyle]}>
      <SelectInputView placeholder={placeholder} onPress={onOpenPicker} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
});

export default CSingleSelectInput;
