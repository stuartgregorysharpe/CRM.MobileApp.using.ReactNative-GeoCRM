import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {Colors, Constants, Fonts} from '../../../../constants';
const SectionHeader = props => {
  const {title, isFirst} = props;
  const onSelectAll = () => {
    if (props.onItemAction) {
      props.onItemAction({
        type: Constants.actionType.ACTION_SELECT_ALL,
        sectionName: title,
      });
    }
  };
  return (
    <View
      style={[styles.container, !isFirst && {borderTopWidth: 2}, props.style]}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.button} onPress={onSelectAll}>
        <Text style={styles.title}>{'Select All'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    height: 36,
    borderBottomWidth: 2,
    justifyContent: 'space-between',
    borderColor: Colors.primaryColor,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    fontFamily: Fonts.primaryBold,
    color: Colors.primaryColor,
  },
  button: {
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.primaryColor,
  },
  buttonTitle: {
    fontSize: 12,
    fontFamily: Fonts.primaryRegular,
    color: Colors.primaryColor,
  },
});

export default SectionHeader;
