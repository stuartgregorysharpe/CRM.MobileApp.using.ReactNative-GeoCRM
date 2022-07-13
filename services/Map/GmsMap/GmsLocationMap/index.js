import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {whiteLabel} from '../../../../constants/Colors';
import ClusteredMapView from '../../../../screens/GeoRep/CRM/components/ClusteredMapView';
let polylineKey = 0;
const GmsLocationMap = props => {
  const {isDrawMode, currentLocation, isTrackViewChanges, polygon} = props;
  const [polylineEditing, setPolylineEditing] = useState(null);
  const isShowFinishButton =
    isDrawMode &&
    polylineEditing != null &&
    polylineEditing.coordinates.length >= 0;
  const onPressMap = e => {
    if (props.onPressMap) {
      props.onPressMap(e);
    }
    if (isDrawMode) {
      onDrawPolyline(e.nativeEvent.coordinate);
    }
  };
  const onDrawPolyline = coordinate => {
    if (!polylineEditing) {
      setPolylineEditing({
        id: polylineKey++,
        coordinates: [coordinate],
        holes: [],
      });
    } else {
      setEditing({
        ...editing,
        coordinates: [...editing.coordinates, coordinate],
      });
      if (editing.coordinates.length >= 2 && isFinish === false) {
        setIsFinish(true);
      }
    }
  };
  const onFinishDrawing = () => {};
  const onRegionChangeComplete = (region, markers, bBox, zoom) => {
    if (props.onRegionChangeComplete) {
      props.onRegionChangeComplete(region, markers, bBox, zoom);
    }
  };
  return (
    <View style={[styles.container, props.style]}>
      <ClusteredMapView
        clusterColor={whiteLabel().mainText}
        ref={map}
        clusteringEnabled={true}
        style={styles.mapView}
        editing={editing}
        scrollEnabled={!isDrawMode}
        onRegionChangeComplete={onRegionChangeComplete}
        onPress={onPressMap}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        }}
        currentLocation={currentLocation}></ClusteredMapView>
      {isShowFinishButton && (
        <TouchableOpacity
          style={styles.finishBtnStyle}
          onPress={onFinishDrawing}>
          <Text style={styles.finishButtonText}></Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  finishButtonText: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: Fonts.primaryMedium,
    color: whiteLabel().actionFullButtonText,
  },
  finishBtnStyle: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 7,
    backgroundColor: whiteLabel().actionFullButtonBackground,
  },
});

export default GmsLocationMap;
