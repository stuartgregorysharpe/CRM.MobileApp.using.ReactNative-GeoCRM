import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Text,
  Dimensions,
} from 'react-native';
import Colors, {whiteLabel} from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import {style} from '../../constants/Styles';
import SvgIcon from '../SvgIcon';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Button = ({
  btnStyle,
  style,
  selectedButtonStyle,
  textStyle,
  title,
  onTaped,
  onClick,
}) => {
  const [isclicked, setIsClicked] = useState(onTaped);

  useEffect(() => {
    setIsClicked(onTaped);
  }, [onTaped]);

  return (
    <TouchableOpacity
      style={[btnStyle]}
      onPress={() => {
        onClick();
      }}>
      <View
        style={
          !isclicked
            ? [styles.inputStyle, style]
            : [styles.inputStyle, styles.selectedStyle, selectedButtonStyle]
        }>
        <Text
          style={
            isclicked
              ? [
                  styles.textStyle,
                  textStyle,
                  {color: whiteLabel().actionFullButtonText},
                ]
              : [styles.textStyle, textStyle]
          }>
          {title}
        </Text>
        {selectedButtonStyle === undefined && isclicked && (
          <View style={{marginLeft: 10}}>
            <SvgIcon icon="Yes_No_Button_Check" width="15px" height="15px" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 3,
  },

  buttonStyle: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    paddingVertical: 5,
    color: Colors.blackColor,
    fontSize: 15,
    fontFamily: Fonts.secondaryBold,
  },

  inputStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: whiteLabel().actionOutlineButtonText,
    paddingVertical: 4,
    paddingRight: 40,
    paddingLeft: 40,
    borderRadius: 20,
    borderWidth: 2,
  },

  selectedStyle: {
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: whiteLabel().actionFullButtonBackground,
  },

  textStyle: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: Fonts.primaryMedium,
    color: Colors.blackColor,
  },
});
