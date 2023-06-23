import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect, useMemo, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  CHANGE_LOCATION_FILTERS,
  CHANGE_PIN_KEY,
  CHANGE_POLYGONS,
  IS_CALENDAR_SELECTION,
  SELECTED_LOCATIONS_FOR_CALENDAR,
  STATUS_PIN_KEY,
} from '../../../../../actions/actionTypes';
import {
  getLocationFilters,
  getLocationInfo,
} from '../../../../../actions/location.action';
import AddToCalendarModal from '../../../../../components/modal/add_to_calendar';
import AlertModal from '../../../../../components/modal/AlertModal';
import FilterYourSearchModal from '../../../../../components/modal/filter_your_search';
import SearchBar from '../../../../../components/SearchBar';
import SvgIcon from '../../../../../components/SvgIcon';
import {Constants} from '../../../../../constants';
import {expireToken} from '../../../../../constants/Helper';
import {
  getJsonData,
  getLocalData,
  getMapMinZoomLevel,
} from '../../../../../constants/Storage';
import {LocationMapDAO, LocationPinKeyDAO} from '../../../../../DAO';
import LocationMap from '../../../../../services/Map/LocationMap';
import AddLeadModal from '../../add_lead';
import LocationInfoDetailModal from '../../locationInfoDetails/LocationInfoDetailModal';
import CheckInStatusView from '../../partial/CheckInStatusView';
import {CrmCalendarSelection} from '../../partial/CrmCalendarSelection';
import MarkerViewModal from '../../partial/MarkerViewModal';
import PinKeySlideUp from '../../popup/PinKeySlideUp';
import {getPolygonData} from '../helper';
import Bubble from './Bubble';
import LocationWatcher from './LocationWatcher';
let previousZoom = 0;

const LocationContainer = props => {
  
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const isCheckin = useSelector(state => state.location.checkIn);
  const polygons = useSelector(state => state.location.polygons);
  const selectedLocationsForCalendar = useSelector(
    state => state.selection.selectedLocationsForCalendar,
  );
  const [markers, setMarkers] = useState([]);

  const [boundBox, setBoundBox] = useState(undefined);
  const [isDrawMode, setIsDrawMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isZoomOut, setIsZoomOut] = useState(false);
  const [locationInfo, setLocationInfo] = useState();
  const [isFinish, setIsFinish] = useState(false);
  const polygonData = useMemo(() => getPolygonData(polygons), [polygons]);
  const mapFilters = useSelector(state => state.selection.mapFilters);
  const markerModalRef = useRef(null);
  const locationFilterModalRef = useRef(null);
  const addToCalendarModalRef = useRef(null);
  const addLeadModalRef = useRef(null);
  const locationInfoModalRef = useRef(null);
  const alertModalRef = useRef();

  const isShowZoomLabel = isZoomOut || isLoading;
  const isCalendarSelection = useSelector(
    state => state.selection.isCalendarSelection,
  );
  const features = useSelector(
    state => state.selection.payload.user_scopes.geo_rep.features,
  );
  


  const onLoadMarkers = (_currentLocation, boundBox) => {
    const isLoadable =
      _currentLocation &&
      _currentLocation.latitude !== undefined &&
      boundBox &&
      !isLoading;

    if (isLoadable) {
      setIsLoading(true);
      LocationMapDAO.find(_currentLocation, boundBox, features)
        .then(res => {
          getJsonData('@map_pin_key').then(mapPinSvg => {
            setIsLoading(false);
            setMarkers(
              res.locations.map((location, index) => {
                let foundPinSvg = null;
                if (mapPinSvg) {
                  foundPinSvg = mapPinSvg.find(
                    element =>
                      parseInt(element.pin_id) == parseInt(location.pin_id),
                  );
                }

                return {
                  ...location,
                  pinIcon: foundPinSvg,
                  schedule_order: (index + 1).toString(),
                };
              }),
            );
          });
          dispatch({type: CHANGE_POLYGONS, payload: res.polygons});
        })
        .catch(e => {
          console.log('location map api error : ', e);
          setIsLoading(false);
          expireToken(dispatch, e, alertModalRef);
        });
    }
  };
  useEffect(() => {
    onLoadMarkers(currentLocation, boundBox);
  }, [mapFilters]);
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
    const isReloadMarkers = !isDrawMode && isZoomLevelChangedToMinZoomLevel;
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
    if(isCalendarSelection){      
      if(isDrawMode){
        setIsFinish(true);
      }
    }
    navigateToSearchLocation();
  };

  const onFilterPress = () => {
    if (locationFilterModalRef && locationFilterModalRef.current) {
      locationFilterModalRef.current.showModal();
    }
    getLocationFilters( (type, respnose) => {
      if(type == 'success'){
        dispatch({type: CHANGE_LOCATION_FILTERS, payload: respnose});
      }else if(type == 'failed'){
        locationFilterModalRef.current.hideModal();
        expireToken(dispatch, respnose, alertModalRef);
      }
    });
    
  };

  const onOpenMarkerModal = () => {
    if (markerModalRef && markerModalRef.current) {
      markerModalRef.current.showModal();
    }

    LocationPinKeyDAO.find(features)
      .then(pins => {
        dispatch({type: STATUS_PIN_KEY, payload: 'success'});
        dispatch({type: CHANGE_PIN_KEY, payload: pins});
      })
      .catch(e => {
        console.log('locaiton pin key api error: ', e);
        expireToken(dispatch, e , alertModalRef);
      });
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
      if (value != undefined && value != '') {
        openLocationInfoDetails(Number(value));
      }
    }
  };
  const openLocationInfoDetails = locationId => {
    if (locationInfoModalRef && locationInfoModalRef.current) {
      console.log('open modal');
      locationInfoModalRef.current.showModal();
    }
    if (currentLocation && currentLocation.latitude !== undefined) {
      setLocationInfo(undefined);
      getLocationInfo(locationId, currentLocation)
        .then(res => {
          setLocationInfo(res);
        })
        .catch(e => {
          expireToken(dispatch, e , alertModalRef);
        });
    }
  };
  const onCheckIn = async () => {
    const specificLocationId = await getLocalData('@specific_location_id');
    navigation.navigate('LocationSpecificInfo', {
      locationId: specificLocationId,
      page: 'checkin',
    });
  };

  const onFinishDrawing = selectedMarkers => {
    console.log('onFinishDrawing', selectedMarkers);
    setIsDrawMode(false);
    if (!selectedMarkers) return;
    const selectedLocations = selectedMarkers.map(marker => {
      return {
        schedule_order: marker.schedule_order,
        location_id: marker.location_id,
        schedule_date: 'Today',
        schedule_time: '',
        schedule_end_time: '',
      };
    });
    dispatch({
      type: SELECTED_LOCATIONS_FOR_CALENDAR,
      payload: selectedLocations,
    });
  };

  const onMarkerPressed = (item, key) => {
    const itemLocationId = item.location_id;
    if (isCalendarSelection) {
      let selectedLocations = [...selectedLocationsForCalendar];
      const foundLocation = selectedLocations.find(
        x => x.location_id === itemLocationId,
      );

      if (foundLocation) {
        selectedLocations = selectedLocations.filter(
          ele => ele.location_id !== itemLocationId,
        );
      } else {
        selectedLocations = [
          ...selectedLocations,
          {
            schedule_order: item.schedule_order,
            location_id: itemLocationId,
            schedule_date: 'Today',
            schedule_time: '',
            schedule_end_time: '',
          },
        ];
      }
      dispatch({
        type: SELECTED_LOCATIONS_FOR_CALENDAR,
        payload: selectedLocations,
      });
    } else {
      openLocationInfoDetails(Number(item.location_id));
    }
  };

  const detailModalClosed = ({type, value}) => {
    if (type == Constants.actionType.ACTION_CLOSE) {
      locationInfoModalRef.current.hideModal();      
      if (value === 'access_crm' || value == 'checkin') {
        navigation.navigate('LocationSpecificInfo', {
          data: locationInfo,
          page: value,
        });
      }
    }else if(type == Constants.actionType.ACTION_REFRESH){
      if(value != undefined)
        openLocationInfoDetails(Number(value));      
    }
  }

  const onAddToCalendarClosed = ({ type, value}) => {
    if (type == Constants.actionType.ACTION_CLOSE) {
      addToCalendarModalRef.current.hideModal();      
    }else if(type == Constants.actionType.ACTION_DONE) {
      addToCalendarModalRef.current.hideModal();            
      dispatch({type: IS_CALENDAR_SELECTION, payload: false});
      dispatch({type: SELECTED_LOCATIONS_FOR_CALENDAR, payload: []});
    }
  }

  return (
    <View style={[styles.container, props.style]}>
      <LocationWatcher />
      <AlertModal ref={alertModalRef} />
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
            setIsDrawMode(false);
            dispatch({type: IS_CALENDAR_SELECTION, payload: false});
            dispatch({type: SELECTED_LOCATIONS_FOR_CALENDAR, payload: []});
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
        selectedLocations={selectedLocationsForCalendar}
        isDrawMode={isDrawMode}
        isFinish={isFinish}
        onMarkerPressed={onMarkerPressed}
        onRegionChangeComplete={onRegionChanged}
        onFinishDrawing={onFinishDrawing}
        onFinishUpdate={() => setIsFinish(false)}
      />

      {isShowZoomLabel && (
        <Bubble
          title="Zoomed out too far, zoom in to see results"
          isLoading={isLoading}
        />
      )}

      {isCheckin && !isDrawMode && (
        <CheckInStatusView page="map" onGo={onCheckIn} />
      )}

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

      <FilterYourSearchModal
          title='Filter Your Search'
          ref={locationFilterModalRef}
          page={'map'}
      />      
      
      <AddToCalendarModal
        ref={addToCalendarModalRef}
        selectedItems={selectedLocationsForCalendar}
        onButtonAction={onAddToCalendarClosed}        
      />
      <AddLeadModal
        //title="Add Lead"
        ref={addLeadModalRef}
        navigation={navigation}
        onButtonAction={onAddLeadModalClosed}
      />
      <LocationInfoDetailModal
        ref={locationInfoModalRef}
        locInfo={locationInfo}
        navigation={navigation}
        pageType={{name: 'search-lists'}}
        onButtonAction={detailModalClosed}
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
    bottom: 30,
    padding: 5,
  },
  plusButton: {
    position: 'absolute',
    right: 20,
    bottom: 70,
  },
});

export default LocationContainer;
