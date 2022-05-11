import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import CounterItem from './CounterItem';

const CounterItemList = props => {
  const {items, step, fixed} = props;

  const renderItem = (item, index) => {
    const isLast = index == items.length - 1;
    return (
      <CounterItem
        item={item}
        key={index + 'counter'}
        style={{marginRight: 8}}
        onItemAction={props.onItemAction}
        step={step}
        fixed={fixed}
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

export default CounterItemList;
