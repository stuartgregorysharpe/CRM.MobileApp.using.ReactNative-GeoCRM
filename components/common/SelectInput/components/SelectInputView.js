import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Colors, Fonts} from '../../../../constants';
import {whiteLabel} from '../../../../constants/Colors';
import SvgIcon from '../../../SvgIcon';

const SelectInputView = props => {
  const {description, showDescription, text} = props;
  const iconName = props.dropdownIcon || 'Drop_Down';
  const onPress = () => {
    if (props.onPress) {
      props.onPress();
    }
  };
  const renderTopDescription = descriptionText => {
    return <Text style={styles.descriptionText}>{descriptionText}</Text>;
  };
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, props.style]}>
      {showDescription && renderTopDescription(description)}
      <Text
        mode="outlined"
        style={{flex: 1}}
        outlineColor={whiteLabel().fieldBorder}>
        {text}
      </Text>
      <View style={{marginRight: 10}}>
        <SvgIcon icon={iconName} width="23px" height="23px" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  descriptionText: {
    position: 'absolute',
    top: -8,
    left: 8,
    fontSize: 12,
    paddingHorizontal: 2,
    color: Colors.disabledColor,
    backgroundColor: Colors.bgColor,
  },
  container: {
    alignSelf: 'stretch',
    height: 40,
    fontSize: 14,
    lineHeight: 30,
    backgroundColor: Colors.bgColor,
    borderColor: whiteLabel().fieldBorder,
    fontFamily: Fonts.primaryRegular,
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 10,
    paddingTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SelectInputView;
