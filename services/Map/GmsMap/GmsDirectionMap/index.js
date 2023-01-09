import React, {useState, useRef} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '../../../../constants';
import { whiteLabel } from '../../../../constants/Colors';
import { useSelector } from 'react-redux'; 

const GmsDirectionMap = props => {

  const { coordinates } = props;
  
  const currentLocation = useSelector(state => state.rep.currentLocation);
  if(currentLocation.latitude == undefined)  return null;
  const mapRef = useRef(null);
  const { width, height } = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE = currentLocation.latitude;
  const LONGITUDE = currentLocation.longitude;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  console.log("currentLocation => ",currentLocation  ,LONGITUDE_DELTA , coordinates)
  
  const [initialRegion , setInitialRegion] = useState({
    latitude: currentLocation.latitude,
    longitude: currentLocation.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: LONGITUDE_DELTA,
  });

  const [region, setRegion] = useState({
    latitude: currentLocation.latitude,
    longitude: currentLocation.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0922,
  });


  return (
    props && currentLocation.latitude != undefined && currentLocation.latitude != '' && coordinates.length >= 2 &&
    // <View style={{flex:1, backgroundColor:'red'}}></View>
    <MapView 
            initialRegion={initialRegion}
            region={region}
            style={{height: Dimensions.get("screen").height - 50, width: Dimensions.get("screen").width}}
            provider={PROVIDER_GOOGLE} 
            showsUserLocation={true}
            followUserLocation={true}
            showsMyLocationButton={true}
            zoomEnabled={true}
            >

            {coordinates.map((coordinate, index) =>
                <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} />
            )}
            {(coordinates.length >= 2) && (
            <MapViewDirections
                origin={coordinates[0]}
                waypoints={ (coordinates.length > 2) ? coordinates.slice(1, -1): undefined}
                destination={coordinates[coordinates.length-1]}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                strokeColor={whiteLabel().mainText}
                optimizeWaypoints={true}
                onStart={(params) => {
                    //console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                }}
                onReady={result => {
                }}
                onError={(errorMessage) => {
                // console.log('GOT AN ERROR');
                }}
            />
            )}

  </MapView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
});

export default GmsDirectionMap;
