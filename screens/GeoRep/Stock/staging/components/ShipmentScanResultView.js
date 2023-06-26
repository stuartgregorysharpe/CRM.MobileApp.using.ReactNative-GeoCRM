import {View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {SubmitButton} from '../../../../../components/shared/SubmitButton';
import {AppText} from '../../../../../components/common/AppText';
import CButtonTextInput from '../../../../../components/common/CButtonTextInput';
import {Colors, Strings} from '../../../../../constants';
import CCircleButton from '../../../../../components/common/CCircleButton';
import Divider from '../../../../../components/Divider';

export default function ShipmentScanResultView(props) {
  const {items, title} = props;
  const [code, setCode] = useState('');

  let _title = title;
  if (!_title && items) {
    _title = 'Item: ' + items.length;
  }
  const onViewList = () => {
    if (props.onViewList) {
      props.onViewList();
    }
  };
  const onClose = () => {
    if (props.onClose) {
      props.onClose();
    }
  };
  const onSubmit = () => {
    if (props.onSubmit) {
      props.onSubmit();
    }
  };

  const renderActionButtons = () => {
    if (props.renderActionButtons) {
      return props.renderActionButtons();
    } else {
      return (
        <SubmitButton
          title="Accept"
          onSubmit={onSubmit}
          style={{marginTop: 10}}></SubmitButton>
      );
    }
  };
  return (
    <View
      style={[
        {
          paddingHorizontal: 10,
          paddingTop: 0,
          marginBottom: 20,
          backgroundColor: Colors.bgColor,
          alignSelf: 'stretch',
        },
        props.style,
      ]}>
      <TouchableOpacity style={{padding: 10}} onPress={() => onClose()}>
        <Divider />
      </TouchableOpacity>

      <View style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>

        <View style={{flex: 1}}>
          <AppText size="big" type="secondaryMedium" title={_title}></AppText>
        </View>
        
        <CCircleButton
          onClick={onViewList}
          style={{marginLeft: 10}}
          title="View List"
          icon="Check_List_Active"></CCircleButton>
      </View>

      <View
        style={{
          height: 1,
          backgroundColor: Colors.primaryColor,
          marginTop: 10,
        }}></View>

      <CButtonTextInput
        label={Strings.Stock.Input_Barcode}
        value={code}
        returnKeyType={'done'}
        keyboardType="number-pad"
        isRequired={true}
        onChangeText={text => {
          setCode(text);
        }}
        onSubmit={() => {
          if (props.onAddCode) {
            props.onAddCode(code);
            setCode('');
          }
        }}
        style={{marginTop: 20, marginBottom: 20}}
      />
                  
      {renderActionButtons()}
    </View>
  );
}
