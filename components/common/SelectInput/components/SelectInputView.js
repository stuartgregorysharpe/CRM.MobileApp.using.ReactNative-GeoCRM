import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Colors, Fonts} from '../../../../constants';
import {whiteLabel} from '../../../../constants/Colors';
import SvgIcon from '../../../SvgIcon';

const SelectInputView = props => {

  const {description, placeholder, showDescription, text, hasError} = props;
  const iconName = props.dropdownIcon || 'Drop_Down';
  const showText = text != undefined && text != null && text != '';

  const onPress = () => {
    if (props.onPress) {
      props.onPress();
    }
  };
  
  const renderTopDescription = descriptionText => {
    return <Text style={styles.descriptionText}>{descriptionText}</Text>;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        props.style,
        {
          borderColor: hasError
            ? whiteLabel().endDayBackground
            : whiteLabel().fieldBorder,
        },
      ]}>
      {props.bgType != 'card' &&
        showDescription &&
        renderTopDescription(description)}
      {showText ? (
        <Text
          mode="outlined"
          style={{flex: 1, color: Colors.blackColor}}
          outlineColor={
            hasError ? whiteLabel().endDayBackground : Colors.blackColor
          }>
          {text}
        </Text>
      ) : (
        <Text
          mode="outlined"
          style={[{flex: 1, color: Colors.placeholder}, props.placeholderStyle,{marginBottom:3}]}
          outlineColor={
            hasError ? whiteLabel().endDayBackground : whiteLabel().fieldBorder
          }>
          {placeholder}
        </Text>
      )}
      {!props.hideSuffixIcon && (
        <View style={{marginRight: 10}}>
          <SvgIcon icon={iconName} width="23px" height="23px" />
        </View>
      )}
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
    minHeight:40,
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
