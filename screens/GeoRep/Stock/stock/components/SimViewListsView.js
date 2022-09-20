import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {AppText} from '../../../../../components/common/AppText';
import SvgIcon from '../../../../../components/SvgIcon';
import {SubmitButton} from '../../../../../components/shared/SubmitButton';
import {Constants, Strings} from '../../../../../constants';
import CCircleButton from '../../../../../components/common/CCircleButton';

export default function SimViewListsView(props) {
  const {type, lists, addStock, removeCode} = props;
  const closeModal = () => {
    props.onButtonAction({type: Constants.actionType.ACTION_CLOSE, value: 0});
  };
  

  const changeNetwork = () => {
    props.onButtonAction({
      type: Constants.actionType.ACTION_CHANGE_NETWORK,
      value: 0,
    });
  };

  const renderItem = (item, index) => {
    return (
      <View
        key={index}
        style={{flexDirection: 'row', marginTop: 5, marginBottom: 5}}>
        <View style={{flex: 2}}>
          <AppText type="secondaryBold" title={item.type}></AppText>
        </View>
        <View style={{flex: 2}}>
          <AppText title={item.code}></AppText>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <TouchableOpacity onPress={() => removeCode(item)}>
            <SvgIcon icon="DELETE" width="20" height="20" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1}}>
          <AppText title="Item" size="big" type="secondaryBold"></AppText>
        </View>
        {type == 'add_stock_view_lists' && (
          <CCircleButton
            onClick={changeNetwork}
            title="Change Network"></CCircleButton>
        )}
        <TouchableOpacity onPress={closeModal}>
          <SvgIcon
            icon="Close"
            width="22"
            height="22"
            style={{marginLeft: 10}}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={{marginTop:10}}>
        {
            lists.map((item , index) => {
                return renderItem(item, index)
            })
        }
      </ScrollView>

      <SubmitButton
        title={
          type == 'add_stock_view_lists'
            ? Strings.Stock.Add_Stock
            : 'Sell To Trader'
        }
        style={{marginTop: 20, marginBottom: 30}}
        onSubmit={addStock}></SubmitButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    paddingTop: 10,
    marginHorizontal: 20,
    paddingBottom: 0,
    height: Dimensions.get('window').height * 0.6,
  },
});
