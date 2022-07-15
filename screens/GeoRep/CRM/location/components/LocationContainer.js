import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getLocationFilters,
  getLocationMapByRegion,
} from '../../../../../actions/location.action';
import SearchBar from '../../../../../components/SearchBar';
import {expireToken} from '../../../../../constants/Helper';
import {getMapMinZoomLevel} from '../../../../../constants/Storage';
import LocationMap from '../../../../../services/Map/LocationMap';
import {CrmCalendarSelection} from '../../partial/CrmCalendarSelection';
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
  const isCalendarSelection = useSelector(
    state => state.selection.isCalendarSelection,
  );
  const onLoadMarkers = (_currentLocation, boundBox) => {
    const isLoadable =
      _currentLocation &&
      _currentLocation.latitude !== undefined &&
      boundBox &&
      !isLoading;
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
          expireToken(dispatch, e);
        });
    }
  };
  useEffect(() => {
    onLoadMarkers(currentLocation, boundBox);
  }, [mapFilters, currentLocation]);
  onRegionChanged = async (region, markers, bBox, zoom) => {
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
    const isZoomLevelChangedToMinZoomLevel =
      (previousZoom < minZoomLevel && zoom >= minZoomLevel) ||
      (previousZoom >= zoom && zoom >= minZoomLevel);

    const isReloadMarkers =
      !isDrawMode &&
      isRegionMarkerCountSmall &&
      isZoomLevelChangedToMinZoomLevel;
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
        onRegionChangeComplete={onRegionChanged}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LocationContainer;
