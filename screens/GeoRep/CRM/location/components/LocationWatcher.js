import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, AppState} from 'react-native';
import {useDispatch} from 'react-redux';
import {CHANGE_CURRENT_LOCATION} from '../../../../../actions/actionTypes';
import {updateCurrentLocation} from '../../../../../actions/google.action';
import LocationService from '../../../../../services/LocationService';

const LocationWatcher = props => {
  const dispatch = useDispatch();
  const watchIdRef = useRef(null);
  const appState = useRef(AppState.currentState);
  useEffect(() => {
    requestPermissions();
    initLocationWatch();
    return () => {
      clearLocationWatch();
    };
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {        
        initLocationWatch();
      }
      if (
        appState.current.match(/active/) &&
        (nextAppState === 'inactive' || nextAppState === 'background')
      ) {
        clearLocationWatch();
      }
      appState.current = nextAppState;
    });

    return () => {
      clearLocationWatch();
      subscription.remove();
    };
  }, []);

  async function requestPermissions() {
    LocationService.getLocationService().then(locationService => {
      locationService.requestPermissions().then(granted => {
        if (granted) {
          dispatch(updateCurrentLocation());
        }
      });
    });
  }

  const onUpdateCurrentLocation = position => {
    dispatch({
      type: CHANGE_CURRENT_LOCATION,
      payload: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
      },
    });
  };

  const initLocationWatch = () => {
    console.log('initLocationWatch ----');
    LocationService.getLocationService().then(locationService => {
      locationService.watchPosition(
        onUpdateCurrentLocation,
        null,
        {},
        watchId => {
          watchIdRef.current = watchId;
        },
      );
    });
  };
  const clearLocationWatch = () => {
    console.log('clearLocationWatch ----', watchIdRef.current);
    if (watchIdRef.current) {
      LocationService.getLocationService().then(locationService => {
        locationService.clearWatch(watchIdRef.current);
      });
    }
  };
  return <></>;
};

export default LocationWatcher;
