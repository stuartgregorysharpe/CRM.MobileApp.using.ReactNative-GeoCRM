import {ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomerSalesHistoryView from '../components/CustomerSalesHistoryView';
import {Constants, Values} from '../../../../../constants';
import {getApiRequest} from '../../../../../actions/api.action';
import {useDispatch} from 'react-redux';
import {expireToken} from '../../../../../constants/Helper';
import {Notification} from '../../../../../components/modal/Notification';
import {showNotification} from '../../../../../actions/notification.action';

export default function CustomerSalesHistoryContainer(props) {
  const {locationId} = props;
  const [sections, setSections] = useState([]);
  const [totalTurnOver, setTotalTurnOver] = useState(null);
  const dispatch = useDispatch();

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
        console.log('customer-sales-history-v2 error: ', e);
        if (e == 'error') {
          if (props.onButtonAction) {
            props.onButtonAction({
              type: Constants.actionType.ACTION_CLOSE,
            });
          }
          dispatch(
            showNotification({
              type: 'success',
              message:
                'No Device allocated, please allocate a device to view sales history',
              buttonText: 'Ok',
            }),
          );
        } else {
          expireToken(dispatch, e);
        }
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
      <Notification />
    </View>
  );
}
