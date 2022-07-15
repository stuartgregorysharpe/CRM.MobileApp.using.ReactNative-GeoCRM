import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import SvgIcon from '../../../../components/SvgIcon';
import Colors, {whiteLabel} from '../../../../constants/Colors';
import Fonts from '../../../../constants/Fonts';

export function CrmCalendarSelection({
  isDraw,
  onClickList,
  onClickDraw,
  onClickCancel,
  onClickAddToCalendar,
}) {
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={[
            styles.buttonTextStyle,
            {backgroundColor: Colors.skeletonColor},
          ]}
          onPress={() => {
            onClickCancel();
          }}>
          <Text style={[styles.buttonText, {color: Colors.whiteColor}]}>
            {'Cancel'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{marginLeft: 5}}>
        <TouchableOpacity
          style={[
            styles.buttonTextStyle,
            {
              backgroundColor: Colors.bgColor,
              borderColor: Colors.skeletonColor,
              borderWidth: 2,
            },
          ]}
          onPress={() => {
            onClickList();
          }}>
          <Text style={[styles.buttonText, {color: Colors.blackColor}]}>
            {'List'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{marginLeft: 5}}>
        <TouchableOpacity
          style={[
            styles.buttonTextStyle,
            {
              backgroundColor: isDraw
                ? Colors.selectedRedColor
                : Colors.bgColor,
              borderColor: Colors.skeletonColor,
              borderWidth: isDraw ? 0 : 2,
            },
          ]}
          onPress={() => {
            onClickDraw();
          }}>
          <Text
            style={[
              styles.buttonText,
              {color: isDraw ? Colors.whiteColor : Colors.blackColor},
            ]}>
            {isDraw ? 'Discard' : 'Draw'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rightContainer}>
        <TouchableOpacity
          style={[styles.buttonTextStyle]}
          onPress={() => {
            if (onClickAddToCalendar) {
              onClickAddToCalendar();
            }
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.buttonText}>Add to Calendar</Text>
            <SvgIcon icon="Arrow_Right" width="13px" height="13px" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 5,
    paddingBottom: 10,
  },

  buttonTextStyle: {
    paddingLeft: Dimensions.get('screen').width * 0.03,
    paddingRight: Dimensions.get('screen').width * 0.03,
    paddingTop: Platform.OS == 'android' ? 5 : 8,
    paddingBottom: Platform.OS == 'android' ? 5 : 8,
    borderRadius: 15,
    backgroundColor: whiteLabel().actionFullButtonBackground,
  },
  buttonText: {
    color: Colors.whiteColor,
    fontSize: 11,
    fontFamily: Fonts.secondaryBold,
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
