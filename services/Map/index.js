import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import AvailabilityService from '../AvailabilityService';
import GmsMap from './GmsMap';
import HmsMap from './HsmMap';
const MapView = props => {
  const [isHms, setIsHms] = useState(false);
  useEffect(() => {
    AvailabilityService.isHMSService().then(isHms => {
      setIsHms(isHms);
    });
  }, []);
  if (isHms) {
    return <HmsMap {...props} />;
  }
  return <GmsMap {...props} />;
};

export default MapView;
