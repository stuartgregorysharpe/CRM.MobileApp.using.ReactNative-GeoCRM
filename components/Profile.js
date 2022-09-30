import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import SvgIcon from './SvgIcon';
import  Colors, { whiteLabel } from '../constants/Colors';
import { CHANGE_SELECT_PROJECT, CHANGE_PROFILE_STATUS } from '../actions/actionTypes';
import Fonts from '../constants/Fonts';



export default function Profile() {
  const dispatch = useDispatch();
  const payload = useSelector(state => state.selection.payload);
  const selectProject = useSelector(state => state.selection.selectProject);
  const userInfo = useSelector(state => state.auth.userInfo);

  return (
    <View style={styles.innerContainer}>
      <View style={styles.avatarBox}>
        <TouchableOpacity style={styles.closeButton} onPress={() => dispatch({type: CHANGE_PROFILE_STATUS, payload: 1})}>
          <SvgIcon icon="Close" width='20px' height='20px' />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.avatar}>
          <Text style={styles.avatarLabel}>
            {userInfo.user_name.split(' ')[0] && userInfo.user_name.split(' ')[0][0].toUpperCase()}
            {userInfo.user_name.split(' ')[1] && userInfo.user_name.split(' ')[1][0].toUpperCase()}  
          </Text>
        </View>
      </View>
      
      <View style={[styles.profileInfo, {marginTop:12, flexDirection:'column', alignItems:'center'}]}>

        <View style={{flexDirection:'row',marginTop:5}}>
          <Text style={styles.label}>User Name:</Text>
          <Text style={styles.text}>{userInfo.user_name}</Text>
        </View>

        <View style={{flexDirection:'row' ,marginTop:5}}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.text}>{userInfo.user_email}</Text>
        </View>

        <View style={{flexDirection:'row',marginTop:5}}>
          <Text style={styles.label}>Contact Details:</Text>
          <Text style={styles.text}>+{userInfo.user_cell}</Text>
        </View>
      </View>
      
      <View style={styles.projectBox}>
        <Text style={styles.projectTitle}>App & Projects</Text>
        <View style={styles.selectBox}>
          {payload.user_scopes.geo_rep && <TouchableOpacity style={styles.selectButton} onPress={() => {
            dispatch({type: CHANGE_SELECT_PROJECT, payload: 'geo_rep'});
            dispatch({type: CHANGE_PROFILE_STATUS, payload: 1});
          }}>
            <Text style={styles.selectName}>{payload.user_scopes.geo_rep.project_custom_name}</Text>
            {selectProject == 'geo_rep' && <SvgIcon icon="Check" width='20px' height='20px' />}
          </TouchableOpacity>}

          {payload.user_scopes.geo_life && <TouchableOpacity style={styles.selectButton} onPress={() => {
            dispatch({type: CHANGE_SELECT_PROJECT, payload: 'geo_life'});
            dispatch({type: CHANGE_PROFILE_STATUS, payload: 1});
          }}>
            <Text style={styles.selectName}>{payload.user_scopes.geo_life.project_custom_name}</Text>
            {selectProject == 'geo_life' && <SvgIcon icon="Check" width='20px' height='20px' />}
          </TouchableOpacity>}

          {payload.user_scopes.geo_crm && <TouchableOpacity style={styles.selectButton} onPress={() => {
            dispatch({type: CHANGE_SELECT_PROJECT, payload: 'geo_crm'});
            dispatch({type: CHANGE_PROFILE_STATUS, payload: 1});
          }}>
            <Text style={styles.selectName}>{payload.user_scopes.geo_crm.project_custom_name}</Text>
            {selectProject == 'geo_crm' && <SvgIcon icon="Check" width='20px' height='20px' />}
          </TouchableOpacity>}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  innerContainer: {
    width: '100%',
    height: Platform.OS == 'ios' ? '120%' : '100%',
    backgroundColor: Colors.bgColor,
    padding: 12,
    paddingTop: 70,
    borderWidth: 1,
    borderColor: '#70707070',
    zIndex: 2,
    elevation:2
  },
  avatarBox: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  headerTitle: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: Fonts.secondaryBold,
    color: whiteLabel().mainText,
    marginBottom: 12,
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',        
    borderColor: whiteLabel().mainText,
    borderWidth: 3,
    paddingTop:Platform.OS ==  'ios' ? 6 : 0,
    width: 70,
    height: 70,
    borderRadius: 35,    
  },
  avatarLabel: {
    color: whiteLabel().mainText,
    fontFamily: Fonts.secondaryBold,
    fontSize: 40
  },
  profileInfo: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  label: {
    textAlign: 'right',
    color: Colors.textColor,
    fontFamily: Fonts.secondaryBold,
    marginBottom: 4
  },
  text: {
    marginLeft:5,
    color: Colors.textColor,
    fontFamily: 'Gilroy-Medium',
    marginBottom: 4
  },
  projectBox: {
    width: '100%'
  },
  projectTitle: {
    width: '100%',
    paddingLeft: 8,
    color: whiteLabel().mainText,
    fontFamily: Fonts.primaryRegular,
    fontSize: 22,
    borderBottomColor: whiteLabel().mainText,
    borderBottomWidth: 2
  },
  selectBox: {
    paddingLeft: 8,
    paddingRight: 8
  },
  selectButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomColor: '#70707045',
    borderBottomWidth: 2
  },
  selectName: {
    fontSize: 16,
    fontFamily: 'Gilroy-Medium',
    color: Colors.textColor
  }
})