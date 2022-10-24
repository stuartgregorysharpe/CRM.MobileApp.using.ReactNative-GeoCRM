import {View, StyleSheet, Platform} from 'react-native';
import React, {useRef, useState} from 'react';
import CTextInput from '../../../../../components/common/CTextInput';
import SignatureScreen from 'react-native-signature-canvas';
import {SubmitButton} from '../../../../../components/shared/SubmitButton';
import {useDispatch, useSelector} from 'react-redux';
import RNFS from 'react-native-fs';
import {Constants, Strings} from '../../../../../constants';
import uuid from 'react-native-uuid';
import {validateMsisdn} from '../../../../../helpers/formatHelpers';
import {generateKey} from '../../../../../constants/Utils';
import {showNotification} from '../../../../../actions/notification.action';
import {Notification} from '../../../../../components/modal/Notification';
var previousText = Constants.msisdnPrefix;

export default function StockSignatureView(props) {
  const dispatch = useDispatch();
  const signatureScreenRef = useRef(null);
  const msisdnRef = useRef(null);
  const {onChangedReceivedBy, onChangedSerial, signature, onSubmit, onClose} =
    props;
  const map_style = `.m-signature-pad--footer {display: none; margin: 0px;}`;
  const features = useSelector(
    state => state.selection.payload.user_scopes.geo_rep.features,
  );
  const isMSISDN = features.includes('msisdn');
  const [enabled, setEnabled] = useState(false);
  const [path, setPath] = useState(null);
  const [receivedBy, setReceivedBy] = useState();
  const [hasMsisdnError, setHasMsisdnError] = useState(false);
  const [hasReceivedByError, setHasReceivedByError] = useState(false);
  const [serial, setSerial] = useState(Constants.msisdnPrefix);

  const handleOK = async signature => {
    var outputPath =
      Platform.OS === 'ios'
        ? `${RNFS.DocumentDirectoryPath}`
        : `${RNFS.ExternalDirectoryPath}`;
    const filepath = outputPath + '/sign' + '-' + generateKey() + '.png';
    var data = await RNFS.writeFile(
      filepath,
      signature.replace('data:image/png;base64,', ''),
      'base64',
    ).then(res => {
      return res;
    });
    setPath(filepath);
  };

  const handleEmpty = () => {
    onClose();
  };

  const handleConfirm = () => {
    if (signatureScreenRef.current) {
      signatureScreenRef.current.readSignature();
    }
  };
  const handleEnd = () => {
    checkValidation();
    handleConfirm();
  };

  const checkValidation = () => {
    var flag = false;
    if (
      props.item.stock_type != Constants.stockType.RETURN &&
      isMSISDN &&
      props.item.stock_type != Constants.stockType.SIM
    ) {
      if (validateMsisdn(serial)) {
        flag = true;
        setHasMsisdnError(false);
      } else {
        setHasMsisdnError(true);
      }
      if (receivedBy != '') {
        flag = true;
      }
    } else {
      if (receivedBy != '') {
        flag = true;
      }
    }
    setEnabled(flag);
  };

  const onFileSubmit = () => {
    let isValidForm = true;
    if (
      props.item.stock_type != Constants.stockType.RETURN &&
      isMSISDN &&
      props.item.stock_type != Constants.stockType.SIM &&
      !validateMsisdn(serial)
    ) {
      setHasMsisdnError(true);
      /*if (msisdnRef.current) {
        msisdnRef.current.focus();
      }*/
      isValidForm = false;
    }
    if (!receivedBy || receivedBy == '') {
      setHasReceivedByError(true);
      isValidForm = false;
    }
    if (!isValidForm) {
      dispatch(
        showNotification({
          type: 'success',
          message: Strings.Complete_Compulsory_Fields,
          buttonText: Strings.Ok,
        }),
      );
      return;
    }

    if (path != null) {
      RNFS.exists(path).then(res => {
        if (res) {
          onSubmit(path);
        } else {
          dispatch(
            showNotification({
              type: 'success',
              message: Strings.Please_Sign_Message,
              buttonText: Strings.Ok,
            }),
          );
        }
      });
    } else {
      dispatch(
        showNotification({
          type: 'success',
          message: Strings.Please_Sign_Message,
          buttonText: Strings.Ok,
        }),
      );
    }
  };

  return (
    <View style={styles.container}>
      <CTextInput
        label={'Received By'}
        isRequired={true}
        value={receivedBy}
        returnKeyType={'done'}
        hasError={hasReceivedByError}
        onChangeText={text => {
          onChangedReceivedBy(text);
          setReceivedBy(text);
          checkValidation();
          if (text && text != '') {
            setHasReceivedByError(false);
          }
        }}
        style={{marginTop: 15}}
      />

      {props.item.stock_type != Constants.stockType.RETURN &&
        isMSISDN &&
        props.item.stock_type != Constants.stockType.SIM && (
          <CTextInput
            cTextRef={msisdnRef}
            label={Strings.Assign_Msisdn}
            value={serial}
            returnKeyType={'done'}
            keyboardType={'number-pad'}
            isRequired={true}
            hasError={hasMsisdnError}
            errorText={Strings.MSISDN_Error_Message}
            onChangeText={text => {
              if (text.length <= 2) {
                setSerial(Constants.msisdnPrefix);
                onChangedSerial(Constants.msisdnPrefix);
              } else {
                if (text.startsWith(Constants.msisdnPrefix)) {
                  setSerial(text);
                  onChangedSerial(text);
                  previousText = text;
                } else {
                  setSerial(previousText);
                  onChangedSerial(previousText);
                }
              }
              if (validateMsisdn(text)) {
                setHasMsisdnError(false);
              }
            }}
            style={{marginTop: 5}}
            maxLength={11}
            onBlur={() => {
              if (!validateMsisdn(serial)) {
                setHasMsisdnError(true);
              }
            }}
          />
        )}

      <SignatureScreen
        style={{marginTop: 10}}
        ref={signatureScreenRef}
        //androidHardwareAccelerationDisabled={false}
        webStyle={map_style}
        dataURL={signature}
        onEnd={handleEnd}
        onOK={handleOK}
        onEmpty={handleEmpty}
        imageType="image/png"
        //onClear={handleClear}
        //onGetData={handleData}
        // autoClear={true}
        //descriptionText={text}
      />

      <SubmitButton
        title="Submit"
        isLoading={props.isLoading}
        style={{marginTop: 10, marginBottom: 10}}
        onSubmit={onFileSubmit}>
        {' '}
      </SubmitButton>
      <Notification />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    height: Platform.OS === 'android' ? 360 : 380,
    marginBottom: Platform.OS === 'android' ? 0 : 20,
  },
});
