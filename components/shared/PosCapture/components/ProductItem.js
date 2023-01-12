import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Constants, Fonts, Values} from '../../../../constants';
import {whiteLabel} from '../../../../constants/Colors';

const ProductItem = props => {
  const {item} = props;
  if (!item) return null;
  const {brand, product_name, product_type} = item;

  return (
    <TouchableOpacity
      style={[styles.container, styles.bottomBorder, props.style]}
      onPress={() => {
        if (props.onItemAction) {
          props.onItemAction({
            type: Constants.actionType.ACTION_VIEW,
            item: item,
          });
        }
      }}>
      <Text style={styles.text}>{product_type}</Text>
      <Text style={[styles.text]}>{product_name}</Text>
      <Text style={[styles.text, {marginLeft: 16}]}>{brand}</Text>
    </TouchableOpacity>
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
    minHeight: 40,
  },

  text: {
    fontFamily: Fonts.primaryMedium,
    fontSize: Values.fontSize.xSmall,
    color: whiteLabel().inputText,
    flex: 1,
  },
});

export default ProductItem;
