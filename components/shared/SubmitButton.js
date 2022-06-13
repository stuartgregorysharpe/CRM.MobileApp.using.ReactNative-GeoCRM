import React, {useState, useEffect} from 'react';
import {  
  TouchableOpacity,  
  StyleSheet,  
  Text,  
} from 'react-native';
import Colors, {whiteLabel} from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import SvgIcon from '../SvgIcon';

export const SubmitButton = ({title, onSubmit, style , bgStyle  , svgIcon}) => {
  
  return (
    <TouchableOpacity
      style={[styles.submitButton, style , bgStyle]}
      onPress={() => {
        if (onSubmit) {
          onSubmit();
        }
      }}>
      <Text style={[styles.submitButtonText]}>{title}</Text>      
      
      {
        svgIcon != undefined && 
        <SvgIcon icon={svgIcon} width='20' height='20' style={styles.submitButtonIcon} />
      }

      {
        svgIcon == undefined && 
        <FontAwesomeIcon
          style={styles.submitButtonIcon}
          size={25}
          color={whiteLabel().actionFullButtonIcon}
          icon={faAngleDoubleRight}
        />
      }
      
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 3,
  },
  submitButtonText: {
    color: whiteLabel().actionFullButtonText,
    fontSize: 15,
    fontFamily: Fonts.secondaryBold,
    marginRight:15
  },

  submitButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 7,
    backgroundColor: whiteLabel().actionFullButtonBackground,
  },

  submitButtonIcon: {
    position: 'absolute',
    right: 10,
  },
});
