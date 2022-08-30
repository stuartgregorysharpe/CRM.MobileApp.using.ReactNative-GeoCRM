import React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import {Colors, Constants, Fonts, Values} from '../../../../constants';
import {whiteLabel} from '../../../../constants/Colors';
import {integerFieldValidator} from '../../../../constants/Helper';
import {style} from '../../../../constants/Styles';
import {formatDate} from '../../../../helpers/formatHelpers';

const FSUCampaignItem = props => {
  const {item} = props;
  if (!item) return null;
  const {name, placed, type} = item;

  const onChangePlaced = (_placedText, _isConvertToNumber) => {
    let isConvertToNumber = _isConvertToNumber;
    let placedText = _placedText;
    if (typeof placedText === 'string' || placedText instanceof String) {
      while (!integerFieldValidator(placedText) && placedText != '') {
        placedText = placedText.substring(0, placedText.length - 1);
      }
    }
    let nextPlaced = isConvertToNumber
      ? Number(placedText).toFixed(0)
      : placedText;
    if ((nextPlaced == 0 || nextPlaced == 'NaN') && isConvertToNumber) {
      nextPlaced = '';
    }
    if (props.onItemAction) {
      props.onItemAction({
        type: Constants.actionType.ACTION_CHANGE_ITEM_PLACED,
        item,
        placed: nextPlaced,
      });
    }
  };
  return (
    <View style={[styles.container, style.boxShadow, props.style]}>
      <View style={[styles.rowContainer, styles.bottomBorder, {height: 40}]}>
        <Text style={styles.title}>{item.campaign_name}</Text>
      </View>
      <View style={[styles.rowContainer, {justifyContent: 'space-between'}]}>
        <Text style={styles.text}>{'Percentage Achieved'}</Text>
        <View style={styles.valueContainer}>
          <Text style={styles.title}>{item.achieved + '%'}</Text>
        </View>
      </View>
      <View style={[styles.rowContainer, {justifyContent: 'space-between'}]}>
        <Text style={styles.text}>{'FSU Target'}</Text>
        <View style={styles.valueContainer}>
          <Text style={styles.text}>{item.target}</Text>
        </View>
      </View>
      <View style={[styles.rowContainer, {justifyContent: 'space-between'}]}>
        <Text style={styles.text}>{'FSU Previously Placed'}</Text>
        <Text style={styles.description}>
          {formatDate(
            item.previous.date,
            Constants.dateFormat.DATE_FORMAT_SHORT_NAME,
          )}
        </Text>
        <View
          style={[styles.valueContainer, styles.bottomBorder, {height: 24}]}>
          <Text style={styles.text}>{item.previous.placed}</Text>
        </View>
      </View>
      <View style={styles.splitLine} />
      <View style={[styles.rowContainer, {justifyContent: 'space-between'}]}>
        <Text style={styles.text}>{"Remaining FSU's"}</Text>
        <View style={styles.valueContainer}>
          <Text style={styles.text}>{item.remaining}</Text>
        </View>
      </View>
      <View style={[styles.rowContainer, {justifyContent: 'space-between'}]}>
        <Text style={styles.text}>{"FSU's Placed Since Last Visit"}</Text>
        <View style={styles.valueContainer}>
          <TextInput
            style={styles.textInput}
            value={placed + ''}
            onChangeText={text => {
              onChangePlaced(text);
            }}
            onBlur={() => {
              onChangePlaced(placed, true);
            }}
            onEndEditing={() => {
              onChangePlaced(placed, true);
            }}
            keyboardType={'number-pad'}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    marginHorizontal: 8,
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
  },
  bottomBorder: {
    borderBottomColor: whiteLabel().fieldBorder,
    borderBottomWidth: 1,
  },
  description: {
    fontFamily: Fonts.primaryMedium,
    fontSize: Values.fontSize.xSmall,
    color: whiteLabel().helpText,
  },
  title: {
    fontFamily: Fonts.primaryBold,
    fontSize: Values.fontSize.xSmall,
    color: Colors.primaryColor,
  },
  text: {
    fontFamily: Fonts.primaryMedium,
    fontSize: Values.fontSize.xSmall,
    color: Colors.textColor,
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
    borderWidth: 1,
    borderColor: whiteLabel().inputText,
    width: 38,
  },
  valueContainer: {
    width: 38,
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  splitLine: {
    height: 1,
    marginVertical: 4,
    alignSelf: 'stretch',
    backgroundColor: whiteLabel().lineSeperator,
  },
});

export default FSUCampaignItem;
