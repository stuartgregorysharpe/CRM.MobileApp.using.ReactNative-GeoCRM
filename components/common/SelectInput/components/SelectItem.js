import React from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';
import {Colors, Constants, Fonts} from '../../../../constants';
import {whiteLabel} from '../../../../constants/Colors';
import CCheckBox from '../../CCheckBox';

const SelectItem = props => {

  const {isChecked, item} = props;
  const {label} = item;
  
  const onValueChange = value => {
    if (props.onItemAction) {
      props.onItemAction({
        type: Constants.actionType.ACTION_CHECK,
        item: item,
        value: value,
      });
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        onValueChange(!isChecked);
      }}>
      <View style={[styles.container, props.style]}>
        <Text style={styles.title}>{label}</Text>
        <CCheckBox
          value={isChecked}
          onValueChange={onValueChange}
          style={styles.checkbox}
        />
      </View>
    </TouchableWithoutFeedback>
  );
  
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    minHeight: 32,
    flexDirection: 'row',
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.primaryBold,
    color: Colors.blackColor,
    flex: 1,
  },
  checkbox: {
    width: 25,
    height: 25,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: whiteLabel().itemSelectedBackground,
    borderWidth: 1,
    borderColor: whiteLabel().itemSelectedBackground,
  },
});

export default SelectItem;
