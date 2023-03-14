import {StyleSheet, Dimensions, ScrollView} from 'react-native';
import React, {useState} from 'react';
import CSingleSelectInput from '../../../../../components/common/SelectInput/CSingleSelectInput';
import {AppText} from '../../../../../components/common/AppText';
import {whiteLabel} from '../../../../../constants/Colors';
import {SubmitButton} from '../../../../../components/shared/SubmitButton';
import DropdownInput from '../../../../../components/common/DropdownInput/DropdownInput';
import TakePhotoView from '../../../../../components/shared/TakePhotoView';
import {Strings} from '../../../../../constants';
import {Notification} from '../../../../../components/modal/Notification';
import {showNotification} from '../../../../../actions/notification.action';
import {useDispatch} from 'react-redux';
import LoadingProgressBar from '../../../../../components/modal/LoadingProgressBar';

export default function ReturnDeviceDetailView(props) {
  const {lists, onReturnStock} = props;
  const dispatch = useDispatch();
  const [reason, setReason] = useState('');
  const [reasonLists, setReasonLists] = useState([
    {value: 'Damaged', label: 'Damaged'},
    {value: 'Device Cleanup', label: 'Device Cleanup'},
    {value: 'Discontinued', label: 'Discontinued'},    
    {value: 'Faulty', label: 'Faulty'},
    {value: 'Used', label: 'Used'},
  ]);
  const [photos, setPhotos] = useState([]);
  const [device, setDevice] = useState(null);
  const [hasSelectDeviceError, setHasSelectDeviceError] = useState(false);
  const [hasReasonError, setHasReasonError] = useState(false);
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
          setDevice(item);
          if (item) {
            setHasSelectDeviceError(false);
          }
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
        }}
        containerStyle={{marginTop: 15}}
      />

      <TakePhotoView
        isOptimize={true}
        onUpdatePhotos={photos => {
          setPhotos(photos);
        }}
        disabled={false}
        photos={photos}
        style={{marginVertical: 24}}
      />

      <SubmitButton
        title={Strings.Stock.Return_Stock}
        style={{marginTop: 10, marginBottom: 30}}
        onSubmit={() => {
          if (!device) {
            setHasSelectDeviceError(true);
          }
          if (reason == '') {
            setHasReasonError(true);
          }
          if (device != null && reason != '') {
            if (onReturnStock) {
              onReturnStock({
                device,
                reason,
                photos,
              });
            }
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


      <Notification />
      <LoadingProgressBar />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    paddingTop: 10,
    marginHorizontal: 20,
    paddingBottom: 0,    
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
