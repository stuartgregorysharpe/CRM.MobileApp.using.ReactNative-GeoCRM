import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import MapView, {Marker, Polygon, Polyline} from 'react-native-maps';
import SvgIcon from '../../../../components/SvgIcon';
import {Fonts , Images} from '../../../../constants';
import Colors, {whiteLabel} from '../../../../constants/Colors';
import {isInsidePoly} from '../../../../constants/Helper';
import {  
  getPolygonFillColorTransparency,
} from '../../../../constants/Storage';
import ClusteredMapView from '../../../../screens/GeoRep/CRM/components/ClusteredMapView';
import MarkerIcon from '../../../../components/Marker';
import { useSelector } from 'react-redux';
import { isMarker } from '../../../../screens/GeoRep/CRM/components/helpers';
let polylineKey = 0;
const CURRENT_LOCATION_RADIUS = 200;


const GmsLocationMap = props => {

  const { isFinish , isDrawMode, currentLocation, polygonData, markers, selectedLocations} =
    props;
  const isCalendarSelection = useSelector(
    state => state.selection.isCalendarSelection,
  );
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
    initTransCode();
  }, []);

  useEffect(() => {
    if(!isCalendarSelection){
      //onFinishDrawing();
      onResetDrawing();
    }
  }, [isCalendarSelection]);

  useEffect(() => {
    if(!isDrawMode){
      onResetDrawing();
    }
  }, [isDrawMode]);

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
    if (props.onFinishDrawing && polylineEditing != undefined) {
      const marksInDrawedPolygon = getMarksInDrawedPolygon(
        markers,
        polylineEditing.coordinates,
      );
      props.onFinishDrawing(marksInDrawedPolygon);
    }
    onResetDrawing();
  };

  const onRegionChangeComplete = (region, markers, bBox, zoom) => {
    if (props.onRegionChangeComplete) {
      props.onRegionChangeComplete(region, markers, bBox, zoom);
    }
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
      let icon = null;
      if (isMarkerSelected) {
        icon = Images.selectedMarkerIcon;
      } 
      
      return (
        <Marker
          key={'markers' + item.location_id}          
          tracksViewChanges={isDrawMode}
          onPress={() => {
            props.onMarkerPressed(item, key);
          }}
          coordinate={{
            latitude: Number(item.coordinates.latitude),
            longitude: Number(item.coordinates.longitude),
          }}>
            {              
              isMarkerSelected &&
                <MarkerIcon style={styles.markerIcon} icon={'Selected_Marker'} width="34px" height="34px" />               
            }
            {
              !isMarkerSelected && item.pinIcon != undefined &&
              <SvgIcon  width="30" height="30" xml={ item.pinIcon.svg_code ? item.pinIcon.svg_code : ''} />
            }
                        
          </Marker>
      );
    });
  };
  const renderPolygons = _polygons => {
    const polygons = [];
    if (_polygons && _polygons.length > 0) {
      _polygons.forEach((polygon, index) => {
        polygon.path.forEach((item, itemIndex) => {
          polygons.push(
            <Polygon
              key={'polygons' + index + 'item' + itemIndex}
              coordinates={item}
              strokeColor={polygon.strokeColor}
              fillColor={polygon.fillColor + transCode}
              strokeWidth={1}
            />,
          );
        });
      });
    }
    if (polygons.length > 0) return polygons;
    return null;
  };

  const renderCircle = (_location, _radius) => {
    return (
      <MapView.Circle
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
  
  return (
    <View style={[styles.container, props.style]}>
      {isShowMap && (
        <ClusteredMapView
          clusterColor={whiteLabel().mainText}
          ref={mapRef}
          clusteringEnabled={true}
          style={styles.mapView}
          editing={polylineEditing}
          scrollEnabled={!isDrawMode}
          onRegionChangeComplete={onRegionChangeComplete}
          onPress={onPressMap}
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015,
          }}
          currentLocation={currentLocation}>
          {renderMarkers(markers)}
          {renderPolygons(polygonData)}
          {renderCircle(currentLocation, CURRENT_LOCATION_RADIUS)}
        </ClusteredMapView>
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

export default GmsLocationMap;
