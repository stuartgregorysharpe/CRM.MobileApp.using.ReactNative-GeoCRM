import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {CHANGE_CURRENT_LOCATION} from '../../../../../actions/actionTypes';
import LocationService from '../../../../../services/LocationService';

const LocationWatcher = props => {
  const dispatch = useDispatch();
  const watchIdRef = useRef(null);
  useEffect(() => {
    initLocationWatch();
    return () => {
      clearLocationWatch();
    };
  }, []);

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
    if (watchIdRef.current) {
      LocationService.getLocationService().then(locationService => {
        locationService.clearWatch(watchIdRef.current);
      });
    }
  };
  return <></>;
};

export default LocationWatcher;
