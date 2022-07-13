import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import ScrollTab from '../../../components/common/ScrollTab';
import {style} from '../../../constants/Styles';
import MainPage from './Main/MainPage';
import {useSelector} from 'react-redux';
import ActionItemsContainer from '../CRM/action_items/containers/ActionItemsContainer';

export default function HomeScreen(props) {
  const [tabIndex, setTabIndex] = useState('Main');
  const [tabs, setTabs] = useState([{name: 'Main', id: 0}]);
  const features = useSelector(
    state => state.selection.payload.user_scopes.geo_rep.features,
  );

  useEffect(() => {
    var tmp = [];
    if (features.includes('actions_items')) {
      tmp = [...tabs, {name: 'Actions', id: tabs.length + 1}];
    }
    if (features.includes('leaderboard')) {
      tmp = [...tmp, {name: 'Leaderboard', id: tmp.length + 1}];
    }
    if (features.includes('sales')) {
      tmp = [...tmp, {name: 'Sales', id: tmp.length + 1}];
    }
    setTabs(tmp);
  }, []);

  useEffect(() => {
    var screenProps = props.screenProps;
    if (screenProps === undefined) {
      screenProps = props.navigation;
    }
    if (screenProps) {
      screenProps.setOptions({
        headerTitle: () => {
          return (
            <TouchableOpacity onPress={() => {}}>
              <View style={style.headerTitleContainerStyle}>
                <Text style={style.headerTitle}>Home</Text>
              </View>
            </TouchableOpacity>
          );
        },
      });
    }
  });

  return (
    <View style={{flex: 1, marginTop: 10}}>
      <View style={{marginHorizontal: 10}}>
        <ScrollTab
          tabs={tabs}
          onTabSelection={item => {
            setTabIndex(item.name);
          }}></ScrollTab>
      </View>
      {tabIndex === 'Main' && <MainPage {...props}></MainPage>}
      {tabIndex === 'Actions' && <ActionItemsContainer />}
    </View>
  );
}