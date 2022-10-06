import {ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomerSalesHistoryView from '../components/CustomerSalesHistoryView';
import {Values} from '../../../../../constants';
import {getApiRequest} from '../../../../../actions/api.action';

export default function CustomerSalesHistoryContainer(props) {
  const {locationId} = props;
  const [sections, setSections] = useState([]);
  const [totalTurnOver, setTotalTurnOver] = useState(null);
  useEffect(() => {
    onLoad();
  }, []);
  const onLoad = () => {
    const postData = {
      location_id: locationId,
    };
    getApiRequest('locations/customer-sales-history-v2', postData)
      .then(res => {
        setSections(res.sections);
        setTotalTurnOver(res.total_turnover);
      })
      .catch(e => {
        console.log('E', e);
      });
  };
  return (
    <View
      style={[{alignSelf: 'stretch', flex: 1, marginBottom: 30}, props.style]}>
      <ScrollView style={{maxHeight: Values.deviceHeight * 0.8}}>
        <CustomerSalesHistoryView
          sections={sections}
          totalTurnOver={totalTurnOver}
          {...props}
        />
      </ScrollView>
    </View>
  );
}
