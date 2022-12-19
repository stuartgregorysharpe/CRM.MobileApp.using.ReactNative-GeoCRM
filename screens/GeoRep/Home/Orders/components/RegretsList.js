import React from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {Fonts, Values} from '../../../../../constants';
import {whiteLabel} from '../../../../../constants/Colors';
import RegretItem from './RegretItem';

const RegretsList = props => {
  const {items} = props;
  const renderItem = (item, index) => {
    const isLast = index == items.length - 1;
    return (
      <RegretItem
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
          marginBottom: 8,
          borderBottomColor: whiteLabel().actionOutlineButtonBorder,
          borderBottomWidth: 2,
        }}>
        <Text style={styles.title}>Order Details</Text>
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
    marginHorizontal: 8,
  },
  title: {
    fontSize: Values.fontSize.small,
    fontFamily: Fonts.primaryBold,
    color: whiteLabel().mainText,
    fontWeight: 'bold',
  },
});

export default RegretsList;
