import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {SubmitButton} from '../../../../components/shared/SubmitButton';
import CartSettingsView from './CartSettingsView';
import CartStatisticsView from './CartStatisticView';
import CartWarehouseItemView from './CartWarehouseItemView';

const CartView = props => {

  const {cartStatistics, wareHouseGroups, defineSetup} = props;

  const location = defineSetup?.location;
  const currency = defineSetup?.currency_id;

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
      <ScrollView style={{flex: 1 }} >
        <CartSettingsView
          customerName={location?.name}
          address={location?.address}
          onPressSettings={props.onPressSettings}
          style={{margin: 8}}
        />
        <CartStatisticsView
          data={cartStatistics}
          currency={currency}
          style={{marginHorizontal: 8}}
          onPress={onTotalProductPress}
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
