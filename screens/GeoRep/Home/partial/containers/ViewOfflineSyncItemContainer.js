import {View} from 'react-native';
import React, {useState, useEffect} from 'react';
import ViewOfflineSyncItem from '../components/ViewOfflineSyncItem';
import {getAllOfflineSyncItem} from '../../../../../sqlite/OfflineSyncItemsHelper';
import {useIsFocused} from '@react-navigation/native';

const ViewOfflineSyncItemContainer = props => {
  const {onClosed, onSyncStart, isManual} = props;
  const [count, setCount] = useState(3);
  const isFocused = useIsFocused();

  useEffect(() => {
    getCount();
  }, [isFocused]);

  const getCount = async () => {
    const items = await getAllOfflineSyncItem();
    setCount(items.length);
  };

  const updateCount = message => {
    getCount();
    onSyncStart(message);  
  };

  return (
    <View>
      <ViewOfflineSyncItem
        changeIsManual={flag => {
          if (props.changeIsManual) {
            props.changeIsManual(flag);
          }
        }}
        count={count}
        isManual={isManual}
        onClosed={onClosed}
        updateCount={message => {
          updateCount(message);
        }}
      />
    </View>
  );
};

export default ViewOfflineSyncItemContainer;
