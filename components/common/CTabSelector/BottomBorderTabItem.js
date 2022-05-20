import React from 'react';
import type {Node} from 'react';
import {StyleSheet, View, Text, TouchableWithoutFeedback} from 'react-native';
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
    <TouchableWithoutFeedback
      onPress={() => {
        onSelectTab(props.item, props.index);
      }}>
      <View style={[styles.tabItemContainer, props.style]}>
        <View style={{paddingHorizontal: 4}}>
          <Text
            style={
              props.isPicked ? styles.selectedTabItemText : styles.tabItemText
            }>
            {title}
          </Text>
        </View>
        <View
          style={[
            styles.bottomBar,
            props.isPicked && {
              backgroundColor: whiteLabel().activeTabUnderline,
            },
          ]}
        />
      </View>
    </TouchableWithoutFeedback>
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
    fontSize: Values.fontSize.xSmall,
    color: whiteLabel().activeTabText,
    fontFamily: Fonts.primaryBold,
  },
  tabItemText: {
    fontSize: Values.fontSize.xSmall,
    color: whiteLabel().inactiveTabText,
    fontFamily: Fonts.primaryMedium,
  },
});

export default BottomBorderTabItem;
