import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Platform,
  Image,
} from 'react-native';
import {parseCoordinate} from '../../../../actions/google.action';
import SvgIcon from '../../../../components/SvgIcon';
import {whiteLabel} from '../../../../constants/Colors';
import Images from '../../../../constants/Images';
import {checkFeatureIncludeParam} from '../../../../constants/Storage';
import {style} from '../../../../constants/Styles';
import { useDispatch } from 'react-redux';
import { checkConnectivity } from '../../../../DAO/helper';
import { showOfflineDialog } from '../../../../constants/Helper';
import NavigationButton from '../../../../components/common/NavigationButton';
import { useSelector } from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import { showNotification } from '../../../../actions/notification.action';
import { Strings } from '../../../../constants';

export default function WazeNavigation(props) {

  const {location, address} = props;

  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch()
  const [navigations , setNavigations] =  useState([]);
  const features = useSelector(
    state => state.selection.payload.user_scopes.geo_rep.features,
  );
  const navigationMain = useNavigation();

  useEffect(() => {
    if(features != undefined){
      var navigationList = [];

      if(features.includes("navigation_waze")){
        navigationList.push({
          title: 'Waze',
          image:  Images.waze,    
          type : 'png'
        })
      }

      if(features.includes("navigation_google_maps")){
        navigationList.push({
          title: 'Google',
          image:  'Google_Map_Icon',    
          type : 'svg'
        })
      }

      if(features.includes("navigation_view_route")){
        navigationList.push({
          title: 'View Route',
          image:  'Location_Arrow',    
          type : 'svg'
        })
      }
      console.log("features",navigationList)
      setNavigations(navigationList);
      if(navigationList.length > 0){
        setVisible(true);
      }

    }
  }, [features]);

  const checkVisible = async () => {
    setVisible(await checkFeatureIncludeParam('navigation_waze'));
  };

  const openWaze = async() => {

    var wazeByAddress = await checkFeatureIncludeParam(
      'waze_by_address',
    );
    try {
      if (wazeByAddress) {
        var parseLocation = await parseCoordinate(address);
        if (parseLocation) {
          Linking.openURL(
            `https://waze.com/ul?q=${encodeURIComponent(
              address,
            )}&ll=` +
              parseLocation.latitude +
              ',' +
              parseLocation.longitude +
              '&navigate=yes',
          );
        } else {
          Linking.openURL(
            'https://waze.com/ul?ll=' +
              location.latitude +
              ',' +
              location.longitude +
              '&navigate=no',
          );
        }
      } else {
        Linking.openURL(
          'https://waze.com/ul?ll=' +
            location.latitude +
            ',' +
            location.longitude +
            '&navigate=no',
        );
      }
    } catch (e) {
      if (Platform.OS === 'android') {
        Linking.openURL('market://details?id=com.waze');
      } else {
        Linking.openURL(
          'http://itunes.apple.com/us/app/id323229106',
        );
      }
    }

  }

  const openGoogle = async() => {

    var wazeByAddress = await checkFeatureIncludeParam(
      'waze_by_address',
    );

    try {
      var wazeLocation = location;
      if(location.latitude == '' || location.latitude == undefined){
        var parseLocation = await parseCoordinate(address);
        wazeLocation = parseLocation;
      }
      const label = address;
      const url = Platform.select({
        ios: "maps:" + wazeLocation.latitude + "," + wazeLocation.longitude + "?q=" + label,
        android: "geo:" + wazeLocation.latitude + "," + wazeLocation.longitude + "?q=" + label
      });
      Linking.openURL(url);      
    } catch (e) {
      dispatch(showNotification({type: Strings.Success, message:'Google Maps is not available/installed on this device', buttonText: Strings.Ok}));
      //Google Maps is not available/installed on this device    
    }
  }

  const openViewRoute = async() => {
    
    try {
      var wazeLocation = location;
      if(location.latitude === '' || location.latitude == undefined){
        var parseLocation = await parseCoordinate(address);
        wazeLocation = parseLocation;
      }
      const label = address;
      console.log("open view route")
      navigationMain.navigate('DeeplinkViewRouteMap' , {location:wazeLocation });
      if(props.onCloseModal){
        props.onCloseModal();
      }
    } catch (e) {
    
    }
  
    //navigationMain.navigate('DeeplinkStock');
  }

  return (
    <View styles={styles.container}>
      {visible && (
        <View
          style={[
            style.card,
            {
              marginLeft: 5,
              marginRight: 10,
              flexDirection: 'column',
              padding: 10,
              paddingTop: 0,
            },
          ]}>
                      
          <View style={{flexDirection:'row'}}>

            {
              navigations.map((item , index) => {
                return <NavigationButton 
                  key={index}
                  onNavigate={() => {                    
                    if(item.title == 'Waze'){
                      openWaze();
                    }else if(item.title == 'Google'){
                      openGoogle();
                    }else if(item.title == 'View Route'){
                      openViewRoute();
                    }
                  }}
                  item={item} />
              })
            }

          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  
});
