import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import FormatPriceItem from './FormatPriceItem';

const FormatPriceList = props => {
  const {items} = props;
  console.log('items', items);
  const renderItem = (item, index) => {
    const isLast = index == items.length - 1;
    return (
      <FormatPriceItem
        item={item}
        key={index + 'item'}
        onItemAction={props.onItemAction}
        isLast={isLast}
      />
    );
  };
  return (
    <View style={[styles.container, props.style]}>
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
});

export default FormatPriceList;
