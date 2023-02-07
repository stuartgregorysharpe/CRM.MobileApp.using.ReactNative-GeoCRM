import {
  View,
  Text,
  StyleSheet,
  Platform,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import CTextInput from '../../../../../components/common/CTextInput';
import SignatureScreen from 'react-native-signature-canvas';
import {SubmitButton} from '../../../../../components/shared/SubmitButton';
import RNFS from 'react-native-fs';
import {AppText} from '../../../../../components/common/AppText';
import Colors, {whiteLabel} from '../../../../../constants/Colors';
import {Constants, Fonts, Strings, Values} from '../../../../../constants';
import {showNotification} from '../../../../../actions/notification.action';
import {Notification} from '../../../../../components/modal/Notification';
import {useDispatch} from 'react-redux';
import {generateKey} from '../../../../../constants/Utils';
import LoadingProgressBar from '../../../../../components/modal/LoadingProgressBar';

export default function ConsumableSellToStockSignatureView(props) {
  const dispatch = useDispatch();
  const signatureScreenRef = useRef(null);
  const {
    receivedBy,
    reference,
    onChangedReceivedBy,
    onChangedQuantity,
    onChangedPrice,
    onChangedReference,
    signature,
    onSubmit,
    onClose,
  } = props;
  const map_style = `.m-signature-pad--footer {display: none; margin: 0px;}`;

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [path, setPath] = useState(null);
  const [hasPriceError, setHasPriceError] = useState(false);
  const [hasQuantityError, setHasQuantityError] = useState(false);
  const [hasReceivedByError, setHasReceivedByError] = useState(false);
  const [hasReferenceError, setHasReferenceError] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleOK = async signature => {
    var outputPath =
      Platform.OS === 'ios'
        ? `${RNFS.DocumentDirectoryPath}`
        : `${RNFS.ExternalDirectoryPath}`;
    const filepath = outputPath + '/sign-' + generateKey() + '.png';
    await RNFS.writeFile(
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
    validateForm();
    //validateQuantity();
    handleConfirm();
  };

  const onFormSubmit = () => {
    let isValidQuantity = validateQuantity();
    if (!isValidQuantity) {
      dispatch(
        showNotification({
          type: 'success',
          message: Strings.Not_Enough_Stock,
          buttonText: Strings.Ok,
        }),
      );
      return;
    }
    let isValidForm = validateForm();

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
  const getHeight = () => {
    if (!isKeyboardVisible) {
      if (Platform.OS === 'android') {
        return 460;
      } else {
        return 480;
      }
    } else {
      if (Platform.OS === 'android') {
        return 320;
      } else {
        return 300;
      }
    }
  };

  const onClear = () => {
    signatureScreenRef.current.clearSignature();
  };
  const handleClear = () => {};
  const validateQuantity = () => {
    const {item} = props;
    if (!item) return true;
    if (item.stock_type == Constants.stockType.CONSUMABLE) {
      if (Number(item.qty) < Number(quantity)) {
        setHasQuantityError(true);
        return false;
      }
    }
    return true;
  };
  const validateForm = () => {
    let isValid = true;
    if (!receivedBy || receivedBy == '') {
      isValid = false;
      setHasReceivedByError(true);
    }
    if (!price || price == '') {
      isValid = false;
      setHasPriceError(true);
    }
    if (!quantity || quantity == '') {
      isValid = false;
      setHasQuantityError(true);
    }
    if (!reference || reference == '') {
      isValid = false;
      setHasReferenceError(true);
    }
    return isValid;
  };
  return (
    <View style={[styles.container, {height: getHeight()}]}>

      <Notification />
      <LoadingProgressBar />

      <CTextInput
        label={'Received By'}
        value={receivedBy}
        returnKeyType={'done'}
        isRequired={true}
        hasError={hasReceivedByError}
        onChangeText={text => {
          onChangedReceivedBy(text);
          if (text && text != '') {
            setHasReceivedByError(false);
          }
        }}
        style={{marginTop: 15}}
      />

      <CTextInput
        label={'Quantity to Sell'}
        value={quantity}
        returnKeyType={'done'}
        keyboardType={'number-pad'}
        hasError={hasQuantityError}
        isRequired={true}
        onChangeText={text => {
          const cleanNumber = text.replace(/[^0-9]/g, '');
          setQuantity(cleanNumber);
          onChangedQuantity(cleanNumber);

          if (text && text != '') {
            setHasQuantityError(false);
          }
        }}
        style={{marginTop: 5}}
      />

      <CTextInput
        label={'Price'}
        value={price}
        returnKeyType={'done'}
        hasError={hasPriceError}
        keyboardType={'number-pad'}
        isRequired={true}
        onChangeText={text => {
          const cleanNumber = text.replace(/[- #*;,<>\{\}\[\]\\\/%+@]/gi, '');
          setPrice(cleanNumber);
          onChangedPrice(cleanNumber);

          if (text && text != '') {
            setHasPriceError(false);
          }
        }}
        style={{marginTop: 5}}
      />

      <CTextInput
        label={'Reference'}
        value={reference}
        hasError={hasReferenceError}
        returnKeyType={'done'}
        isRequired={true}
        onChangeText={text => {
          onChangedReference(text);
          if (text && text != '') {
            setHasReferenceError(false);
          }
        }}
        style={{marginTop: 5}}
      />

      <View style={{alignItems: 'center', marginTop: 10}}>
        <AppText
          size="big"
          color={whiteLabel().mainText}
          title={Strings.Stock.Please_Sign}></AppText>
        <TouchableOpacity style={styles.clearButtonContainer} onPress={onClear}>
          <Text style={styles.clearText}>{'Clear'}</Text>
        </TouchableOpacity>
      </View>

      <SignatureScreen
        style={{marginTop: 10}}
        ref={signatureScreenRef}
        webStyle={map_style}
        dataURL={signature}
        onOK={handleOK}
        onEnd={handleEnd}
        onEmpty={handleEmpty}
        imageType="image/png"
      />

      <SubmitButton
        title="Submit"
        style={{marginTop: 10}}
        onSubmit={onFormSubmit}>
        {' '}
      </SubmitButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    height: Platform.OS === 'android' ? 460 : 480,
  },
  clearButtonContainer: {
    position: 'absolute',
    right: 20,
  },
  clearText: {
    fontSize: Values.fontSize.small,
    fontFamily: Fonts.secondaryRegular,
    color: Colors.redColor,
  },
});
