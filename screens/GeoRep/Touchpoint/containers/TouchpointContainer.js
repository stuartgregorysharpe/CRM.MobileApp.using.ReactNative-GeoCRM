import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import CTabSelector from '../../../../components/common/CTabSelector';
import {boxShadow, style} from '../../../../constants/Styles';
import HistoryContainer from './HistoryContainer';
import HistoryDetailContainer from './HistoryDetailContainer';
import LeaderboardContainer from './LeaderboardContainer';
import TrendsContainer from './TrendsContainer';

const TouchpointContainer = props => {
  const [tabIndex, setTabIndex] = useState(0);
  const [isHistoryDetail, setIsHistoryDetail] = useState(false);
  const [historyId, setHistoryId] = useState(null);
  const {locationId} = props;
  const tabs = [
    {title: 'Leaderboard', id: 0},
    {title: 'Trends', id: 1},
    {title: 'History', id: 2},
  ];

  const renderContent = selectedTabIndex => {
    if (selectedTabIndex == 0) {
      return <LeaderboardContainer />;
    } else if (selectedTabIndex == 1) {
      return <TrendsContainer locationId={locationId} />;
    } else if (selectedTabIndex == 2) {
      if (isHistoryDetail) {
        return (
          <HistoryDetailContainer
            historyId={historyId}
            onButtonAction={({type}) => {
              setIsHistoryDetail(false);
            }}
          />
        );
      }
      return (
        <HistoryContainer
          locationId={locationId}
          onItemAction={({type, item}) => {
            setIsHistoryDetail(true);
            setHistoryId(item.id);
          }}
        />
      );
    }
    return null;
  };
  return (
    <View style={[styles.container, props.style]}>
      <View style={{marginTop: 10, marginHorizontal: 10}}>
        <CTabSelector
          items={tabs}
          selectedIndex={tabIndex}
          onSelectTab={(item, index) => {
            setTabIndex(index);
          }}
          containerStyle={[
            boxShadow,
            {
              height: 40,
              backgroundColor: 'white',
              borderRadius: 4,
            },
          ]}
        />
      </View>
      {renderContent(tabIndex)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TouchpointContainer;
