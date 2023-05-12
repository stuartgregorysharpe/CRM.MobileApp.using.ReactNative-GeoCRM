import {View, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef} from 'react';
import ScanCodeInput from '../../../../../../components/common/ScanCodeInput';

var mMsn = '';
var mImei = '';
var mAdditionalImei = '';

export default function DeviceView(props) {

  const { additionalImei , msnRequired } = props;
  const placeholder1 = additionalImei == '1' ? 'Input IMEI1' : 'Input IMEI';
  const placeholder2 = additionalImei == '1' ? 'Input IMEI2' : '';
  const type1 = additionalImei == '1' ? 'imei1' : 'imei';
  const type2 = additionalImei == '1' ? 'imei2' : '';
  

  useEffect(() => {
    mMsn = '';
    mImei = '';
    mAdditionalImei = '';
  },[]);

  const onMsnChanged = ( msn ) => {
    mMsn = msn;
    if(props.onDataChanged)
      props.onDataChanged(mMsn , mImei , mAdditionalImei );
  }

  const onImeiChanged = ( imei ) => {
    mImei = imei;
    if(props.onDataChanged)
      props.onDataChanged(mMsn , mImei , mAdditionalImei );
  }

  const onAdditionalImei = ( imei ) => {
    mAdditionalImei = imei;
    if(props.onDataChanged)
      props.onDataChanged(mMsn , mImei , mAdditionalImei );
  }

  return (
    <View style={{alignSelf: 'stretch'}}>

      {
        msnRequired == '1' && 
        <ScanCodeInput 
          placeholder={'Input MSN'}
          type={'msn'}
          {...props}
          onChangedData={onMsnChanged}
        />
      }
      
      <ScanCodeInput 
        placeholder={placeholder1}
        type={type1}
        {...props}
        onChangedData={onImeiChanged}
      />

      {
        additionalImei == '1' &&
        <ScanCodeInput 
          placeholder={placeholder2}
          type={type2}
          {...props}
          onChangedData={onAdditionalImei}
        />
      }
      
    </View>
  );
}
