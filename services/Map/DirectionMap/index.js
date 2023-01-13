import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import AvailabilityService from '../../AvailabilityService';
import GmsDirectionMap from '../GmsMap/GmsDirectionMap';
import HmsDirectionMap from '../HsmMap/HmsDirectionMap';

const DirectionMap = props => {
  const [isHms, setIsHms] = useState(false);
  useEffect(() => {    
    AvailabilityService.isHMSService().then(isHms => {
      setIsHms(isHms);
    });
  }, []);
  if (isHms) {
    return <HmsDirectionMap {...props} />;
  }
  return <GmsDirectionMap {...props} />;
};

export default DirectionMap;
 