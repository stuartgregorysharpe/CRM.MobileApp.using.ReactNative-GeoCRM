import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {TopTab} from '../../../../components/common/TopTab';
import {checkConnectivity} from '../../../../DAO/helper';
import Regrets from './Regrets';
import Summary from './Summary';

const Orders = props => {
  const {navigation} = props;
  const features = useSelector(
    state => state.selection.payload.user_scopes.geo_rep.features,
  );
  const [tabIndex, setTabIndex] = useState(0);
  let headers = ['Summary'];
  if (features.includes('dash_regrets')) {
    headers.push('Regrets');
  }
  return (
    <View style={[styles.container, props.style]}>
      <TopTab
        tabIndex={tabIndex}
        textStyle={{fontSize: 13}}
        headers={headers}
        inactiveBarColor="transparent"
        onTabClicked={index => {
          checkConnectivity().then(isConnected => {
            if (isConnected) {
              setTabIndex(index);
            } else {
              showOfflineDialog(dispatch);
            }
          });
        }}
      />
      {tabIndex === 0 && <Summary />}
      {tabIndex === 1 && <Regrets navigation={navigation} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex: 1,
  },
});

export default Orders;
