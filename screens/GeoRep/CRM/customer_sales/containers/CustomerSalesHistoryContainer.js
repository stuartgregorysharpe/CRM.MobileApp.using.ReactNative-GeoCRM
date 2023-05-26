import { View} from 'react-native';
import React, { useRef , useEffect, useState } from 'react';
import CustomerSalesHistoryView from '../components/CustomerSalesHistoryView';
import { Constants, Values} from '../../../../../constants';
import { getApiRequest} from '../../../../../actions/api.action';
import { useDispatch} from 'react-redux';
import { expireToken} from '../../../../../constants/Helper';
import AlertModal from '../../../../../components/modal/AlertModal';

export default function CustomerSalesHistoryContainer(props) {

  const {locationId} = props;
  const alertModalRef = useRef(null);
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
        if (e == 'error_400') {                    
          if(alertModalRef.current)
            alertModalRef.current.alert('No Turnover History Found');          
        } else {
          expireToken(dispatch, e , alertModalRef);
        }
      });
  };

  return (
    <View
      style={[{alignSelf: 'stretch', flex: 1, marginBottom: 30}, props.style]}>

      <AlertModal 
          onModalClose={(res) => {
            if (props.onButtonAction) {
              props.onButtonAction({
                type: Constants.actionType.ACTION_CLOSE,
              });
            }
          }}
      ref={alertModalRef} />
      

      <View style={{maxHeight: Values.deviceHeight * 0.8}}>       
        <CustomerSalesHistoryView
          sections={sections}
          totalTurnOver={totalTurnOver}
          {...props}
        />
      </View>
                  
    </View>
  );
}
