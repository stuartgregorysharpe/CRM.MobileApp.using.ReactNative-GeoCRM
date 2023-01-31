import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import SvgIcon from '../../../../../components/SvgIcon';
import {Values, Fonts, Colors, Constants} from '../../../../../constants';
import {whiteLabel} from '../../../../../constants/Colors';
import {formatDate} from '../../../../../helpers/formatHelpers';
import AcceptButton from './AcceptButton';

const StagingShipmentItem = props => {
  const {item} = props;
  if (!item) return null;
  const {network, items, date} = item;
  const quantity = items.length;
  const quantityLabel = `Qty: ${quantity}`;
  const addedDate = formatDate(
    date,
    Constants.dateFormat.DATE_FORMAT_DATE_TIME,
  );
  const onItemAction = type => {
    if (props.onItemAction) {
      props.onItemAction({type: type, item: item});
    }
  };
  return (
    <View style={[styles.container, styles.bottomBorder, props.style]}>
      <View
        style={{flexDirection: 'column', justifyContent: 'center', flex: 1}}>
        <Text style={styles.title}>{network}</Text>
        <Text style={styles.description}>{quantityLabel}</Text>
      </View>
      <Text style={[styles.text, {flex: 1}]}>{addedDate}</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingRight: 4,
          flex: 1,
        }}>
        {/*
        <AcceptButton
          onPress={() => {
            onItemAction(Constants.actionType.ACTION_ACCEPT);
          }}
          style={{marginRight: 10}}
        />
         */}

        <TouchableOpacity
          onPress={() => {
            onItemAction(Constants.actionType.ACTION_VIEW);
          }}>
          <SvgIcon icon="Drop_Down" width="20px" height="20px" />
        </TouchableOpacity>
      </View>
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
    borderBottomColor: whiteLabel().lineSeperator,
    borderBottomWidth: 1,
  },
  text: {
    fontFamily: Fonts.primaryMedium,
    fontSize: Values.fontSize.xSmall,
    color: whiteLabel().inputText,
    flex: 1,
  },
  title: {
    fontFamily: Fonts.primaryBold,
    fontSize: Values.fontSize.xSmall,
    color: whiteLabel().inputText,
  },
  description: {
    fontFamily: Fonts.primaryMedium,
    fontSize: Values.fontSize.xSmall,
    color: whiteLabel().itemDescriptionText,
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

export default StagingShipmentItem;
