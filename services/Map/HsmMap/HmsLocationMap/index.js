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
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Fonts} from '../../../../constants';
import Colors, {whiteLabel} from '../../../../constants/Colors';
import {isInsidePoly} from '../../../../constants/Helper';
import {getPinSvg} from '../../../../constants/Storage';
import MarkerIconView from '../../components/MarkerIconView';
let polylineKey = 0;
let mapPinSvg = null;
const CURRENT_LOCATION_RADIUS = 200;

const HmsLocationMap = props => {
  const {isDrawMode, currentLocation, polygonData, markers, selectedLocations} =
    props;
  const [polylineEditing, setPolylineEditing] = useState(null);
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
    loadPinSvg();
  }, []);
  const loadPinSvg = async () => {
    mapPinSvg = await getPinSvg('@map_pin_key');
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
      isInsidePoly(x.coordinates.latitude, x.coordinates.longitude, [
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
    console.log('onRegionChangeComplete', e);
    if (props.onRegionChangeComplete) {
      //props.onRegionChangeComplete(region, markers, bBox, zoom);
    }
  };
  const checkMarkerSelected = marker => {
    const foundLocation = selectedLocations.find(
      element => element.location_id === marker.location_id,
    );
    return foundLocation != null;
  };
  const renderMarkers = _markers => {
    if (!_markers) return null;
    return _markers.map((item, key) => {
      const isMarkerSelected = checkMarkerSelected(item);
      return (
        <HMSMarker
          key={'markers' + item.location_id}
          onClick={() => {
            onMarkerPressed(item, key);
          }}
          coordinate={{
            latitude: Number(item.coordinates.latitude),
            longitude: Number(item.coordinates.longitude),
          }}>
          <MarkerIconView
            item={item}
            mapPinSvg={mapPinSvg}
            isSelected={isMarkerSelected}
          />
        </HMSMarker>
      );
    });
  };
  const renderPolygons = _polygons => {
    const polygons = [];
    if (_polygons && _polygons.length > 0) {
      _polygons.forEach(polygon => {
        polygon.path.forEach(item => {
          polygons.push(
            <HMSPolygon
              key={'polygons' + item.location_id}
              points={item}
              strokeColor={polygon.strokeColor}
              fillColor={polygon.fillColor + transCode}
              strokeWidth={1}
            />,
          );
        });
      });
    }
    return null;
  };

  const renderDrawingPolygons = _polylineEditing => {
    if (_polylineEditing && _polylineEditing.coordinates.length > 0) {
      return (
        <HMSPolygon
          key={'polygons-draw' + _polylineEditing.id}
          points={_polylineEditing.coordinates}
          strokeColor="#000"
          fillColor="rgba(76,146,236,0.5)"
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
        strokeColor={Colors.primaryColor}
        fillColor={'rgba(230,238,255,0.5)'}
      />
    );
  };
  console.log('HmsLocationMap_currentLocation', currentLocation);
  return (
    <View style={[styles.container, props.style]}>
      {isShowMap && (
        <HMSMap
          clusterColor={whiteLabel().mainText}
          ref={mapRef}
          markerClustering={true}
          style={styles.mapView}
          scrollGesturesEnabled={!isDrawMode}
          rotateGesturesEnabled={!isDrawMode}
          onCameraUpdateFinished={onRegionChangeComplete}
          onMapClick={onPressMap}
          camera={{
            target: {
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            },
            zoom: 3,
            bearing: 50,
            tilt: 80,
          }}
          currentLocation={currentLocation}>
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
    bottom: 60,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 7,
    backgroundColor: whiteLabel().actionFullButtonBackground,
  },
});

export default HmsLocationMap;
