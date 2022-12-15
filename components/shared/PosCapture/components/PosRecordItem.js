import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Colors, Constants, Fonts, Values} from '../../../../constants';
import {whiteLabel} from '../../../../constants/Colors';
import SvgIcon from '../../../SvgIcon';

const PosRecordItem = props => {
  const {item} = props;
  if (!item) return null;
  const {touchpoint, placement_type, area, qty, product_name} = item;

  return (
    <View style={[styles.container, props.style]}>
      <Text style={[styles.text, {flex: 1}]}>{touchpoint}</Text>
      <Text style={[styles.text, {flex: 2}]}>{placement_type}</Text>
      <Text style={[styles.text, {flex: 3, paddingHorizontal: 4}]}>
        {product_name}
      </Text>
      <Text style={[styles.text, {flex: 1, textAlign: 'center'}]}>{qty}</Text>
      <View style={{width: 30}}>
        <TouchableOpacity
          onPress={() => {
            if (props.onItemAction) {
              props.onItemAction({
                type: Constants.actionType.ACTION_REMOVE,
                item: props.item,
              });
            }
          }}>
          <SvgIcon icon="DELETE" width="20" height="20" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 40,
    marginHorizontal: 8,
    borderBottomColor: whiteLabel().lineSeperator,
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  text: {
    fontSize: Values.fontSize.small,
    fontFamily: Fonts.primaryBold,
    color: whiteLabel().inputText,
  },
});

export default PosRecordItem;
