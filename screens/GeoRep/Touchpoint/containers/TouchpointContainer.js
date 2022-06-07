import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import CTabSelector from '../../../../components/common/CTabSelector';
import {style} from '../../../../constants/Styles';
import HistoryContainer from './HistoryContainer';
import LeaderboardContainer from './LeaderboardContainer';
import TrendsContainer from './TrendsContainer';

const TouchpointContainer = props => {
  const [tabIndex, setTabIndex] = useState(0);
  const tabs = [
    {title: 'Leaderboard', id: 0},
    {title: 'Trends', id: 1},
    {title: 'History', id: 2},
  ];

  const renderContent = selectedTabIndex => {
    if (selectedTabIndex == 0) {
      return <LeaderboardContainer />;
    } else if (selectedTabIndex == 1) {
      return <TrendsContainer />;
    } else if (selectedTabIndex == 2) {
      return <HistoryContainer />;
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
          containerStyle={[style.card]}
        />
        {renderContent(tabIndex)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TouchpointContainer;
