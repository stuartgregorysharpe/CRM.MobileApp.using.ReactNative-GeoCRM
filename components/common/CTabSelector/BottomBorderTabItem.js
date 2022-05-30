import React from 'react';
import type {Node} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Fonts, Values} from '../../../constants';
import {whiteLabel} from '../../../constants/Colors';

const BottomBorderTabItem: () => Node = props => {
  const onSelectTab = (item, index) => {
    if (props.onSelectTab) {
      props.onSelectTab(item, index);
    }
  };
  const title = props.item && props.item.title ? props.item.title: ''
  return (
      <TouchableOpacity style={[styles.tabItemContainer, props.style]} onPress={() => {
        onSelectTab(props.item, props.index);
      }}>
        <Text
          style={
            props.isPicked ? styles.selectedTabItemText : styles.tabItemText
          }>
          {title}
        </Text>
        <View
          style={[
            styles.bottomBar,
            props.isPicked && {
              backgroundColor: whiteLabel().activeTabUnderline,
            },
          ]}
        />
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tabItemContainer: {
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBar: {
    height: 2,
    borderRadius: 1,
    alignSelf: 'stretch',
    marginTop: 2,
  },
  selectedTabItemText: {
    fontSize: Values.fontSize.small,
    color: whiteLabel().activeTabText,
    fontFamily: Fonts.secondaryBold,
    marginHorizontal: 4
  },
  tabItemText: {
    fontSize: Values.fontSize.small,
    color: whiteLabel().inactiveTabText,
    fontFamily: Fonts.secondaryMedium,
    marginHorizontal: 4
  },
});

export default BottomBorderTabItem;
