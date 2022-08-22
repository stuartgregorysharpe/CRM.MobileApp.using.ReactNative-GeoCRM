import React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import {Colors, Constants, Fonts, Values} from '../../../../constants';
import {whiteLabel} from '../../../../constants/Colors';

const BrandFacingItem = props => {
  const {item} = props;
  if (!item) return null;
  const {name, facing, type} = item;

  const onChangeFacing = (facingText, isConvertToNumber) => {
    let nextFacing = isConvertToNumber
      ? Number(facingText).toFixed(0)
      : facingText;
    if ((nextFacing == 0 || nextFacing == 'NaN') && isConvertToNumber) {
      nextFacing = '';
    }
    if (props.onItemAction) {
      props.onItemAction({
        type: Constants.actionType.ACTION_CHANGE_ITEM_FACING,
        item,
        facing: nextFacing,
      });
    }
  };
  return (
    <View style={[styles.container, styles.bottomBorder, props.style]}>
      <Text style={styles.text}>{name}</Text>

      <TextInput
        style={styles.textInput}
        value={facing + ''}
        onChangeText={text => {
          onChangeFacing(text);
        }}
        onBlur={() => {
          onChangeFacing(facing, true);
        }}
        onEndEditing={() => {
          onChangeFacing(facing, true);
        }}
        keyboardType={'number-pad'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    marginHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
  },
  bottomBorder: {
    borderBottomColor: whiteLabel().fieldBorder,
    borderBottomWidth: 1,
  },
  text: {
    fontFamily: Fonts.primaryMedium,
    fontSize: Values.fontSize.xSmall,
    color: Colors.primaryColor,
    flex: 1,
  },
  textInput: {
    fontSize: Values.fontSize.xSmall,
    color: Colors.primaryColor,
    lineHeight: 12,
    textAlign: 'center',
    minHeight: 24,
    padding: 0,
    borderRadius: 4,
    marginRight: 12,
    borderWidth: 1,
    borderColor: whiteLabel().inputText,
    width: 70,
  },
});

export default BrandFacingItem;
