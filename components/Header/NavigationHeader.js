import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { whiteLabel} from '../../constants/Colors';
import Images from '../../constants/Images';
import {style} from '../../constants/Styles';

export default function NavigationHeader(props) {
  const {title, showIcon, onBackPressed} = props;
  return (
    <View style={[styles.layoutBarContent, props.style]}>
      <TouchableOpacity style={{alignSelf: 'center'}} onPress={onBackPressed}>
        <View style={styles.layoutBar}>
          {showIcon && (
            <Image
              resizeMethod="resize"
              style={{width: 15, height: 20, marginRight: 10}}
              source={Images.backIcon}
            />
          )}
          <Text style={style.headerTitle}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  layoutBarContent: {
    flexDirection: 'row',
    height: Platform.OS == 'android' ? 50 : 55,
    width: Dimensions.get('window').width,
    paddingLeft: 15,
    paddingRight: 0,
    marginTop: Platform.OS == 'android' ? 20 : 0,
    paddingTop: Platform.OS == 'android' ? 0 : 0,
    backgroundColor: whiteLabel().headerBackground,
    alignItems: 'center',
    alignContent: 'center',
  },
  layoutBar: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
});
