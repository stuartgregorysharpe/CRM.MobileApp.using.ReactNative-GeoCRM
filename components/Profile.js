import React, {
  useState,
  useEffect
} from 'react';
import { 
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import SvgIcon from './SvgIcon';
import { 
  BG_COLOR, 
  PRIMARY_COLOR, 
  TEXT_COLOR 
} from '../constants/Colors';
import { 
  CHANGE_BOTTOM_TAB_LIST,
  CHANGE_PROFILE_STATUS
} from '../actions/actionTypes';

export default function Profile() {
  const dispatch = useDispatch();
  const payload = useSelector(state => state.selection.payload);
  const selectProject = useSelector(state => state.selection.selectProject);

  return (
    <View style={styles.innerContainer}>
      <View style={styles.avatarBox}>
        <TouchableOpacity style={styles.closeButton} onPress={() => dispatch({type: CHANGE_PROFILE_STATUS, payload: 1})}>
          <SvgIcon icon="Close" width='20px' height='20px' />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.avatar}>
          <Text style={styles.avatarLabel}>
            {payload.user_scopes.geo_rep.user_name.split(' ')[0] && payload.user_scopes.geo_rep.user_name.split(' ')[0][0].toUpperCase()}
            {payload.user_scopes.geo_rep.user_name.split(' ')[1] && payload.user_scopes.geo_rep.user_name.split(' ')[1][0].toUpperCase()}
          </Text>
        </View>
      </View>
      <View style={styles.profileInfo}>
        <View style={{width: '48%'}}>
          <Text style={styles.label}>User Name:</Text>
          <Text style={styles.label}>Email Address:</Text>
          <Text style={styles.label}>Contact Details:</Text>
        </View>
        <View style={{width: '48%'}}>
          <Text style={styles.text}>{payload.user_scopes.geo_rep.user_name}</Text>
          <Text style={styles.text}>{payload.user_scopes.geo_rep.user_email}</Text>
          <Text style={styles.text}>+27 81 691 7262</Text>
        </View>
      </View>
      <View style={styles.projectBox}>
        <Text style={styles.projectTitle}>App & Projects</Text>
        <View style={styles.selectBox}>
          <TouchableOpacity style={styles.selectButton} onPress={() => {
            dispatch({type: CHANGE_BOTTOM_TAB_LIST, payload: 'geo_rep'});
            dispatch({type: CHANGE_PROFILE_STATUS, payload: 1});
          }}>
            <Text style={styles.selectName}>Geo Rep</Text>
            {selectProject == 'geo_rep' && <SvgIcon icon="Check" width='20px' height='20px' />}
          </TouchableOpacity>

          <TouchableOpacity style={styles.selectButton} onPress={() => {
            dispatch({type: CHANGE_BOTTOM_TAB_LIST, payload: 'geo_life'});
            dispatch({type: CHANGE_PROFILE_STATUS, payload: 1});
          }}>
            <Text style={styles.selectName}>Geo Life</Text>
            {selectProject == 'geo_life' && <SvgIcon icon="Check" width='20px' height='20px' />}
          </TouchableOpacity>

          <TouchableOpacity style={styles.selectButton} onPress={() => {
            dispatch({type: CHANGE_BOTTOM_TAB_LIST, payload: 'geo_crm'});
            dispatch({type: CHANGE_PROFILE_STATUS, payload: 1});
          }}>
            <Text style={styles.selectName}>Geo CRM</Text>
            {selectProject == 'geo_crm' && <SvgIcon icon="Check" width='20px' height='20px' />}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  innerContainer: {
    width: '90%',
    height: '100%',
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
    fontFamily: 'Gilroy-Bold',
    color: PRIMARY_COLOR,
    marginBottom: 12,
  },
  avatar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: PRIMARY_COLOR,
    borderWidth: 3,
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12
  },
  avatarLabel: {
    color: PRIMARY_COLOR,
    fontFamily: 'Gilroy-Bold',
    fontSize: 40
  },
  profileInfo: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  label: {
    textAlign: 'right',
    color: TEXT_COLOR,
    fontFamily: 'Gilroy-Bold',
    marginBottom: 4
  },
  text: {
    color: TEXT_COLOR,
    fontFamily: 'Gilroy-Medium',
    marginBottom: 4
  },
  projectBox: {
    width: '100%'
  },
  projectTitle: {
    width: '100%',
    paddingLeft: 8,
    color: PRIMARY_COLOR,
    fontFamily: 'Product Sans-Regular',
    fontSize: 22,
    borderBottomColor: PRIMARY_COLOR,
    borderBottomWidth: 2
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
    fontSize: 16,
    fontFamily: 'Gilroy-Medium',
    color: TEXT_COLOR
  }
})