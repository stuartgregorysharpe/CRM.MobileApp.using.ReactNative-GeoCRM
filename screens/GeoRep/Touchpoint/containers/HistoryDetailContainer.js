import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import FormSubmitFeedbackContainer from '../../../../components/shared/FormSubmitFeedback/containers/FormSubmitFeedbackContainer';
import {getApiRequest} from '../../../../actions/api.action';
import {Constants} from '../../../../constants';
import {ScrollView} from 'react-native-gesture-handler';
const HistoryDetailContainer = props => {
  const {historyId} = props;
  const [isLoading, setIsLoading] = useState(false);
  const [item, setItem] = useState(null);
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
        console.log('fetchedData', JSON.stringify(fetchedData));
        setItem(fetchedData);
      })
      .catch(error => {
        setIsLoading(false);
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
