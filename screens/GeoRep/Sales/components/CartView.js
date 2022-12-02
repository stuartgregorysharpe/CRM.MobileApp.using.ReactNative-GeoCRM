import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {SubmitButton} from '../../../../components/shared/SubmitButton';

import {style} from '../../../../constants/Styles';
import CartSettingsView from './CartSettingsView';
import CartStatisticsView from './CartStatisticView';
import CartWarehouseItemView from './CartWarehouseItemView';

const CartView = props => {
  const cartStatistics = {
    itemCount: 2,
    unitCount: 2,
    discount: 200,
    subTotal: 67798,
    tax: 10169.7,
    total: 77967.7,
  };
  const wareHouseGroups = [
    {
      warehouse_id: 1,
      title: 'Johannesburg Warehouse',
      itemCount: 1,
    },
    {
      warehouse_id: 2,
      title: 'Johannesburg Warehouse 2',
      itemCount: 2,
    },
  ];

  const onWarehouseItemPress = item => {
    if (props.onWarehouseItemPress) {
      props.onWarehouseItemPress(item);
    }
  };
  const onTotalProductPress = () => {
    if (props.onTotalProductPress) {
      props.onTotalProductPress();
    }
  };
  const onNext = () => {
    if (props.onNext) {
      props.onNext();
    }
  };
  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1}} contentContainerStyle={{flex: 1}}>
        <CartSettingsView
          customerName="Best Deal Trading"
          address="Century City Cape Town 7441, South Africa, Cape Town Western Cape, 7441, South Africa"
          style={{margin: 8}}
        />
        <CartStatisticsView
          data={cartStatistics}
          style={{marginHorizontal: 8}}
        />
        {wareHouseGroups.map((wareHouse, index) => {
          return (
            <CartWarehouseItemView
              key={index + 'warehouse'}
              title={wareHouse.title}
              itemCount={wareHouse.itemCount}
              style={{marginHorizontal: 8, marginTop: 10}}
              onPress={() => {
                onWarehouseItemPress(wareHouse);
              }}
            />
          );
        })}
      </ScrollView>
      <SubmitButton
        title="Next"
        onSubmit={onNext}
        style={{marginHorizontal: 8, marginBottom: 16}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex: 1,
  },
});

export default CartView;
