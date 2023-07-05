import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors, Fonts, Constants} from '../../constants';
import {whiteLabel} from '../../constants/Colors';
import {style as commonStyle} from '../../constants/Styles';

const BaseForm = props => {
  const { item , questionButtonType } = props;
  if (!item) return null;
  const onItemAction = type => {
    if (props.onItemAction) {
      props.onItemAction({type, item});
    }
  };
  const isQuesionAnswered = item.value != null && item.value != '';  
  const isDisabled = questionButtonType == Constants.questionButtonType.QUESTION_BUTTON_DISABLED;
  const isCompulsory = !isQuesionAnswered && item && item.rule_compulsory === '1' && !isDisabled;  

  const isShowInfoIcon =
    item.guide_info !== undefined && item.guide_info.length != 0;
  return (
    <View
      style={[
        styles.container,
        commonStyle.card,
        isCompulsory && commonStyle.compulsoryStyle,      
        {marginHorizontal: 5, marginVertical: 3, flexDirection: 'column'},
        props.style,
      ]}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1, paddingHorizontal: 5}}>
          <Text style={styles.titleStyle}> {item.question_text} </Text>
        </View>
        {isShowInfoIcon && (
          <TouchableOpacity
            onPress={() => onItemAction(Constants.actionType.ACTION_INFO)}>
            <Icon
              name={`info-outline`}
              size={25}
              color={whiteLabel().mainText}
            />
          </TouchableOpacity>
        )}
      </View>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  titleStyle: {
    textAlign: 'center',
    paddingVertical: 5,
    color: Colors.blackColor,
    fontSize: 15,
    fontFamily: Fonts.secondaryMedium,
  },
});
export default BaseForm;
