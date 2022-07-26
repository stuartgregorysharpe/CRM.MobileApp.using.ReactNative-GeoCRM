import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect, useMemo, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  CHANGE_POLYGONS,
  IS_CALENDAR_SELECTION,
  SELECTED_LOCATIONS_FOR_CALENDAR,
} from '../../../../../actions/actionTypes';
import {
  getLocationFilters,
  getLocationInfo,
  getLocationMapByRegion,
  getLocationPinKey,
} from '../../../../../actions/location.action';
import AddToCalendarModal from '../../../../../components/modal/AddToCalendarModal';
import LocationFilterModal from '../../../../../components/modal/LocationFilterModal';
import SearchBar from '../../../../../components/SearchBar';
import SvgIcon from '../../../../../components/SvgIcon';
import {breakPoint} from '../../../../../constants/Breakpoint';
import {expireToken} from '../../../../../constants/Helper';
import {
  getLocalData,
  getMapMinZoomLevel,
} from '../../../../../constants/Storage';
import LocationMap from '../../../../../services/Map/LocationMap';
import AddLeadModal from '../../add_lead';
import CheckInStatusView from '../../partial/CheckInStatusView';
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
  const isCheckin = useSelector(state => state.location.checkIn);
  const polygons = useSelector(state => state.location.polygons);
  const [markers, setMarkers] = useState([]);
  const polygonData = useMemo(() => getPolygonData(polygons), [polygons]);
  const mapFilters = useSelector(state => state.selection.mapFilters);
  const [boundBox, setBoundBox] = useState(undefined);
  const [isDrawMode, setIsDrawMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isZoomOut, setIsZoomOut] = useState(false);
  const markerModalRef = useRef(null);
  const locationFilterModalRef = useRef(null);
  const addToCalendarModalRef = useRef(null);
  const addLeadModalRef = useRef(null);

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
    if (locationFilterModalRef && locationFilterModalRef.current) {
      locationFilterModalRef.current.showModal();
    }
  };
  const onOpenMarkerModal = () => {
    dispatch(getLocationPinKey());
    if (markerModalRef && markerModalRef.current) {
      markerModalRef.current.showModal();
    }
  };
  const onOpenAddToCalendar = () => {
    if (addToCalendarModalRef && addToCalendarModalRef.current) {
      addToCalendarModalRef.current.showModal();
    }
  };
  const onAddLeadModalClosed = ({type, value}) => {
    if (type == Constants.actionType.ACTION_CLOSE) {
      addLeadModalRef.current.hideModal();
    }
    if (type == Constants.actionType.ACTION_DONE) {
      addLeadModalRef.current.hideModal();
      openLocationInfoDetails(Number(value));
    }
  };
  const openLocationInfoDetails = location_id => {
    //animation('locationInfo');
    if (currentLocation && currentLocation.latitude !== undefined) {
      getLocationInfo(Number(location_id), currentLocation)
        .then(res => {
          if (
            locationRef !== undefined &&
            locationRef.current !== undefined &&
            locationRef.current !== null
          ) {
            locationRef.current.updateView(res);
            setLocationInfo(res);
          }
        })
        .catch(e => {
          expireToken(dispatch, e);
          setIsRequest(false);
        });
    }
  };
  const onCheckIn = async () => {
    const specificLocationId = await getLocalData('@specific_location_id');
    props.navigation.navigate('LocationSpecificInfo', {
      locationId: specificLocationId,
      page: 'checkin',
    });
  };
  const onFinishDrawing = selectedMarkers => {};
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
          }}
          onClickAddToCalendar={onOpenAddToCalendar}
        />
      )}
      <LocationMap
        polygonData={polygonData}
        markers={markers}
        currentLocation={currentLocation}
        isDrawMode={isDrawMode}
        onMarkerPressed={onMarkerPressed}
        onRegionChangeComplete={onRegionChanged}
        onFinishDrawing={onFinishDrawing}
      />
      {isCheckin && <CheckInStatusView page="map" onGo={onCheckIn} />}

      <TouchableOpacity
        style={[styles.plusButton, {marginBottom: isCheckin ? 40 : 0}]}
        onPress={() => {
          if (addLeadModalRef.current) {
            addLeadModalRef.current.showModal();
          }
        }}>
        <SvgIcon icon="Round_Btn_Default_Dark" width="70px" height="70px" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.pinKeyButton} onPress={onOpenMarkerModal}>
        <PinKeySlideUp />
      </TouchableOpacity>
      <MarkerViewModal ref={markerModalRef} />
      <LocationFilterModal ref={locationFilterModalRef} page={'map'} />
      <AddToCalendarModal
        ref={addToCalendarModalRef}
        onButtonAction={() => {
          dispatch({type: IS_CALENDAR_SELECTION, payload: false});
          dispatch({type: SELECTED_LOCATIONS_FOR_CALENDAR, payload: []});
        }}
      />
      <AddLeadModal
        title="Add Lead"
        ref={addLeadModalRef}
        navigation={navigation}
        onButtonAction={onAddLeadModalClosed}
      />
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
  plusButton: {
    position: 'absolute',
    right: 20,
    bottom: 110,
  },
});

export default LocationContainer;
