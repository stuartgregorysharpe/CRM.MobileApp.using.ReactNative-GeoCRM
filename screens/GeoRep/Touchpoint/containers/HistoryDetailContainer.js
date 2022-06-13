import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import dummyData from '../dummyData.json';
import FormSubmitFeedbackContainer from '../../../../components/shared/FormSubmitFeedback/containers/FormSubmitFeedbackContainer';
import {dummyApiRequest} from '../../../../actions/api.action';
import {Constants} from '../../../../constants';
const HistoryDetailContainer = props => {
  const {historyId} = props;
  const [isLoading, setIsLoading] = useState(false);
  const [item, setItem] = useState(null);
  useEffect(() => {
    onLoad();
  }, []);
  const onLoad = () => {
    const params = {
      historyId: historyId,
    };
    setIsLoading(true);
    dummyApiRequest(
      'touchpoints/history-detail',
      params,
      dummyData.historyDetail,
    )
      .then(fetchedData => {
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
    <FormSubmitFeedbackContainer
      data={item}
      isShowInScreen={true}
      onButtonAction={onButtonAction}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HistoryDetailContainer;
