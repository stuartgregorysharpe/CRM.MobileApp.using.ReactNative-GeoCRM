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
import {
  getPinSvg,
  getPolygonFillColorTransparency,
} from '../../../../constants/Storage';
import {calcArgbIntValFromHexRgba} from '../../../../helpers/formatHelpers';
import {
  calculateBBox,
  calculateBBoxFromHMS,
} from '../../../../screens/GeoRep/CRM/components/helpers';
import MarkerIconView from '../../components/MarkerIconView';
let polylineKey = 0;
let mapPinSvg = null;
const CURRENT_LOCATION_RADIUS = 200;

const HmsLocationMap = props => {
  const {isDrawMode, currentLocation, polygonData, markers, selectedLocations} =
    props;
  const [polylineEditing, setPolylineEditing] = useState(null);
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
    loadPinSvg();
    initTransCode();
  }, []);
  const initTransCode = async () => {
    const code = await getPolygonFillColorTransparency();
    setTransCode(code);
  };
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
    mapRef.current.getHuaweiMapInfo().then(info => {
      if (props.onRegionChangeComplete) {
        const cameraPosition = info.cameraPosition;
        const visibleRegion = info.visibleRegion;
        const zoom = cameraPosition.zoom;
        const region = cameraPosition.target;
        const bBox = calculateBBoxFromHMS(visibleRegion);
        props.onRegionChangeComplete(region, markers, bBox, zoom);
      }
    });
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
      return (
        <HMSMarker
          key={'markers' + item.location_id}
          onClick={() => {
            props.onMarkerPressed(item, key);
          }}
          clusterable={true}
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
  console.log('HmsLocationMap_currentLocation', currentLocation);
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
          onCameraIdle={onRegionChangeComplete}
          onMapClick={onPressMap}
          camera={{
            target: {
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            },
            zoom: 12,
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
