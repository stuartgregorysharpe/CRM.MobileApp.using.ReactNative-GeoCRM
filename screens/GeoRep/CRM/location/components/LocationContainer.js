import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect, useMemo, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {CHANGE_POLYGONS} from '../../../../../actions/actionTypes';
import {
  getLocationFilters,
  getLocationMapByRegion,
  getLocationPinKey,
} from '../../../../../actions/location.action';
import SearchBar from '../../../../../components/SearchBar';
import {breakPoint} from '../../../../../constants/Breakpoint';
import {expireToken} from '../../../../../constants/Helper';
import {getMapMinZoomLevel} from '../../../../../constants/Storage';
import LocationMap from '../../../../../services/Map/LocationMap';
import {CrmCalendarSelection} from '../../partial/CrmCalendarSelection';
import MarkerViewModal from '../../partial/MarkerViewModal';
import PinKeySlideUp from '../../popup/PinKeySlideUp';
import {getPolygonData} from '../helper';
import LocationWatcher from './LocationWatcher';
let previousZoom = 0;
const LocationContainer = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const polygons = useSelector(state => state.location.polygons);
  const [markers, setMarkers] = useState([]);
  const polygonData = useMemo(() => getPolygonData(polygons), [polygons]);
  const mapFilters = useSelector(state => state.selection.mapFilters);
  const [boundBox, setBoundBox] = useState(undefined);
  const [isDrawMode, setIsDrawMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isZoomOut, setIsZoomOut] = useState(false);
  const markerModalRef = useRef(null);

  const isCalendarSelection = useSelector(
    state => state.selection.isCalendarSelection,
  );
  const onLoadMarkers = (_currentLocation, boundBox) => {
    const isLoadable =
      _currentLocation &&
      _currentLocation.latitude !== undefined &&
      boundBox &&
      !isLoading;
    console.log('isLoadable', isLoadable);
    console.log('isLoading', isLoading);
    if (isLoadable) {
      setIsLoading(true);
      getLocationMapByRegion(_currentLocation, boundBox)
        .then(res => {
          setIsLoading(false);
          console.log('getLocationMapByRegion', res);
          setMarkers(res.locations);
          dispatch({type: CHANGE_POLYGONS, payload: res.polygons});
        })
        .catch(e => {
          setIsLoading(false);
          expireToken(dispatch, e);
        });
    }
  };
  useEffect(() => {
    onLoadMarkers(currentLocation, boundBox);
  }, [mapFilters, currentLocation]);
  const onRegionChanged = async (region, markers, bBox, zoom) => {
    console.log('onRegionChanged');
    const minZoomLevel = await getMapMinZoomLevel();
    if (zoom >= minZoomLevel) {
      if (isZoomOut === true) {
        setIsZoomOut(false);
      }
    } else {
      if (isZoomOut === false) {
        setIsZoomOut(true);
      }
    }

    const isRegionMarkerCountSmall =
      (markers !== undefined && markers.length < 20) || markers === undefined;
    console.log('isRegionMarkerCountSmall', isRegionMarkerCountSmall);
    const isZoomLevelChangedToMinZoomLevel =
      (previousZoom < minZoomLevel && zoom >= minZoomLevel) ||
      (previousZoom >= zoom && zoom >= minZoomLevel);
    console.log(
      'isZoomLevelChangedToMinZoomLevel',
      isZoomLevelChangedToMinZoomLevel,
    );
    console.log('minZoomLevel', minZoomLevel);
    console.log('zoom', zoom);
    console.log('bBox', bBox);
    const isReloadMarkers =
      !isDrawMode &&
      isRegionMarkerCountSmall &&
      isZoomLevelChangedToMinZoomLevel;
    console.log('isReloadMarkers', isReloadMarkers);
    if (isReloadMarkers) {
      setBoundBox(bBox);
      onLoadMarkers(currentLocation, bBox);
    }
    previousZoom = zoom;
  };
  const navigateToSearchLocation = () => {
    navigation.navigate('LocationSearch');
  };
  const onPressSearch = () => {
    navigateToSearchLocation();
  };
  const onFilterPress = () => {
    dispatch(getLocationFilters());
    //open filter view
  };
  const onOpenMarkerModal = () => {
    dispatch(getLocationPinKey());
    if (markerModalRef && markerModalRef.current) {
      markerModalRef.current.showModal();
    }
  };

  const onMarkerPressed = (item, key) => {};
  return (
    <View style={[styles.container, props.style]}>
      <LocationWatcher />
      <SearchBar
        isFilter
        onSearchBoxPress={onPressSearch}
        suffixButtonIcon="Filter"
        onSuffixButtonPress={onFilterPress}
      />
      {isCalendarSelection && (
        <CrmCalendarSelection
          isDraw={isDrawMode}
          onClickDraw={() => {
            setIsDrawMode(!isDrawMode);
          }}
          onClickCancel={() => {
            navigateToSearchLocation();
          }}
          onClickList={() => {
            navigateToSearchLocation();
          }}></CrmCalendarSelection>
      )}
      <LocationMap
        polygonData={polygonData}
        markers={markers}
        currentLocation={currentLocation}
        isDrawMode={isDrawMode}
        onMarkerPressed={onMarkerPressed}
        onRegionChangeComplete={onRegionChanged}
      />

      <TouchableOpacity style={styles.pinKeyButton} onPress={onOpenMarkerModal}>
        <PinKeySlideUp />
      </TouchableOpacity>
      <MarkerViewModal ref={markerModalRef} hideClose hideClear />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pinKeyButton: {
    position: 'absolute',
    right: 9,
    bottom: 70,
    padding: 5,
  },
});

export default LocationContainer;
