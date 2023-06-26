import { View } from 'react-native';
import React, { useState } from 'react';
import { style } from '../../../../../constants/Styles';
import SvgIcon from '../../../../../components/SvgIcon';
import { AppText } from '../../../../../components/common/AppText';
import { TopTab } from '../../../../../components/common/TopTab';
import TodayVisits from './partial/TodayVisits';
import WeeklyVisits from './partial/WeeklyVisits';
import { Strings } from '../../../../../constants';
import { checkConnectivity } from '../../../../../DAO/helper';
import { showOfflineDialog } from '../../../../../constants/Helper';
import { useDispatch } from 'react-redux';
import IndicatorDotScroller from '../../../../../components/common/IndicatorDotScroller';
import LoadingProgressBar from '../../../../../components/modal/LoadingProgressBar';

const Visits = ( props ) => {
  
  const { visitCard, pageCount, pageIndex } = props;
  const [tabIndex, setTabIndex] = useState(0);
  const dispatch = useDispatch();

  const headers = [
    Strings.Home_Visit_Tabs.Today,
    Strings.Home_Visit_Tabs.Weekly,
  ];

  const onReloadLocationData = () => {
    if(props.onReloadLocationData){
      props.onReloadLocationData()
    }
  }  
  
  return (
    <View style={{ marginTop: 10, flex: 1, flexDirection: 'column' }}>

      <LoadingProgressBar/>      
      <View style={[style.scrollTabCard, { flexDirection: 'column' }]}>
        <View
          style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center' }}>
          <SvgIcon icon="Question_Calendar" width="15px" height="15px" />
          <AppText
            size="medium"
            title="Visits"
            type="title"
            style={{ marginLeft: 5 }}></AppText>
        </View>

        <TopTab
          tabIndex={tabIndex}
          textStyle={{ fontSize: 13 }}
          headers={headers}
          onTabClicked={index => {
            checkConnectivity().then((isConnected) => {
              if (isConnected) {
                setTabIndex(index);
              } else {
                showOfflineDialog(dispatch)
              }
            });

          }}></TopTab>

        {tabIndex === 0 && visitCard && (
          <TodayVisits 
            onReloadLocationData={onReloadLocationData}          
            today={visitCard.today}></TodayVisits>
        )}

        {tabIndex === 1 && visitCard && (
          <WeeklyVisits week={visitCard.week}></WeeklyVisits>
        )}
      </View>
      <IndicatorDotScroller
        total={pageCount}
        selectedIndex={pageIndex}></IndicatorDotScroller>
    </View>
  );
};
export default Visits;
