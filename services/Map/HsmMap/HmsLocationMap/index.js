import HMSMap, {
  MapTypes,
  Gravity,
  HMSMarker,
  HMSCircle,
  HMSPolygon,
  HMSPolyline,
  HMSGroundOverlay,
  PatternItemTypes,
  JointTypes,
} from '@hmscore/react-native-hms-map';

import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import SvgIcon from '../../../../components/SvgIcon';
import {Fonts, Images} from '../../../../constants';
import Colors, {whiteLabel} from '../../../../constants/Colors';
import {isInsidePoly} from '../../../../constants/Helper';
import {getPolygonFillColorTransparency} from '../../../../constants/Storage';
import {calcArgbIntValFromHexRgba} from '../../../../helpers/formatHelpers';
import {
  calculateBBox,
  calculateBBoxFromHMS,
} from '../../../../screens/GeoRep/CRM/components/helpers';
import { useSelector  } from 'react-redux';
import MarkerIconView from '../../components/MarkerIconView';
let polylineKey = 0;
const CURRENT_LOCATION_RADIUS = 200;

const HmsLocationMap = props => {
  const { isFinish , isDrawMode, currentLocation, polygonData, markers, selectedLocations} =
    props;
  const isCalendarSelection = useSelector(
    state => state.selection.isCalendarSelection,
  );
  const [polylineEditing, setPolylineEditing] = useState(null);
  const [cameraPosition, setCameraPosition] = useState({
    target: {
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
    },
    bearing: 0,
    tilt: 0,
    zoom: 15,
  });
  const [transCode, setTransCode] = useState('05');

  const mapRef = useRef(null);
  const isShowFinishButton =
    isDrawMode &&
    polylineEditing != null &&
    polylineEditing.coordinates.length >= 0;
  const isShowMap =
    currentLocation != null &&
    currentLocation.longitude != undefined &&
    currentLocation.latitude != undefined;
  useEffect(() => {
    initTransCode();
  }, []);

  useEffect(() => {
    if(!isCalendarSelection){
      onResetDrawing();
    }    
  }, [isCalendarSelection]);

  useEffect(() =>{
    if(isFinish){
      onFinishDrawing();
      if(props.onFinishUpdate){
        props.onFinishUpdate();
      }
    }
  }, [isFinish]);

  const initTransCode = async () => {
    const code = await getPolygonFillColorTransparency();
    setTransCode(code);
  };

  const onPressMap = e => {
    console.log('onPressMap', e);
    if (props.onPressMap) {
      props.onPressMap(e);
    }
    if (isDrawMode) {
      onDrawPolyline(e.nativeEvent.coordinate);
    }
  };
  const onDrawPolyline = coordinate => {
    console.log('onDrawPolyline', coordinate);
    if (!polylineEditing) {
      setPolylineEditing({
        id: polylineKey++,
        coordinates: [coordinate],
        holes: [],
      });
    } else {
      setPolylineEditing({
        ...polylineEditing,
        coordinates: [...polylineEditing.coordinates, coordinate],
      });
    }
  };
  const onResetDrawing = () => {
    setPolylineEditing(null);
  };
  const getMarksInDrawedPolygon = (_marks, _coordinates) => {
    return _marks.filter(x => {
      return isInsidePoly(x.coordinates.latitude, x.coordinates.longitude, [
        _coordinates,
      ]);
    });
  };
  const onFinishDrawing = () => {
    if (props.onFinishDrawing) {
      const marksInDrawedPolygon = getMarksInDrawedPolygon(
        markers,
        polylineEditing.coordinates,
      );
      props.onFinishDrawing(marksInDrawedPolygon);
    }
    onResetDrawing();
  };
  const onRegionChangeComplete = e => {
    console.log('onRegionChangeComplete');
    mapRef.current.getHuaweiMapInfo().then(info => {
      if (props.onRegionChangeComplete) {
        const cameraPosition = info.cameraPosition;
        const visibleRegion = info.visibleRegion;
        const zoom = cameraPosition.zoom;
        const region = cameraPosition.target;

        //setCameraPosition(cameraPosition);
        const bBox = calculateBBoxFromHMS(visibleRegion);
        props.onRegionChangeComplete(region, [], bBox, zoom);
      }
    });
  };
  const goToCurrentLocation = () => {
    mapRef.current.setCoordinates({
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
    });
    mapRef.current.zoomTo(15);
  };
  const checkMarkerSelected = marker => {
    if (!selectedLocations) return false;
    const foundLocation = selectedLocations.find(
      element => element.location_id === marker.location_id,
    );
    return foundLocation != null;
  };
  const renderMarkers = _markers => {
    if (!_markers) return null;
    return _markers.map((item, key) => {
      const isMarkerSelected = checkMarkerSelected(item);
      let icon = undefined;
      if (isMarkerSelected) {
        icon = {
          uri: Image.resolveAssetSource(Images.selectedMarkerIcon).uri,
          width: 100,
          height: 100,
        };
      } else {
        if (item.pinIcon && item.pinIcon.pin_image) {
          icon = {uri: item.pinIcon.pin_image, width: 100, height: 100};
        }
      }

      return (
        <HMSMarker
          key={'markers' + item.location_id}
          icon={icon}
          onClick={() => {
            props.onMarkerPressed(item, key);
          }}
          clusterable={true}
          coordinate={{
            latitude: Number(item.coordinates.latitude),
            longitude: Number(item.coordinates.longitude),
          }}
        />
      );
    });
  };
  const renderPolygons = _polygons => {
    const polygons = [];
    if (_polygons && _polygons.length > 0) {
      _polygons.forEach((polygon, index) => {
        polygon.path.forEach((item, itemIndex) => {
          polygons.push(
            <HMSPolygon
              key={'polygons' + index + 'item' + itemIndex}
              points={item}
              strokeColor={calcArgbIntValFromHexRgba(polygon.strokeColor)}
              fillColor={calcArgbIntValFromHexRgba(
                polygon.fillColor + transCode,
              )}
              strokeWidth={1}
            />,
          );
        });
      });
    }
    if (polygons.length > 0) return polygons;
    return null;
  };

  const renderDrawingPolygons = _polylineEditing => {
    if (_polylineEditing && _polylineEditing.coordinates.length > 0) {
      return (
        <HMSPolygon
          key={'polygons-draw' + _polylineEditing.id}
          points={_polylineEditing.coordinates}
          strokeColor={calcArgbIntValFromHexRgba('#000000')}
          fillColor={calcArgbIntValFromHexRgba('#4C92EC80')}
          strokeWidth={1}
        />
      );
    }
    return null;
  };

  const renderCircle = (_location, _radius) => {
    return (
      <HMSCircle
        key={(_location.longitude + _location.latitude).toString()}
        center={{
          latitude: _location.latitude,
          longitude: _location.longitude,
        }}
        radius={_radius}
        strokeWidth={1}
        strokeColor={calcArgbIntValFromHexRgba(Colors.primaryColor)}
        fillColor={calcArgbIntValFromHexRgba('#E6EEFF80')}
      />
    );
  };
  const renderMyLocationMarker = _location => {
    const icon = {
      uri: Image.resolveAssetSource(Images.currentLocationIcon).uri,
      width: 50,
      height: 50,
    };
    return (
      <HMSMarker
        key={'my_location_marker'}
        icon={icon}
        clusterable={false}
        coordinate={{
          latitude: Number(_location.latitude),
          longitude: Number(_location.longitude),
        }}
        markerAnchor={[0.5, 0.5]}
      />
    );
  };
  return (
    <View style={[styles.container, props.style]}>
      {isShowMap && (
        <HMSMap
          clusterColor={whiteLabel().mainText}
          ref={mapRef}
          liteMode={false}
          mapType={MapTypes.NORMAL}
          markerClustering={true}
          style={styles.mapView}
          scrollGesturesEnabled={!isDrawMode}
          rotateGesturesEnabled={!isDrawMode}
          tiltGesturesEnabled={false}
          myLocationButtonEnabled={false}
          myLocationEnabled={false}
          onCameraIdle={onRegionChangeComplete}
          compassEnabled={true}
          onMapClick={onPressMap}
          onMapLongClick={onPressMap}
          camera={cameraPosition}
          currentLocation={currentLocation}
          useAnimation={true}
          animationDuration={1000}>
          {renderMyLocationMarker(currentLocation)}
          {renderDrawingPolygons(polylineEditing)}
          {renderMarkers(markers)}
          {renderPolygons(polygonData)}
          {renderCircle(currentLocation, CURRENT_LOCATION_RADIUS)}
        </HMSMap>
      )}

      {isShowFinishButton && (
        <TouchableOpacity
          style={styles.finishBtnStyle}
          onPress={onFinishDrawing}>
          <Text style={styles.finishButtonText}>Finish</Text>
        </TouchableOpacity>
      )}
      <View style={styles.myLocation}>
        <TouchableOpacity
          onPress={() => {
            goToCurrentLocation();
          }}>
          <SvgIcon icon="GPS_LOCATION" width="30px" height="30px" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapView: {flex: 1},
  finishButtonText: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: Fonts.primaryMedium,
    color: whiteLabel().actionFullButtonText,
  },
  finishBtnStyle: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 120,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 7,
    backgroundColor: whiteLabel().actionFullButtonBackground,
  },
  myLocation: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 50,
    height: 50,
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

export default HmsLocationMap;
