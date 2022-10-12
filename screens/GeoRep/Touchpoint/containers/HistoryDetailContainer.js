import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import FormSubmitFeedbackContainer from '../../../../components/shared/FormSubmitFeedback/containers/FormSubmitFeedbackContainer';
import {getApiRequest} from '../../../../actions/api.action';
import {ScrollView} from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { expireToken } from '../../../../constants/Helper';

const HistoryDetailContainer = props => {
  const {historyId} = props;
  const [isLoading, setIsLoading] = useState(false);
  const [item, setItem] = useState(null);
  const dispatch = useDispatch()
  
  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    const params = {
      submission_id: historyId,
    };
    setIsLoading(true);
    getApiRequest('forms/form-areas-for-improvement', params)
      .then(fetchedData => {        
        setItem(fetchedData);
      })
      .catch(e => {
        setIsLoading(false);
        expireToken(dispatch , e);
      });
  };

  const onButtonAction = ({type}) => {
    if (props.onButtonAction) {
      props.onButtonAction({type});
    }
  };
  return (
    <ScrollView style={styles.container}>
      <FormSubmitFeedbackContainer
        data={item}
        isShowInScreen={true}
        onButtonAction={onButtonAction}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30,
  },
});

export default HistoryDetailContainer;
