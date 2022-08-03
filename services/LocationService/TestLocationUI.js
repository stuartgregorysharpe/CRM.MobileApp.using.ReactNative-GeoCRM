import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import {Colors} from 'react-native-paper';
import LocationService from '.';
import {Fonts} from '../../constants';
import AvailabilityService from '../AvailabilityService';
const TestLocationUI = props => {
  const [currentPosition, setCurrentPosition] = useState({});
  const [serviceType, setServiceType] = useState(3);
  const [isHmsAvailable, setIsHmsAvailable] = useState(false);
  const [status, setStatus] = useState('');
  const [parsedLocation, setParsedLocation] = useState('');
  const [reversedAddress, setReversedAddress] = useState('');
  const currentPositionString = `${currentPosition.latitude},${currentPosition.longitude}`;

  const getServiceTypeString = serviceType => {
    if (serviceType == 1) return 'GMS Service';
    if (serviceType == 2) return 'HMS Service';
    return 'Auto';
  };
  const serviceTypeString = getServiceTypeString(serviceType);
  useEffect(() => {
    onLoad();
  }, [serviceType]);
  const onLoad = () => {
    AvailabilityService.isHMSService().then(isHMS => {
      console.log(isHMS);
      setIsHmsAvailable(isHMS);
    });
    LocationService.getLocationService().then(locationService => {
      locationService.requestPermissions().then(granted => {
        if (granted) {
          getCurrentLocation();
        }
      });
    });
    LocationService.getLocationService().then(locationService => {
      locationService
        .parseCoordinate(
          'Changjiang Community, Huannan Road, Binjiang District, Hangzhou City, Zhejiang Province',
        )
        .then(response => {
          setParsedLocation(JSON.stringify(response));
        });
      locationService
        .getGeocoding(-33.8832223218751, 18.498525368063824)
        .then(address => {
          console.log(JSON.stringify(address));
          setReversedAddress(JSON.stringify(address));
        });
    });
  };

  const getCurrentLocation = () => {
    LocationService.getLocationService().then(locationService => {
      locationService.getCurrentPosition(position => {
        if (position && position.coords) {
          setStatus('getCurrentLocation');
          setCurrentPosition(position.coords);
        }
      });
    });
  };
  return (
    <ScrollView style={[styles.container, props.style]}>
      <Text style={styles.title}>Service Type:</Text>
      <Text style={styles.description}>{serviceTypeString}</Text>
      <Text style={styles.title}>HMS Service Using:</Text>
      <Text style={styles.description}>{isHmsAvailable + ''} </Text>
      <Text style={styles.title}>Location:</Text>
      <Text style={styles.description}>{currentPositionString}</Text>
      <Text style={styles.title}>Location Get Method:</Text>
      <Text style={styles.description}>{status}</Text>
      <Text style={styles.title}>
        Parse Location:Changjiang Community, Huannan Road, Binjiang District,
        Hangzhou City, Zhejiang Province
      </Text>
      <Text style={styles.description}>{parsedLocation}</Text>

      <Text style={styles.title}>-33.890218, 18.510020</Text>
      <Text style={styles.description}>{reversedAddress}</Text>

      <TouchableOpacity
        onPress={() => {
          const nextServiceType = (serviceType % 3) + 1;
          setServiceType(nextServiceType);
          setCurrentPosition({});
        }}>
        <Text style={styles.title}>Switch Service</Text>
      </TouchableOpacity>
    </ScrollView>
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
