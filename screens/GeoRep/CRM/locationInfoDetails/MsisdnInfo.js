import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useSelector} from 'react-redux';
import SvgIcon from '../../../../components/SvgIcon';
import {Fonts} from '../../../../constants';
import {whiteLabel} from '../../../../constants/Colors';

const MsisdnInfo = props => {
  const {locationInfo} = props;
  const features = useSelector(
    state => state.selection.payload.user_scopes.geo_rep.features,
  );
  const isMsisdnAvailable =
    locationInfo != undefined &&
    locationInfo.msisdn != null &&
    locationInfo.msisdn != '' &&
    features?.includes('msisdn');
  const msisdn = locationInfo ? locationInfo.msisdn : '';
  if (!isMsisdnAvailable) {
    return null;
  }
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.rowContainer}>
        <SvgIcon
          style={styles.fontIcon}
          icon="Sim_Card_Alert_Icon"
          width="16px"
          height="16px"
        />
        <Text style={styles.subtitle}>MSISDN</Text>
      </View>
      <Text style={[styles.title, {marginTop: 3}]}>{msisdn}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fontIcon: {
    marginRight: 4,
  },
  subtitle: {
    color: whiteLabel().mainText,
    fontSize: 12,
    textAlign: 'left',
    fontFamily: Fonts.secondaryMedium,
  },
  title: {
    fontSize: 14,
    color: '#000',
    fontFamily: Fonts.secondaryBold,
    lineHeight: 20,
  },
});

export default MsisdnInfo;
