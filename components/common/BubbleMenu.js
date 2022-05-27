import React from 'react';
import type {Node} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {Colors, Fonts} from '../../constants';
import SvgIcon from '../SvgIcon';

const BubbleItem: () => Node = props => {
  const {item} = props;
  const {icon} = item;
  return (
    <TouchableOpacity
      style={styles.bubbleContainer}
      onPress={() => {
        if (props.onPressItem) {
          props.onPressItem(item);
        }
      }}>
      {item.icon && <SvgIcon icon={item.icon} width="70px" height="70px" />}
      {item.text && (
        <Text style={{fontSize: 20, color: Colors.whiteColor}}>
          {item.text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const BubbleMenu: () => Node = props => {
  const {items} = props;
  if (!items) return null;
  const renderBubbles = bubbleItems => {
    return bubbleItems.map((item, index) => {
      return (
        <BubbleItem
          key={'bubble' + index}
          item={item}
          onPressItem={props.onPressItem}
        />
      );
    });
  };
  return (
    <View style={[styles.container, props.style]}>{renderBubbles(items)}</View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    flexDirection: 'column',
  },
  icon: {
    width: 20,
    height: 20,
  },
  text: {
    color: Colors.whiteText,
    fontFamily: Fonts.primaryRegular,
  },
  bubbleContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: Colors.primaryColor,
  },
});

export default BubbleMenu;
