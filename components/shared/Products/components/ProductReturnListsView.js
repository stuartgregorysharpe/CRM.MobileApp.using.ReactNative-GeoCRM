import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {AppText} from '../../../common/AppText';
import SvgIcon from '../../../SvgIcon';
import {SubmitButton} from '../../SubmitButton';
import {Colors, Constants, Fonts} from '../../../../constants';
import {whiteLabel} from '../../../../constants/Colors';
import {useMemo} from 'react';

export default function ProductReturnListsView(props) {
  const {questionType, groups, lists, onSave, removeProduct} = props;
  const getItemList = (groups, lists) => {
    const items = [];
    groups.forEach(group => {
      const subItems = lists.filter(item => item.productReturn === group.value);
      subItems.forEach((sitem, index) => {
        items.push({...sitem, groupName: group.value, isHeader: index == 0});
      });
    });
    return items;
  };
  const itemList = useMemo(() => {
    return getItemList(groups, lists);
  }, [groups, lists]);

  const renderItem = item => {
    const {groupName, isHeader} = item;

    return (
      <View>
        {isHeader && renderHeader(groupName)}
        <View style={{flexDirection: 'row', marginTop: 5, marginBottom: 5}}>
          <View style={{flex: 2}}>
            <AppText
              type="primaryRegular"
              title={item.product_type}
              style={{marginRight: 5}}></AppText>
          </View>
          <View style={{flex: 3}}>
            <AppText type="primaryRegular" title={item.label}></AppText>
          </View>

          <View style={{flex: 1}}>
            <AppText type="primaryRegular" title={item.value}></AppText>
          </View>

          <TouchableOpacity onPress={() => removeProduct(item)}>
            <SvgIcon icon="DELETE" width="20" height="20" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderHeader = name => {
    return (
      <View>
        <View style={{backgroundColor: Colors.primaryColor + '30', padding: 5}}>
          <AppText
            size="medium"
            title={name}
            color={whiteLabel().blackColor}
            style={{zIndex: 999}}></AppText>
        </View>
        <View style={{flexDirection: 'column'}}>
          <View style={{flexDirection: 'row', marginTop: 5, marginBottom: 5}}>
            <View style={{flex: 2}}>
              <AppText
                type="primaryRegular"
                title={'Type'}
                color={whiteLabel().mainText}></AppText>
            </View>
            <View style={{flex: 3}}>
              <AppText
                type="primaryRegular"
                title={'Product'}
                color={whiteLabel().mainText}></AppText>
            </View>
            <View style={{flex: 1, marginRight: 25}}>
              <AppText
                type="primaryRegular"
                title={'Qty'}
                color={whiteLabel().mainText}></AppText>
            </View>
          </View>
          <View
            style={{height: 1, backgroundColor: whiteLabel().mainText}}></View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={itemList}
        renderItem={({item, index}) => renderItem(item, index)}
        keyExtractor={(item, index) => index.toString()}
        extraData={this.props}
      />
      <SubmitButton
        title={'Save'}
        style={{marginTop: 20, marginBottom: 30}}
        onSubmit={onSave}></SubmitButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flexDirection: 'column',
    paddingTop: 10,
    marginHorizontal: 20,
    //marginBottom: 30,
    paddingBottom: 0,
    height: Dimensions.get('window').height * 0.6,
  },
  title: {
    fontSize: 11,
    fontFamily: Fonts.primaryRegular,
    color: Colors.blackColor,
  },
});
