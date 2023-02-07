import {StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
import CSingleSelectInput from '../../../../../components/common/SelectInput/CSingleSelectInput';
import CTextInput from '../../../../../components/common/CTextInput';
import {SubmitButton} from '../../../../../components/shared/SubmitButton';
import {Constants} from '../../../../../constants';

export default function TransferView(props) {
  const {stockItem, lists, onItemSelected, onChangedQuantity, onTrader} = props;
  const [userId, setUserId] = useState('');
  const [quantity, setQuantity] = useState('');

  return (
    <ScrollView style={styles.container}>
      <CSingleSelectInput
        description={'User'}
        placeholder={'Select ' + 'User'}
        mode="single"
        checkedValue={userId}
        items={lists}
        hasError={false}
        disabled={false}
        onSelectItem={item => {
          setUserId(item.value);
          onItemSelected(item);
        }}
        containerStyle={{marginTop: 15}}
      />

      {stockItem && stockItem.stock_type === Constants.stockType.CONSUMABLE && (
        <CTextInput
          label={'Quantity'}
          value={quantity}
          returnKeyType={'done'}
          keyboardType={'number-pad'}
          isRequired={true}
          onChangeText={text => {
            setQuantity(text);
            onChangedQuantity(text);
          }}
          style={{marginTop: 15}}
        />
      )}

      <SubmitButton
        title={'Transfer'}
        style={{marginTop: 20, marginBottom: 30}}        
        onSubmit={onTrader}></SubmitButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    marginHorizontal: 20,
    paddingBottom: 0,
  },
});
