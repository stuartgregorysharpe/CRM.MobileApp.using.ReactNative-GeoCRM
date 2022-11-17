import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import CSingleSelectInput from '../../../../../components/common/SelectInput/CSingleSelectInput';
import {Fonts} from '../../../../../constants';
import {whiteLabel} from '../../../../../constants/Colors';

const StockListFilterContainer = props => {
  const [filterData, setFilterData] = useState({stockType: null});
  useEffect(() => {
    setFilterData(props.filters);
  }, [props.filters]);
  const deviceTypeList = [
    {
      label: 'Device',
      value: 'Device',
    },
    {
      label: 'Consumables',
      value: 'Consumables',
    },
    {
      label: 'Sim',
      value: 'Sim',
    },
  ];

  return (
    <View style={[styles.container, props.style]}>
      <CSingleSelectInput
        description={'Stock Type'}
        placeholder={'Select Stock Type'}
        checkedValue={filterData.stockType}
        mode='single'
        items={deviceTypeList}
        hasError={false}
        disabled={false}
        onSelectItem={item => {
          setFilterData({stockType: item.value});
        }}
        containerStyle={{marginTop: 10, marginBottom: 16}}
      />
      <Button
        mode="contained"
        color={whiteLabel().actionFullButtonBackground}
        uppercase={false}
        labelStyle={{
          fontSize: 14,
          fontFamily: Fonts.secondaryBold,
          letterSpacing: 0.2,
        }}
        onPress={() => {
          if (props.onApply) {
            props.onApply(filterData);
          }
        }}>
        Apply Filters
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    padding: 8,
  },
});

export default StockListFilterContainer;
