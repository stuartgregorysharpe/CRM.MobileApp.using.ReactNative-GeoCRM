import {View, TouchableOpacity} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {style} from '../../../../constants/Styles';
import SvgIcon from '../../../../components/SvgIcon';
import Colors, {whiteLabel} from '../../../../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {AppText} from '../../../../components/common/AppText';
import {BasketListContainer} from './containers/BasketListContainer';
import {RotationAnimation} from '../../../../components/common/RotationAnimation';
import {getBascketLastSyncTableData} from '../../../../sqlite/BascketLastSyncsHelper';
import {Strings, Values} from '../../../../constants';
import ViewOfflineSyncItemContainer from './containers/ViewOfflineSyncItemContainer';

export default function SyncAll(props) {
  const [expanded, setExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSyncedDate, setLastSyncedDate] = useState('');
  const basketRef = useRef();

  const updateLoading = loading => {
    setIsLoading(loading);
    if (loading) {
      initLastSyncAllDateTime();
    }
  };

  useEffect(() => {
    initLastSyncAllDateTime();
  }, [props.refresh]);

  useEffect(() => {
    let isMount = true;
    if (isMount && expanded && isLoading) {
      if (basketRef.current && basketRef.current.startSync) {
        basketRef.current.startSync();
      }
    } else if (isMount && expanded && !isLoading) {
      if (basketRef.current && basketRef.current.expand) {
        basketRef.current.expand();
      }
    }

    return () => {
      isMount = false;
    };
  }, [isLoading, expanded]);

  useEffect(() => {
    if (!isLoading) {
      initLastSyncAllDateTime();
    }
  }, [isLoading]);

  const initLastSyncAllDateTime = async () => {
    var res = await getBascketLastSyncTableData('sync_all');
    var title = '';
    if (res.length > 0) {
      title = Strings.Last_Synced_Date + res.item(0).timestamp;
    }
    setLastSyncedDate(title);
  };

  return (
    <View
      style={[
        style.scrollTabCard,
        {
          marginTop: 10,
          flexDirection: 'column',
          paddingTop: 5,
          paddingBottom: 5,
        },
      ]}>
      <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
        {!isLoading && (
          <TouchableOpacity
            onPress={() => {
              if (basketRef.current && basketRef.current.startSync) {
                basketRef.current.startSync();
              } else {
                setExpanded(true);
                setIsLoading(true);
              }
            }}>
            <View
              style={{
                backgroundColor: whiteLabel().actionFullButtonBackground,
                borderRadius: 5,
                marginLeft: 5,
              }}>
              <SvgIcon icon="Sync" width="50" height="50" />
            </View>
          </TouchableOpacity>
        )}

        {isLoading && <RotationAnimation style={{width: 50, height: 50}} />}

        <View style={{flex: 1, marginLeft: 7, marginTop: 3}}>
          <AppText
            title={Strings.Home.Sync_All}
            type="secondaryBold"
            color={whiteLabel().mainText}
            style={{fontSize: Values.fontSize.small}}></AppText>
          <AppText
            title={lastSyncedDate}
            type="secondaryMedium"
            color={Colors.disabledColor}
            style={{
              fontSize: Values.fontSize.xxxSmall,
              marginTop: 5,
            }}></AppText>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 2,
            marginRight: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {/*<Icon
                name={`info-outline`}
                size={20}
        color={Colors.redColor}/>*/}

          <TouchableOpacity
            onPress={() => {
              setExpanded(!expanded);
            }}>
            <View style={{marginRight: 10, marginLeft: 10}}>
              <SvgIcon
                icon={expanded ? 'Up_Arrow' : 'Bottom_Arrow'}
                width="30"
                height="30"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {expanded && (
        <BasketListContainer ref={basketRef} updateLoading={updateLoading} />
      )}

      {expanded && (
        <ViewOfflineSyncItemContainer
          onClosed={() => {
            setExpanded(false);
          }}
        />
      )}
    </View>
  );
}
