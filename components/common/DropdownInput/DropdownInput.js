import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Colors, Constants, Fonts} from '../../../constants';
import {whiteLabel} from '../../../constants/Colors';
import {AppText} from '../../../components/common/AppText';
import SvgIcon from '../../SvgIcon';
import DropdownLists from './DropdownLists';

export default function DropdownInput(props) {
  const {title, lists, onItemSelected, hasError = false} = props;
  const [selectedItem, setSelectedItem] = useState(null);
  const [isShown, setIsShown] = useState(false);

  return (
    <View
      style={[
        styles.container,
        hasError && {borderColor: whiteLabel().endDayBackground},
      ]}>
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center'}}
        onPress={() => {
          setIsShown(!isShown);
        }}>
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row'}}>
            <AppText
              style={{flex: 1}}
              title={selectedItem ? selectedItem.description : title}
              size="medium"
              type="secondaryBold"></AppText>
            <AppText
              style={{marginRight: 10}}
              title={
                selectedItem
                  ? Constants.stockPrefix.MSISDN + selectedItem.msisdn
                  : ''
              }
              size="medium"></AppText>
          </View>
          {selectedItem && (
            <AppText
              title={
                selectedItem
                  ? Constants.stockPrefix.DEVICE + selectedItem.imei
                  : ''
              }
              size="medium"
              color={Colors.disabledColor}></AppText>
          )}
        </View>
        <View style={{marginRight: 10}}>
          <SvgIcon icon={'Drop_Down'} width="23px" height="23px" />
        </View>
      </TouchableOpacity>

      {isShown && (
        <DropdownLists
          onItemSelected={item => {
            console.log('selectedItem', selectedItem);
            setSelectedItem(item);
            onItemSelected(item);
            setIsShown(!isShown);
          }}
          lists={lists}></DropdownLists>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    lineHeight: 30,
    backgroundColor: Colors.bgColor,
    borderColor: whiteLabel().fieldBorder,
    fontFamily: Fonts.primaryRegular,
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 10,
    paddingTop: 7,
    paddingBottom: 7,
    flexDirection: 'column',
    flex: 1,
  },
});
