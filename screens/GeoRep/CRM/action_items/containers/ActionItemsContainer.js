import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Actions from '../../../Home/Actions/Actions';
import CTabSelector from '../../../../../components/common/CTabSelector';
import CardView from '../../../../../components/common/CardView';
const ActionItemsContainer = props => {
  const {locationId} = props;
  const [tabIndex, setTabIndex] = useState(0);
  const tabs = [
    {title: 'All', id: 0},
    {title: 'Tasks', id: 1},
    {title: 'Action Items', id: 2},
    {title: 'Completed', id: 3},
  ];

  return (
    <View style={[styles.container, props.style]}>
      <View style={{marginTop: 10, marginHorizontal: 10}}>
        <CardView>
          <CTabSelector
            items={tabs}
            selectedIndex={tabIndex}
            onSelectTab={(item, index) => {
              setTabIndex(index);
            }}
          />
        </CardView>
      </View>
      <Actions locationId={locationId} tabIndex={tabIndex}></Actions>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex: 1,
  },
});

export default ActionItemsContainer;
