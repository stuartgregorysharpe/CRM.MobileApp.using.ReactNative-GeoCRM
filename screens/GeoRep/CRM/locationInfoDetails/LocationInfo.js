import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {whiteLabel} from '../../../../constants/Colors';
import {Fonts} from '../../../../constants';
import SvgIcon from '../../../../components/SvgIcon';
import DeviceInfo from 'react-native-device-info';
import PhotoCameraPickerDialog from '../../../../components/modal/PhotoCameraPickerDialog';
import {
  launchCamera,
  launchImageLibrary,
  requestCameraPermission,
} from '../../../../constants/Utils';
import MsisdnInfo from './MsisdnInfo';
import { useDispatch } from 'react-redux';
import { checkConnectivity } from '../../../../DAO/helper';
import { showOfflineDialog } from '../../../../constants/Helper';

const LocationInfo = props => {

  const {locationInfo, filePath} = props;

  const [isPicker, setIsPicker] = useState(false);
  const dispatch = useDispatch()

  const renderImage = () => {
    if (filePath !== '')
      return <Image style={styles.walmartImage} source={{uri: filePath}} />;
    if (locationInfo.location_image !== '') {
      return (
        <Image
          style={styles.walmartImage}
          source={{uri: locationInfo.location_image}}
        />
      );
    }
    return (
      <View
        style={{
          width: 100,
          paddingTop: 3,
          paddingBottom: 3,          
          borderRadius: 5,
        }}>
        <SvgIcon
          style={styles.fontIcon}
          icon={'Add_Image'}
          width={DeviceInfo.isTablet() ? '150px' : '90px'}
          height={DeviceInfo.isTablet() ? '130px' : '80px'}
        />
      </View>
    );
  };
  const renderLocationImage = () => {
    const isLocationInfoAvailable =
      locationInfo !== undefined && locationInfo.address !== '';
    if (!isLocationInfoAvailable) return null;
    return (
      <View style={[styles.walmartImageBox]}>
        <TouchableOpacity
          onPress={() => {
            checkConnectivity().then((isConnected) => {
              if(isConnected){
                setIsPicker(true);
              }else{
                showOfflineDialog(dispatch);
              }
            })
            
          }}>
          {renderImage()}
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{flexDirection: 'row', flex: 1}}>
      <View style={{flex: 1}}>
        <View style={styles.headerBox}>
          {locationInfo !== undefined && locationInfo.location_name !== '' && (
            <View>
              <View style={[styles.subtitleBox]}>
                <SvgIcon
                  style={styles.fontIcon}
                  icon="Person_Sharp"
                  width="14px"
                  height="16px"
                />

                <Text
                  style={{
                    color: whiteLabel().mainText,
                    fontFamily: Fonts.secondaryMedium,
                    marginLeft: 5,
                    fontSize: 12,
                  }}>
                  Customer Name
                </Text>
              </View>
            </View>
          )}
        </View>

        {locationInfo !== undefined && locationInfo.location_name !== '' && (
          <TouchableOpacity
            onPress={() => {
              if (props.openCustomerInfo) props.openCustomerInfo();
            }}>
            <View style={[styles.headerBox, {marginTop: 0}]}>
              <Text style={styles.title}>
                {' '}
                { locationInfo.location_name ? locationInfo.location_name.value : ''}
              </Text>
            </View>
          </TouchableOpacity>
        )}

        <View style={styles.headerBox}>
          <View style={styles.addressText}>
            {locationInfo !== undefined && locationInfo.address !== '' && (
              <View style={styles.subtitleBox}>
                <SvgIcon
                  style={styles.fontIcon}
                  icon="Location_Arrow"
                  width="16px"
                  height="16px"
                />
                <Text style={styles.subtitle}>Address</Text>
              </View>
            )}
            {locationInfo !== undefined && locationInfo.address !== '' && (
              <TouchableOpacity
                onPress={() => {
                  if (props.openCustomerInfo) props.openCustomerInfo();
                }}>
                <Text style={[styles.title, {marginTop: 3}]}>
                  {locationInfo ? locationInfo.address : ''}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <MsisdnInfo locationInfo={locationInfo} style={{marginLeft: 10}} />
      </View>

      {renderLocationImage()}

      <PhotoCameraPickerDialog
        visible={isPicker}
        message={'Upload or capture an image:'}
        onCamera={() => {
          if (Platform.OS === 'android') {
            requestCameraPermission(isSuccess => {
              if (isSuccess) {
                launchCamera(path => {
                  setIsPicker(false);
                  if (props.onPathUpdated) {
                    props.onPathUpdated(path);
                  }
                });
              }
            });
          } else {
            launchCamera(path => {
              setIsPicker(false);
              if (props.onPathUpdated) {
                props.onPathUpdated(path);
              }
            });
          }
        }}
        onGallery={() => {
          launchImageLibrary(path => {
            setIsPicker(false);
            if (props.onPathUpdated) {
              props.onPathUpdated(path);
            }
          });
        }}
        onModalClose={() => {
          setIsPicker(false);
        }}></PhotoCameraPickerDialog>
    </View>
  );
};

export default LocationInfo;

const styles = StyleSheet.create({
  headerBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },

  subtitleBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  fontIcon: {
    marginRight: 4,
  },

  subtitle: {
    color: whiteLabel().mainText,
    fontSize: 12,
    textAlign: 'left',
    fontFamily: Fonts.secondaryMedium,
  },

  title: {
    fontSize: 14,
    color: '#000',
    fontFamily: Fonts.secondaryBold,
    lineHeight: 20,
  },

  walmartImageBox: {
    alignItems: 'flex-end',
  },

  walmartImage: {
    borderWidth: 1,
    borderColor: whiteLabel().fieldBorder,
    borderRadius: 7,
    width: Dimensions.get('screen').width / 4.5,
    height: Dimensions.get('screen').width / 4.5,
  },
});
