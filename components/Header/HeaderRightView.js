import React, { Fragment, useState, useEffect } from 'react';
import { View, StyleSheet , Text ,TouchableOpacity} from 'react-native';
import { PRIMARY_COLOR } from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { useDispatch, useSelector } from 'react-redux';
import ToggleSwitch from 'toggle-switch-react-native';
import { CHANGE_PROFILE_STATUS } from '../../actions/actionTypes';


export default function HeaderRightView() {
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.auth.userInfo);  
    const [toggleSwitch, setToggleSwitch] = useState(true);
  
    return (
      <View style={styles.headerRightView}>
        <ToggleSwitch
          style={styles.toggleSwitch}
          label={toggleSwitch ? "Online" : "Offline"}
          labelStyle={styles.toggleSwitchLabel}
          onColor="#fff"
          offColor="#a3c0f9"
          size="small"
          thumbOnStyle={{ backgroundColor: PRIMARY_COLOR }}
          thumbOffStyle={{ backgroundColor: PRIMARY_COLOR }}
          isOn={toggleSwitch}
          onToggle={toggleSwitch => {
            setToggleSwitch(toggleSwitch);
          }}
        />
        <TouchableOpacity style={styles.headerAvatar} onPress={() => dispatch({type: CHANGE_PROFILE_STATUS, payload: 0})}>
          <Text style={styles.headerAvatarText}>
            {userInfo.user_name.split(' ')[0] && userInfo.user_name.split(' ')[0][0].toUpperCase()}
            {userInfo.user_name.split(' ')[1] && userInfo.user_name.split(' ')[1][0].toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  const styles = StyleSheet.create({
    layoutBarContent: {
      height:62,
      justifyContent:'center',
      paddingLeft:12,
      paddingRight:12,
      backgroundColor:PRIMARY_COLOR,    
    },
    layoutBar: {
      
    },
    headerRightView: {        
        flexDirection: 'row',
        marginRight: 12,    
        marginBottom:20,
        marginTop:20
    },
    toggleSwitch: {
        marginRight: 12,
        flexDirection: 'row',
        alignItems: 'center'
    },
    toggleSwitchLabel: {
       color: '#fff',
       fontSize: 12,
       fontFamily: 'Gilroy-Medium'
    },

    headerAvatar: {
        
        justifyContent: 'center',
        // alignItems: 'center',
        
        borderColor: '#fff',
        borderWidth: 2,
        width: 32,
        height: 32,
        borderRadius: 20
    },
    headerAvatarText: {
        //marginTop:2,
        fontSize: 17,
        color: '#fff',
        fontFamily: 'Gilroy-Bold',
        alignSelf:'center'
    }
  })
