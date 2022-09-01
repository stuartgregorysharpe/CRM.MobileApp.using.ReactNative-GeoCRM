import React from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {Fonts, Values} from '../../../../constants';
import {whiteLabel} from '../../../../constants/Colors';
import BrandFacingItem from './BrandFacingItem';

const BrandFacingList = props => {
  const {items} = props;
  const renderItem = (item, index) => {
    const isLast = index == items.length - 1;
    return (
      <BrandFacingItem
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
        <Text style={[styles.title, {width: 70}]}>Facings</Text>
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

export default BrandFacingList;
