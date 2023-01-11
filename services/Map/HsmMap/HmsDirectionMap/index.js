import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity , Image} from 'react-native';
import HMSMap,  {MapTypes, HMSMarker, CapTypes, JointTypes, PatternItemTypes, HMSPolyline, Gravity} from '@hmscore/react-native-hms-map';
import { Colors, HMS_MAP_API_KEY, Images } from '../../../../constants';
import SvgIcon from '../../../../components/SvgIcon';
import { postApiRequest, postHmsMapRequest } from '../../../../actions/api.action';


const HmsDirectionMap = props => {


  const { coordinates, region, currentLocation} = props;
  if(coordinates.length != 2) return null;

  const {longitude, latitude, zoomEnabled} = region;
  const mapRef = useRef(null);
  const [points , setPoints] = useState([]);

  useEffect(() => {
    if(coordinates.length == 2){
      // const postData = {
      //   origin: {
      //     lng: '18.446078',// coordinates[0].longitude.toString(),
      //     lat: '-33.704086' /  / coordinates[0].latitude.toString(),
      //   },
      //   destination: {
      //     lng: '18.447496', // coordinates[1].longitude.toString(),
      //     lat: '-33.727166' // coordinates[1].lat    itude.toString(),
      //   },
      // }

      const postData = {
        origin: {
          lng: coordinates[0].longitude.toString(),
          lat: coordinates[0].latitude.toString(),
        },
        destination: {
          lng: coordinates[1].longitude.toString(),
          lat: coordinates[1].latitude.toString(),
        },
      }
      
      postHmsMapRequest('https://mapapi.cloud.huawei.com/mapApi/v1/routeService/driving', JSON.stringify(postData) , HMS_MAP_API_KEY).then((res) => {
        console.log("RRR", res)
        parseData(res);
      }).catch((e) =>{
        console.log("htmps api call error: ", e);
      })
    }
},[]);


  const parseData = (res) => {
    var mPoints = [];
    if(res.routes.length > 0){
      const paths = res.routes[0].paths;
      if(paths.length > 0){
        const steps = paths[0].steps;
        var mPolylines  = [];
        steps.map((step) => {
          mPolylines.push(step.polyline);
        });
        console.log('mPolylines', mPolylines);
      
        mPolylines.map((point) => {
          point.map((arr) => {
            mPoints.push({latitude: arr.lat, longitude: arr.lng});
          });
        });
        console.log("mPoints",mPoints)
        setPoints(mPoints);
      }      
    }  
  }


  const goToCurrentLocation = () => {
    if (currentLocation) {
      mapRef.current.setCoordinates({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      });
    }
  };

  const renderMarker = (markers) => {
    let icon = {
      uri: Image.resolveAssetSource(Images.selectedMarkerIcon).uri,
      width: 100,
      height: 100,
    };
    return markers.map((item , key) => {
        return <HMSMarker
        key={'markers' + key}
        icon={undefined}
        onClick={() => {
          //props.onMarkerPressed(item, key);
        }}
        //clusterable={true}
        coordinate={{
          latitude: Number(item.latitude),
          longitude: Number(item.longitude),
        }}
      />;
    })
  }

  return (
    <View style={[styles.container, props.style]}>
      <HMSMap
        ref={mapRef}
        mapType={MapTypes.NORMAL}
        liteMode={false}
        scrollGesturesEnabled={zoomEnabled}
        rotateGesturesEnabled={zoomEnabled}
        tiltGesturesEnabled={false}
        useAnimation={true}
        animationDuration={1000}
        camera={{
          target: {
            latitude: latitude,
            longitude: longitude,
          },
          zoom: 15,
        }}
        {...props}
      >
      {renderMarker(coordinates)}
      <HMSPolyline
          points={points}
          clickable={true}
          geodesic={true}
          color={-1879018753}//-1879018753= transparent blue //133C8B
          jointType={JointTypes.BEVEL}
          pattern={[{type: PatternItemTypes.DASH, length: 20}]}
          startCap={{
            type: CapTypes.ROUND,
          }}
          endCap={{
            type: CapTypes.ROUND,
          }}
          visible={true}
          width={5.0}
          zIndex={2}
          onClick={(e) => console.log('Polyline onClick')}
      />

      </HMSMap>
      
      <View style={styles.myLocation}>
        <TouchableOpacity
          onPress={() => {
            goToCurrentLocation();
          }}>
            
          <SvgIcon icon="GPS_LOCATION" width="20px" height="20px" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  myLocation: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 30,
    height: 30,
    backgroundColor: Colors.whiteColor,
    alignItems: 'center',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    zIndex: 20000,
    justifyContent: 'center',
  },
});

export default HmsDirectionMap;
