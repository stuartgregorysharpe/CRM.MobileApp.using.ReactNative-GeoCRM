import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Colors, Fonts} from '../../../../constants';
import CardView from '../../../common/CardView';
import {SubmitButton} from '../../SubmitButton';

const LastScanResultView = props => {
  const {totalItemCount, lastScanedQrCode} = props;
  return (
    <CardView style={[styles.container, props.style]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{'Item: ' + totalItemCount}</Text>
      </View>
      <View style={styles.contentContainer}>
        {lastScanedQrCode && (
          <Text style={styles.text}>{'Last Scanned: ' + lastScanedQrCode}</Text>
        )}
        <SubmitButton
          style={{marginHorizontal: 10, marginVertical: 16}}
          title={'Done'}
          onSubmit={() => {
            if (props.onSubmit) {
              props.onSubmit();
            }
          }}
        />
      </View>
    </CardView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    marginHorizontal: 10,
    borderRadius: 4,
  },
  contentContainer: {
    alignSelf: 'stretch',
    marginHorizontal: 8,
  },
  header: {
    height: 32,
    flexDirection: 'row',
    borderBottomColor: Colors.primaryColor,
    borderBottomWidth: 2,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: Fonts.primaryBold,
    color: Colors.primaryColor,
  },
  text: {
    fontSize: 12,
    fontFamily: Fonts.primaryRegular,
    color: Colors.blackColor,
    marginTop: 12,
  },
});

export default LastScanResultView;
