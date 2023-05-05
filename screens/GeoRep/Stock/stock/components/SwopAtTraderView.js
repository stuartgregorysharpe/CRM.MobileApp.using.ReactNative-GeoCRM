import {View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import React, {useState} from 'react';
import CSingleSelectInput from '../../../../../components/common/SelectInput/CSingleSelectInput';
import {AppText} from '../../../../../components/common/AppText';
import Colors, {whiteLabel} from '../../../../../constants/Colors';
import CardView from '../../../../../components/common/CardView';
import CTextInput from '../../../../../components/common/CTextInput';
import {SubmitButton} from '../../../../../components/shared/SubmitButton';
import DropdownInput from '../../../../../components/common/DropdownInput/DropdownInput';
import TakePhotoView from '../../../../../components/shared/TakePhotoView';
import {Constants, Strings} from '../../../../../constants';
import {validateMsisdn} from '../../../../../helpers/validateHelper';
import {useDispatch} from 'react-redux';
import {showNotification} from '../../../../../actions/notification.action';
import {Notification} from '../../../../../components/modal/Notification';
import LoadingProgressBar from '../../../../../components/modal/LoadingProgressBar';
var previousText = Constants.msisdnPrefix;

const SwopAtTraderView = props => {
  const {item, lists, onReturnDevice, onReason, onPhotos, onSwop} = props;
  const dispatch = useDispatch();
  const [reason, setReason] = useState('');
  const [reasonLists, setReasonLists] = useState([
    {value: 'Damaged', label: 'Damaged'},
    {value: 'Device Cleanup', label: 'Device Cleanup'},
    {value: 'Discontinued', label: 'Discontinued'},    
    {value: 'Faulty', label: 'Faulty'},
    {value: 'Used', label: 'Used'},
  ]);
      
  const [msisdn, setMsisdn] = useState(Constants.msisdnPrefix);
  const [photos, setPhotos] = useState([]);
  const [device, setDevice] = useState(null);
  const [deviceType, setDeviceType] = useState(null);
  const [hasMsisdnError, setHasMsisdnError] = useState(false);
  const [hasSelectDeviceError, setHasSelectDeviceError] = useState(false);
  const [hasReasonError, setHasReasonError] = useState(false);
  const [hasDeviceTypeError, setHasDeviceTypeError] = useState(false);

  const checkEnabled = (device, reason, photos) => {
    if (
      validateMsisdn(msisdn) &&
      device != null &&
      reason != '' &&
      photos.length > 0
    ) {
    } else {
    }
  };

  return (
    <ScrollView style={styles.container}>
      <AppText
        title="Return Device"
        type="secondaryBold"
        size="medium"></AppText>
      <DropdownInput
        title="Select Device"
        lists={lists}
        hasError={hasSelectDeviceError}
        onItemSelected={item => {
          console.log('onSelectItem', item);
          if (onReturnDevice) {
            onReturnDevice(item);
          }
          if (item) {
            setHasSelectDeviceError(false);
          }

          setDevice(item);
          checkEnabled(item, reason, photos);
        }}></DropdownInput>

      <CSingleSelectInput
        description={'Reason'}
        placeholder={'Select ' + 'Reason'}
        mode="single"
        checkedValue={reason}
        items={reasonLists}
        hasError={hasReasonError}
        disabled={false}
        onSelectItem={item => {
          setReason(item.label);
          setHasReasonError(false);
          console.log('selected reason', item);
          if (onReason) {
            onReason(item.label);
          }
          checkEnabled(device, item.label, photos);
        }}
        containerStyle={{marginTop: 15}}
      />

      <TakePhotoView
        isOptimize={true}
        onUpdatePhotos={photos => {
          setPhotos(photos);

          if (onPhotos) {
            onPhotos(photos);
          }
          checkEnabled(device, reason, photos);
        }}
        disabled={false}
        photos={photos}
        style={{marginVertical: 24}}
      />

      <AppText
        title={Strings.Stock.Allocate_Device}
        type="secondaryBold"
        size="medium"></AppText>

      <CardView
        style={{
          marginTop: 10,
          borderColor: whiteLabel().borderColor,
          borderWidth: 1,
        }}>
        <View style={{padding: 5}}>
          <AppText
            size="medium"
            type="secondaryBold"
            title={item != undefined ? item.description : ''}
            color={whiteLabel().mainText}></AppText>
          <AppText
            title={item != undefined ? Constants.stockPrefix.MSN_IMEI + item.serial : Constants.stockPrefix.DEVICE}
            color={whiteLabel().subText}></AppText>
        </View>
      </CardView>

      <CTextInput
        label={Strings.Assign_Msisdn}
        value={msisdn}
        returnKeyType={'done'}
        keyboardType={'number-pad'}
        isRequired={true}
        maxLength={11}
        hasError={hasMsisdnError}
        errorText={Strings.MSISDN_Error_Message}
        onChangeText={text => {
          if (text.length <= 2) {
            setMsisdn(Constants.msisdnPrefix);
          } else {
            if (text.startsWith(Constants.msisdnPrefix)) {
              setMsisdn(text);
              previousText = text;
            } else {
              setMsisdn(previousText);
            }
          }
          if (validateMsisdn(text)) {
            setHasMsisdnError(false);
          }
        }}
        onBlur={() => {
          if (!validateMsisdn(msisdn)) {
            setHasMsisdnError(true);
          }
        }}
        style={{marginTop: 10}}
      />

      <CSingleSelectInput
        description={Strings.Stock.Primary_Additional}
        placeholder={Strings.Stock.Primary_Additional}
        placeholderStyle={{color: Colors.textGeyColor}}
        mode="single"
        checkedValue={deviceType}
        items={[
          {
            label: Constants.deviceTypeLabel.PRIMARY,
            value: Constants.deviceTypeLabel.PRIMARY,
          },
          {
            label: Constants.deviceTypeLabel.ADDITIONAL,
            value: Constants.deviceTypeLabel.ADDITIONAL,
          },
        ]}
        hasError={hasDeviceTypeError}
        disabled={false}
        onSelectItem={item => {
          setDeviceType(item.value);
        }}
        containerStyle={{marginTop: 15}}
      />

      {
        <SubmitButton
          title={Strings.Stock.Submit}
          style={{marginTop: 10, marginBottom: 30}}        
          onSubmit={() => {
            const isMsisdnValid = validateMsisdn(msisdn);
            if (!isMsisdnValid) {
              setHasMsisdnError(true);
            }
            if (!device) {
              setHasSelectDeviceError(true);
            }
            if (reason == '') {
              setHasReasonError(true);
            }
            if (deviceType == null || deviceType == '') {
              setHasDeviceTypeError(true);
            }

            console.log('device type => ', deviceType);

            if (
              device != null &&
              reason != '' &&
              isMsisdnValid &&
              deviceType != null &&
              deviceType != ''
            ) {
              onSwop({
                item,
                device,
                reason,
                photos,
                msisdn,
                deviceType,
              });
            } else {
              dispatch(
                showNotification({
                  type: 'success',
                  message: Strings.Complete_Compulsory_Fields,
                  buttonText: Strings.Ok,
                }),
              );
              return;
            }
          }}></SubmitButton>
      }
      <Notification />
      <LoadingProgressBar />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    marginTop: 8,
    paddingTop: 10,
    marginHorizontal: 20,
    paddingBottom: 0,
    height: Dimensions.get('window').height * 0.7,
  },

  imageContainer: {
    padding: 5,
    borderWidth: 1,
    borderColor: whiteLabel().fieldBorder,
    borderRadius: 5,
    width: Dimensions.get('screen').width / 4.5 + 7,
    height: Dimensions.get('screen').width / 4.5,
  },
});

export default SwopAtTraderView;
