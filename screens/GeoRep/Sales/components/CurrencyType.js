import {StyleSheet, View} from 'react-native';
import React from 'react';
import {AppText} from '../../../../components/common/AppText';
import {Colors} from '../../../../constants';
import {whiteLabel} from '../../../../constants/Colors';
import CCheckBox from '../../../../components/common/CCheckBox';

const CurrencyType = props => {
  const {lists, selectedItem} = props;
  console.log('selectedItem', selectedItem);
  const onValueChange = item => {
    if (props.onItemSelected) props.onItemSelected(item);
  };

  const getCheckedStatus = item => {
    if (selectedItem != undefined && selectedItem != null) {
      if (item.symbol === selectedItem.symbol) {
        return true;
      }
    }
    return false;
  };

  return (
    <View style={{alignSelf: 'stretch'}}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 2}}>
          <AppText title="Symbol" color={whiteLabel().mainText}></AppText>
        </View>

        <View style={{flex: 2}}>
          <AppText title="Currency" color={whiteLabel().mainText}></AppText>
        </View>

        <View style={{flex: 3}}>
          <AppText
            title="Exchange Rate"
            color={whiteLabel().mainText}></AppText>
        </View>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: whiteLabel().fieldBorder,
          marginTop: 5,
        }}></View>

      {lists.map((item, index) => {
        return (
          <View key={index}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <View style={{flex: 2}}>
                <AppText title={item.symbol}></AppText>
              </View>

              <View style={{flex: 2}}>
                <AppText title={item.abbreviation}></AppText>
              </View>

              <View
                style={{flex: 3, flexDirection: 'row', alignItems: 'center'}}>
                <AppText
                  title={'1 : ' + item.exchange_rate}
                  style={{flex: 1}}></AppText>
                <CCheckBox
                  value={getCheckedStatus(item)}
                  style={styles.checkbox}
                  onValueChange={() => {
                    onValueChange(item);
                  }}
                />
              </View>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: Colors.lightGreyColor,
              }}></View>
          </View>
        );
      })}
    </View>
  );
};

export default CurrencyType;

const styles = StyleSheet.create({
  checkbox: {
    marginRight: 0,
    width: 25,
    height: 25,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: whiteLabel().itemSelectedBackground,
    borderWidth: 1,
    borderColor: whiteLabel().itemSelectedBackground,
  },
});
