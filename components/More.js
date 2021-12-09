import React, {
  useState,
  useEffect
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import SvgIcon from './SvgIcon';
import { 
  BG_COLOR, 
  PRIMARY_COLOR, 
  TEXT_COLOR 
} from '../constants/Colors';
import { CHANGE_MORE_STATUS } from '../actions/actionTypes';
  
export default function Profile() {
  const dispatch = useDispatch();
  const payload = useSelector(state => state.selection.payload);

  return (
    <View style={styles.innerContainer}>
      <View style={styles.avatarBox}>
        <TouchableOpacity style={styles.closeButton} onPress={() => dispatch({type: CHANGE_MORE_STATUS, payload: 1})}>
          <SvgIcon icon="Close" width='20px' height='20px' />
        </TouchableOpacity>
        <View style={styles.avatar}>
          <Text style={styles.avatarLabel}>
            {payload.user_scopes.geo_rep.user_name.split(' ')[0] && payload.user_scopes.geo_rep.user_name.split(' ')[0][0].toUpperCase()}
            {payload.user_scopes.geo_rep.user_name.split(' ')[1] && payload.user_scopes.geo_rep.user_name.split(' ')[1][0].toUpperCase()}
          </Text>
        </View>
        <View style={{width: '48%'}}>
          <Text style={styles.boldText}>{payload.user_scopes.geo_rep.user_name}</Text>
          <Text style={styles.text}>{payload.user_scopes.geo_rep.user_email}</Text>
          <Text style={styles.text}>+27 81 691 7262</Text>
        </View>
      </View>
      <View style={styles.selectBox}>
        <TouchableOpacity style={styles.selectButton} onPress={() => {
          dispatch({type: "CHANGE_COMPONENT", payload: true});
          dispatch({type: CHANGE_MORE_STATUS, payload: 1});
        }}>
          <SvgIcon style={{marginRight: 8}} icon="Account_Circle" width='24px' height='24px' />
          <Text style={styles.selectName}>Profile</Text>
          <SvgIcon icon="Angle_Left" width='20px' height='20px' />
        </TouchableOpacity>

        <TouchableOpacity style={styles.selectButton}>
          <SvgIcon style={{marginRight: 8}} icon="Cloud_Off" width='24px' height='24px' />
          <Text style={styles.selectName}>Offline Sync Items</Text>
          <SvgIcon icon="Angle_Left" width='20px' height='20px' />
        </TouchableOpacity>

        <TouchableOpacity style={styles.selectButton}>
          <SvgIcon style={{marginRight: 8}} icon="Support_Agent" width='24px' height='24px' />
          <Text style={styles.selectName}>Support</Text>
          <SvgIcon icon="Angle_Left" width='20px' height='20px' />
        </TouchableOpacity>

        <TouchableOpacity style={styles.selectButton}>
          <Text style={styles.selectName}>Logout</Text>
          <SvgIcon icon="Angle_Left" width='20px' height='20px' />
        </TouchableOpacity>
      </View>
    </View>
  )
}
  
const styles = StyleSheet.create({
  innerContainer: {
    width: '90%',
    height: '100%',
    marginLeft: 'auto',
    backgroundColor: BG_COLOR,
    padding: 12,
    paddingTop: 70,
    borderWidth: 1,
    borderColor: '#70707070'
  },
  avatarBox: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomColor: PRIMARY_COLOR,
    borderBottomWidth: 2
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  avatar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: PRIMARY_COLOR,
    borderWidth: 2,
    width: 56,
    height: 56,
    borderRadius: 30,
    marginRight: 12,
  },
  avatarLabel: {
    color: PRIMARY_COLOR,
    fontFamily: 'Gilroy-Bold',
    fontSize: 32
  },
  boldText: {
    color: TEXT_COLOR,
    fontSize: 17,
    fontFamily: 'Gilroy-Bold'
  },
  text: {
    fontSize: 14,
    color: TEXT_COLOR,
    fontFamily: 'Gilroy-Medium',
    marginBottom: 2
  },
  selectBox: {
    paddingLeft: 8,
    paddingRight: 8
  },
  selectButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomColor: '#70707045',
    borderBottomWidth: 2
  },
  selectName: {
    flexGrow: 1,
    fontSize: 16,
    fontFamily: 'Gilroy-Medium',
    color: TEXT_COLOR
  }
})