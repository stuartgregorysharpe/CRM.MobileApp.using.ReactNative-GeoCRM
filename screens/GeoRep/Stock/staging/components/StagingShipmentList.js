import React from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {Fonts, Values, Constants} from '../../../../../constants';
import {whiteLabel} from '../../../../../constants/Colors';

import StagingShipmentItem from './StagingShipmentItem';

const StagingShipmentList = props => {
  const {items} = props;
  const renderItem = (item, index) => {
    const isLast = index == items.length - 1;
    return (
      <StagingShipmentItem
        item={item}
        key={index + 'item'}
        onItemAction={props.onItemAction}
        isLast={isLast}
      />
    );
  };
  return (
    <View style={[styles.container, props.style]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 40,
          borderBottomColor: whiteLabel().actionFullButtonBackground,
          borderBottomWidth: 2,
          marginHorizontal: 8,
          marginBottom: 8,
        }}>
        <Text style={[styles.title, {flex: 1}]}>Description</Text>
        <Text style={[styles.title, {flex: 1}]}>Added Date</Text>
        <View style={{flex: 1}} />
      </View>
      <FlatList
        data={items}
        renderItem={({item, index}) => renderItem(item, index)}
        keyExtractor={(item, index) => index.toString()}
        extraData={this.props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  title: {
    fontSize: Values.fontSize.small,
    fontFamily: Fonts.primaryRegular,
    color: whiteLabel().mainText,
  },
});

export default StagingShipmentList;