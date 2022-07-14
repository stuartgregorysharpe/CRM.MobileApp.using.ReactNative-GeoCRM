import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import CAvatar from '../../../../components/common/CAvatar';
import SvgIcon from '../../../../components/SvgIcon';
import {Constants, Fonts} from '../../../../constants';
import Colors, {whiteLabel} from '../../../../constants/Colors';

const LeaderboardItem = props => {
  const {item, index, isLast} = props;
  const {name, description, avatar, overall_score} = item;
  const hideBottomBorder = isLast;
  const title = name;
  const overallScore = overall_score + ' %';
  const no = index + 1;
  const onItemAction = data => {
    if (props.onItemAction) {
      props.onItemAction(data);
    }
  };
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[
        styles.container,
        props.style,
        hideBottomBorder && {borderBottomWidth: 0},
      ]}
      onPress={() => {
        onItemAction({type: Constants.actionType.ACTION_VIEW, item: item});
      }}>
      <Text style={styles.noText}>{no}</Text>
      <CAvatar url={avatar} size={30} style={{marginLeft: 14}} />
      <View style={{marginLeft: 14}}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={{flex: 1}} />
      <Text style={[styles.noText, {marginRight: 18}]}>{overallScore}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    alignItems: 'center',
    height: 54,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGreyColor,
  },
  noText: {
    fontSize: 16,
    fontFamily: Fonts.primaryBold,
    fontWeight: 'bold',
    color: whiteLabel().mainText,
  },
  title: {
    fontSize: 12,
    lineHeight: 14,
    fontFamily: Fonts.primaryRegular,
    color: Colors.blackColor,
  },
  description: {
    fontSize: 12,
    lineHeight: 14,
    fontFamily: Fonts.primaryRegular,
    color: whiteLabel().subText,
  },
});

export default LeaderboardItem;
