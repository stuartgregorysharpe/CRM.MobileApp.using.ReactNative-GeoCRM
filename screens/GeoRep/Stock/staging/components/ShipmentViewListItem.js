import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import ExpandableCardView from '../../../../../components/common/ExpandableCardView';
import {Fonts, Values} from '../../../../../constants';
import {whiteLabel} from '../../../../../constants/Colors';
import {style} from '../../../../../constants/Styles';
import ICCIDList from './ICCIDList';

const ShipmentViewListItem = props => {
  const {item} = props;
  if (!item) return null;
  const {network, items} = item;
  return (
    <View style={[styles.container, props.style]}>
      <ExpandableCardView
        renderTitleSection={() => {
          return (
            <View style={styles.headerSection}>
              <Text style={styles.text}>{network}</Text>
              <Text style={styles.text}>{`Items: ${items.length}`}</Text>
            </View>
          );
        }}
        style={[{marginHorizontal: 16, marginBottom: 8}, style.cardContainer]}>
        <ICCIDList items={items} onItemAction={props.onItemAction} />
      </ExpandableCardView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 10,
  },
  text: {
    fontFamily: Fonts.primaryRegular,
    fontSize: Values.fontSize.xSmall,
    color: whiteLabel().inputText,
  },
  container: {
    alignSelf: 'stretch',
  },
});

export default ShipmentViewListItem;
