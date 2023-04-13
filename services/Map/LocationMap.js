import React, {useState, useEffect} from 'react';
import { View } from 'react-native';
import AvailabilityService from '../AvailabilityService';
import GmsLocationMap from './GmsMap/GmsLocationMap';
import HmsLocationMap from './HsmMap/HmsLocationMap';
const LocationMap = props => {

  const [isHms, setIsHms] = useState('');

  useEffect(() => {    
    AvailabilityService.isHMSService().then(isHms => {
      if(isHms){
        setIsHms('hms');
      }else{
        setIsHms('gms');
      }      
    });        
  }, []);
  
  if (isHms === 'hms') {
    return <HmsLocationMap {...props} />;
  }else if(isHms === 'gms'){
    return <GmsLocationMap {...props} />;
  }else {
    return <View></View>
  }

};

export default LocationMap;
