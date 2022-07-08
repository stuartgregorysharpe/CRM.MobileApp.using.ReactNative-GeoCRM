import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import AvailabilityService from '../AvailabilityService';
import GmsLocationMap from './GmsMap/GmsLocationMap';
import HmsLocationMap from './HsmMap/HmsLocationMap';
const LocationMap = props => {
  const [isHms, setIsHms] = useState(false);
  useEffect(() => {
    AvailabilityService.isHMSService().then(isHms => {
      setIsHms(isHms);
    });
  }, []);
  if (isHms) {
    return <GmsLocationMap {...props} />;
  }
  return <HmsLocationMap {...props} />;
};

export default LocationMap;
