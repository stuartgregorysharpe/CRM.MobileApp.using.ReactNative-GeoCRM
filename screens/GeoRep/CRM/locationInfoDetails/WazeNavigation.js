import React, {useEffect, useState , useRef} from 'react';
import {
  View,  
  StyleSheet,
  Linking,
  Platform,  
} from 'react-native';
import {parseCoordinate} from '../../../../actions/google.action';
import Images from '../../../../constants/Images';
import {checkFeatureIncludeParam} from '../../../../constants/Storage';
import {style} from '../../../../constants/Styles';
import { useDispatch } from 'react-redux';
import NavigationButton from '../../../../components/common/NavigationButton';
import { useSelector } from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import { showNotification } from '../../../../actions/notification.action';
import { Strings } from '../../../../constants';
import ViewRouteModal from './ViewRouteModal';

export default function WazeNavigation(props) {

  const {location, address} = props;

  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch()
  const [navigations , setNavigations] =  useState([]);
  const features = useSelector(
    state => state.selection.payload.user_scopes.geo_rep.features,
  );
  const navigationMain = useNavigation();
  const viewRouteModalRef = useRef(null)
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const [coordinates , setCoordinates] = useState([]);

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
      setNavigations(navigationList);
      if(navigationList.length > 0){
        setVisible(true);
      }

    }
  }, [features]);


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
		if(wazeLocation != undefined && currentLocation != undefined){
            var locations = [];
            locations.push({latitude : currentLocation.latitude, longitude : currentLocation.longitude});
            locations.push({latitude : parseFloat(wazeLocation.latitude), longitude : parseFloat(wazeLocation.longitude)});            
            setCoordinates(locations);
			viewRouteModalRef.current.showModal();
        }	
        
    } catch (e) {
    
    }   
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

			<ViewRouteModal 
				title='View Route'
				hideClear
			  	ref={viewRouteModalRef}
			  	coordinates={coordinates}
			  	currentLocation={currentLocation}
				region={{
					latitude: currentLocation.latitude,
					longitude: currentLocation.longitude,
					zoomEnabled : true
				}}
			/>

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
