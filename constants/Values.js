import {Platform, Dimensions} from 'react-native';
import {getStatusBarHeight, getBottomSpace} from 'react-native-iphone-x-helper';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const platform = Platform.OS;

export default {
  deviceHeight,
  deviceWidth,
  platform,
  statusBarHeight: platform == 'ios' ? getStatusBarHeight(true) : 24,
  bottomSpace: platform == 'ios' ? getBottomSpace() : 0,

  fontSize: {
    xxLarge: 30,
    xLarge: 22,
    large: 20,
    medium: 17,
    small: 15,
    xSmall: 12,
    xxSmall: 11,
    xxxSmall: 10,
  },
  lineHeight: {
    xxLarge: 30,
    xLarge: 24,
    large: 20,
    medium: 17,
    small: 15,
    xSmall: 12,
    xxSmall: 11,
    xxxSmall: 10,
  },
};
