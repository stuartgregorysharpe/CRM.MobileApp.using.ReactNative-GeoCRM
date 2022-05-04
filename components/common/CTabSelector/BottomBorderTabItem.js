import React from 'react';
import type {Node} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import {Images, Colors, Fonts, Values} from '../../../constants';

const BottomBorderTabItem: () => Node = props => {
  const onSelectTab = (item, index) => {
    if (props.onSelectTab) {
      props.onSelectTab(item, index);
    }
  };
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
            {props.item.title}
          </Text>
        </View>
        <View
          style={[
            styles.bottomBar,
            props.isPicked && {backgroundColor: Colors.primaryColor},
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
    color: Colors.primaryColor,
    fontFamily: Fonts.primaryBold,
  },
  tabItemText: {
    fontSize: Values.fontSize.xSmall,
    color: Colors.disabledColor,
    fontFamily: Fonts.primaryMedium,
  },
});

export default BottomBorderTabItem;
