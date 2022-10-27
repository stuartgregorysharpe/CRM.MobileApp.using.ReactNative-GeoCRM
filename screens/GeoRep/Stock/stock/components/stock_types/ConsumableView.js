import {View} from 'react-native';
import React, {useState} from 'react';
import CTextInput from '../../../../../../components/common/CTextInput';

export default function ConsumableView(props) {

  const { errors } = props;

  const [details, setDetails] = useState('');
  const [quantity, setQuantity] = useState('');  

  const onDataChanged = (details, quantity) => {
    props.onDataChanged(details, quantity);
  };

  return (
    <View>
      {/*<CTextInput                    
                    label="Details"                    
                    value={details}
                    returnKeyType={'done'}                                        
                    isRequired={true}
                    onChangeText={text => {
                        setDetails(text);
                        onDataChanged(text, quantity);
                    }}
                    style={{marginTop:15}}
                />*/}

      <CTextInput
        style={{marginTop: 15}}
        label="Quantity"
        value={quantity}
        keyboardType={'number-pad'}
        returnKeyType={'done'}
        isRequired={true}
        hasError={ errors != undefined && errors['quantity'] != undefined ? errors['quantity'] : false}
        
        onChangeText={text => {
          setQuantity(text);
          onDataChanged(details, text);
        }}
        onBlur={() => {
          onDataChanged(details, quantity);
        }}

      />
    </View>
  );
}
