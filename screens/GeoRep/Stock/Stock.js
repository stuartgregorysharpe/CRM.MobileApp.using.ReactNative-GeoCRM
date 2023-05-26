import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import TopThreeTab from '../../../components/common/TopThreeTab';
import StockLists from './stock/StockLists';
import Movements from './movements/Movements';
import Returns from './returns/Returns';
import {boxShadow, style} from '../../../constants/Styles';
import NavigationHeader from '../../../components/Header/NavigationHeader';
import CTabSelector from '../../../components/common/CTabSelector';
import StockStagingContainer from './staging/StockStagingContainer';
import {Notification} from '../../../components/modal/Notification';
import { checkConnectivity } from '../../../DAO/helper';
import { showOfflineDialog } from '../../../constants/Helper';
import { useDispatch } from 'react-redux';
import LoadingProgressBar from '../../../components/modal/LoadingProgressBar';

const Stock = props => {

  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [marginBottom , setMarginBottom] = useState(0)
  const topMenuItems = [
    {
      title: 'Stock',
      id: 1,
    },
    {
      title: 'Staging',
      id: 2,
    },
    {
      title: 'Movements',
      id: 3,
    },
    {
      title: 'Returns',
      id: 4,
    },
  ];
  const isShowCustomNavigationHeader = props.isDeeplink != undefined;
  const dispatch = useDispatch()

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
                <Text style={style.headerTitle}>Stock Module</Text>
              </View>
            </TouchableOpacity>
          );
        },
      });
    }
  });

  return (
    <View style={{flexDirection: 'column', flex: 1}}>
      {isShowCustomNavigationHeader && (
        <NavigationHeader
          showIcon={true}
          title={'Stock'}
          onBackPressed={() => {
            props.navigation.goBack();
          }}
        />
      )}
      <CTabSelector
        items={topMenuItems}
        selectedIndex={selectedTabIndex}
        onSelectTab={(item, index) => {
          checkConnectivity().then((isConnected) => {
            if(isConnected || item.title != "Movements" ){
              setSelectedTabIndex(index);              
            }else{
              showOfflineDialog(dispatch)
            }
          })
          
        }}
        containerStyle={[
          boxShadow,
          {
            marginBottom: 0,
            height: 40,
            marginTop: 8,
            marginHorizontal: 10,
            backgroundColor: 'white',
            borderRadius: 4,
          },
        ]}
      />

      <Notification />
      <LoadingProgressBar />

      {/* marginBottom:50 */}
      <View style={{flex: 1 }}>

        {selectedTabIndex === 0 && <StockLists {...props} ></StockLists>}
        {selectedTabIndex === 1 && <StockStagingContainer />}
        {selectedTabIndex === 2 && <Movements></Movements>}
        {selectedTabIndex === 3 && <Returns></Returns>}
      </View>

    </View>
  );
};

export default Stock;
