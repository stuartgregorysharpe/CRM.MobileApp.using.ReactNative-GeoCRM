import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import CCircularProgress from '../../../../components/common/CCircularProgress';
import SvgIcon from '../../../../components/SvgIcon';
import {Constants, Fonts} from '../../../../constants';
import Colors, {whiteLabel} from '../../../../constants/Colors';
import {style} from '../../../../constants/Styles';
import {formatDate} from '../../../../helpers/formatHelpers';
const HistoryItem = props => {
  const {item, index, isLast} = props;
  const {form_name, overall_score, date} = item;
  const title = form_name;
  const overallScore = Number(overall_score);
  const onItemAction = data => {
    if (props.onItemAction) {
      props.onItemAction(data);
    }
  };

  
  return (
    <TouchableOpacity
      style={[styles.container, style.cardContainer, props.style]}
      onPress={() => {
        onItemAction({type: Constants.actionType.ACTION_VIEW, item: item});
      }}>
        
      <SvgIcon icon="Description_Black" width="20px" height="20px" />
      <View style={{flex:1}}>
        <Text style={[styles.title, {marginLeft: 10}]}>{title}</Text>
      </View>
      
      <CCircularProgress
        radius={18}
        activeStrokeWidth={6}
        inActiveStrokeWidth={6}
        progressValueStyle={{fontSize: 9, color: Colors.blackColor}}
        value={overallScore}
        valueSuffix="%"
      />

      <Text
        style={[
          styles.description,
          {marginRight: 12, marginLeft: 15, textAlign: 'right'},
        ]}>
        {date}
      </Text>
      <SvgIcon icon="Slider_Arrow_Right" width="9px" height="18px" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    alignItems: 'center',
    //height: 54,
    flexDirection: 'row',
    marginBottom: 10,
    flex:1
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

export default HistoryItem;
