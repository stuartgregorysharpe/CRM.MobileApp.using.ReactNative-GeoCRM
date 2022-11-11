import React from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {Fonts, Values} from '../../../../constants';
import {whiteLabel} from '../../../../constants/Colors';
import PosRecordItem from './PosRecordItem';

const PosRecordList = props => {
  const {items} = props;
  const renderItem = (item, index) => {
    const isLast = index == items.length - 1;
    return (
      <PosRecordItem
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
          paddingHorizontal: 8,
          marginBottom: 8,
        }}>
        <Text style={[styles.title, {flex: 1}]}>Tp</Text>
        <Text style={[styles.title, {flex: 2}]}>Type</Text>
        <Text style={[styles.title, {flex: 3}]}>POS</Text>
        <Text style={[styles.title, {flex: 1, textAlign: 'center'}]}>Qty</Text>
        <View style={{width: 30}}></View>
      </View>
      <FlatList
        data={items}
        style={{
          maxHeight: Values.deviceHeight * 0.6,
          minHeight: Values.deviceHeight * 0.2,
          marginHorizontal: 8,
        }}
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

export default PosRecordList;
