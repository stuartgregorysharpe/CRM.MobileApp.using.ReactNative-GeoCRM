import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Colors, Fonts} from '../../../../constants';
import CardView from '../../../common/CardView';
import {SubmitButton} from '../../SubmitButton';

const LastScanResultView = props => {
  const {totalItemCount, lastScanedQrCode} = props;
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.modalHandler} />
      {totalItemCount != null && (
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{'Items: ' + totalItemCount}</Text>
        </View>
      )}

      <View style={styles.contentContainer}>
        {lastScanedQrCode != null && (
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    backgroundColor: Colors.bgColor,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
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
  modalHandler: {
    height: 4,
    width: 90,
    marginVertical: 8,
    backgroundColor: Colors.grey2,
    alignSelf: 'center',
  },
});

export default LastScanResultView;
