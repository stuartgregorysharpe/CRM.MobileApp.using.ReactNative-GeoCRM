import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Platform,
  Image,
} from 'react-native';
import {parseCoordinate} from '../../../../actions/google.action';
import SvgIcon from '../../../../components/SvgIcon';
import {whiteLabel} from '../../../../constants/Colors';
import Images from '../../../../constants/Images';
import {checkFeatureIncludeParam} from '../../../../constants/Storage';
import {style} from '../../../../constants/Styles';
import { useDispatch } from 'react-redux';
import { checkConnectivity } from '../../../../DAO/helper';
import { showOfflineDialog } from '../../../../constants/Helper';

export default function WazeNavigation({location, address}) {

  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    checkVisible();
  }, []);

  const checkVisible = async () => {
    setVisible(await checkFeatureIncludeParam('navigation'));
  };

  const openWaze = async() => {

    var wazeByAddress = await checkFeatureIncludeParam(
      'waze_by_address',
    );
    try {
      if (wazeByAddress) {
        var parseLocation = await parseCoordinate(address);
        if (parseLocation) {
          Linking.openURL(
            `https://waze.com/ul?q=${encodeURIComponent(
              address,
            )}&ll=` +
              parseLocation.latitude +
              ',' +
              parseLocation.longitude +
              '&navigate=yes',
          );
        } else {
          Linking.openURL(
            'https://waze.com/ul?ll=' +
              location.latitude +
              ',' +
              location.longitude +
              '&navigate=no',
          );
        }
      } else {
        Linking.openURL(
          'https://waze.com/ul?ll=' +
            location.latitude +
            ',' +
            location.longitude +
            '&navigate=no',
        );
      }
    } catch (e) {
      if (Platform.OS === 'android') {
        Linking.openURL('market://details?id=com.waze');
      } else {
        Linking.openURL(
          'http://itunes.apple.com/us/app/id323229106',
        );
      }
    }

  }

  return (
    <View styles={styles.container}>
      {visible && (
        <View
          style={[
            style.card,
            {
              marginLeft: 10,
              marginRight: 10,
              flexDirection: 'column',
              padding: 10,
              paddingTop: 0,
            },
          ]}>
          {/*<TouchableOpacity
            onPress={() => setIsExpanded(!isExpanded)}
            style={{flexDirection: 'row', padding: 5}}>
            <View style={{flexDirection: 'row', padding: 5, flex: 1}}>
              <Text style={{flex: 1}}>Navigation</Text>
              <SvgIcon icon="Drop_Down" width="23px" height="23px" />
            </View>
        </TouchableOpacity>*/}

          <View
            style={{
              flexDirection: 'column',
              width: '100%',
            }}>
            <TouchableOpacity
              onPress={async () => {
                
                checkConnectivity().then((isConnected) => {
                  if(isConnected){
                    openWaze()
                  }else{
                    showOfflineDialog(dispatch)
                  }
                })
                
              }}>
              <View style={{flex: 1, marginLeft: 10, flexWrap: 'wrap'}}>
                <View style={styles.wazeStyle}>
                  <Text style={{fontSize: 12}}>Waze</Text>
                  <Image
                    resizeMethod="resize"
                    style={{width: 20, height: 20, marginLeft: 10}}
                    source={Images.waze}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  wazeStyle: {
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: whiteLabel().fieldBorder,
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
  },
});
