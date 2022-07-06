import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Colors} from 'react-native-paper';
import LocationService from '.';
import {Fonts} from '../../constants';
import AvailabilityService from '../AvailabilityService';
const TestLocationUI = props => {
  const [currentPosition, setCurrentPosition] = useState({});
  const [serviceType, setServiceType] = useState(3);
  const [isHmsAvailable, setIsHmsAvailable] = useState(false);
  const currentPositionString = `${currentPosition.latitude},${currentPosition.longitude}`;
  const [status, setStatus] = useState('');
  const serviceTypeString = getServiceTypeString(serviceType);
  const getServiceTypeString = serviceType => {
    if (serviceType == 1) return 'GMS Service';
    if (serviceType == 2) return 'HMS Service';
    return 'Auto';
  };
  useEffect(() => {
    onLoad();
  }, [serviceType]);
  const onLoad = () => {
    AvailabilityService.isHMSService().then(isHMS => {
      setIsHmsAvailable(isHMS);
    });
    LocationService.getLocationService()
      .requestPermissions()
      .then(granted => {
        if (granted) {
          getCurrentLocation();
        }
      });
  };

  const getCurrentLocation = () => {
    LocationService.getLocationService().getCurrentPosition(position => {
      if (position && position.coords) {
        setStatus('getCurrentLocation');
        setCurrentPosition(position.coords);
      }
    });
  };
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.title}>Service Type:</Text>
      <Text style={styles.description}>{serviceTypeString}</Text>
      <Text style={styles.title}>HMS Available:</Text>
      <Text style={styles.description}>{isHmsAvailable}</Text>
      <Text style={styles.title}>Location:</Text>
      <Text style={styles.description}>{currentPositionString}</Text>
      <Text style={styles.title}>Location Get Method:</Text>
      <Text style={styles.description}>{status}</Text>

      <TouchableOpacity
        onPress={() => {
          const nextServiceType = (serviceType % 3) + 1;
          setServiceType(nextServiceType);
        }}>
        <Text style={styles.title}>Switch Service</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  title: {
    fontFamily: Fonts.primaryBold,
    fontSize: 20,
    marginTop: 16,
    marginLeft: 16,
    color: Colors.black,
  },
  description: {
    fontFamily: Fonts.primaryRegular,
    fontSize: 16,
    marginTop: 16,
    marginLeft: 16,
    color: Colors.black,
  },
});

export default TestLocationUI;
