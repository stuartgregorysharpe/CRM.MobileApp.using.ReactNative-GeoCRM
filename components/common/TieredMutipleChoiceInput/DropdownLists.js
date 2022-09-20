import {View, Text, FlatList, Dimensions, TouchableOpacity} from 'react-native';
import React from 'react';
import {AppText} from '../AppText';
import Colors, {whiteLabel} from '../../../constants/Colors';

export default function DropdownLists(props) {
  const {lists, onItemSelected} = props;
  const renderItem = (item, index) => {
    if (props.renderItem) {
      return props.renderItem(item, index, onItemSelected);
    }
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          onItemSelected(item);
        }}>
        <View style={{flexDirection: 'column'}}>
          <View
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 5,
            }}>
            <View style={{flex: 1}}>
              <AppText
                size="big"
                type="secondaryMedium"
                title={item.label}
                style={{fontSize: 14, paddingBottom: 5}}></AppText>
            </View>
          </View>
          <View
            style={{
              height: 0.5,
              backgroundColor: Colors.greyColor,
              marginVertical: 3,
              marginRight: 10,
            }}></View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{marginTop: 5, alignSelf: 'stretch'}}>
      {lists != undefined &&
        lists.length > 0 &&
        lists.map((item, index) => {
          return renderItem(item, index);
        })}
    </View>
  );
}
