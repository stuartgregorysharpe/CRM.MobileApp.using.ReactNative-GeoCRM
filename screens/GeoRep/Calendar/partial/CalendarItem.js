import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import SvgIcon from '../../../../components/SvgIcon';
import Colors, {whiteLabel} from '../../../../constants/Colors';
import Fonts from '../../../../constants/Fonts';
import {faCheckCircle} from '@fortawesome/free-regular-svg-icons';
import {getLocalData} from '../../../../constants/Storage';
import {useDispatch, useSelector} from 'react-redux';
import {
  CHECKIN,
  LOCATION_ID_CHANGED,
  LOCATION_CHECK_OUT_COMPULSORY,
} from '../../../../actions/actionTypes';
import {style} from '../../../../constants/Styles';
import CheckinLinkButton from '../../../../components/common/DynamicButtons/CheckinLinkButton';
import CheckOutViewContainer from '../../../../components/common/CheckOut/CheckOutViewContainer';
import {
  clearNotification,
  showNotification,
} from '../../../../actions/notification.action';
import {Strings} from '../../../../constants';


export function CalendarItem(props) {
  const {navigation, tabIndex, onItemSelected} = props;
  const features = useSelector(
    state => state.selection.payload.user_scopes.geo_rep.features,
  );
  const checkinScheduleId = useSelector(
    state => state.location.checkinScheduleId,
  );
  const item = {...props.item};
  if (checkinScheduleId == item.schedule_id) {
    item.checkin_state = 'checkin_current';
  }
  const dispatch = useDispatch();

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    
  };

  const checkOpenReplaceCheckin = () => {
    return features != null && features.includes('open_replace_checkin');
  };

  const getButtonColor = checkin_state => {
    if (checkOpenReplaceCheckin()) {
      return whiteLabel().actionFullButtonBackground;
    } else {
      if (checkin_state === 'checkin_required') {
        return whiteLabel().actionFullButtonBackground;
      } else if (checkin_state === 'checkin_completed') {
        return Colors.disabledColor;
      } else if (checkin_state === 'checkin_current') {
        return Colors.selectedRedColor;
      }
    }
  };

  const getButtonText = checkin_state => {
    if (checkOpenReplaceCheckin()) {
      return 'Open';
    } else {
      if (checkin_state === 'checkin_required') {
        return 'Check In';
      } else if (checkin_state === 'checkin_completed') {
        return 'Check In';
      } else if (checkin_state === 'checkin_current') {
        return 'Check Out';
      }
    }
  };

  const renderCheckOutButton = () => {
    return (
      <CheckOutViewContainer
        type="calendar"
        isLoadingForm={false}
        onCallback={async res => {
          if (props.onRefresh) {
            props.onRefresh();
          }
          dispatch(
            showNotification({
              type: Strings.Success,
              message: res.message,
              buttonText: Strings.Ok,
              buttonAction: async () => {
                // dispatch({
                //   type: CHECKIN,
                //   payload: false,
                //   scheduleId: false,
                // });
                // dispatch({
                //   type: LOCATION_CHECK_OUT_COMPULSORY,
                //   payload: true,
                // });
                dispatch(clearNotification());
              },
            }),
          );
        }}
      />
    );
  };

  const renderStatusButton = () => {
    if (
      item.checkin_state === 'checkin_required' ||
      item.checkin_state === 'checkin_completed'
    ) {
      return (
        <CheckinLinkButton
          title="Check In"
          locationId={item.location_id}
          scheduleId={item.schedule_id}
          showConfirmModal={(message) => {            
            if(props.showConfirmModal){
              props.showConfirmModal(message);
            }
          }}
          onStart={() => {
            if(props.showLoadingBar){
              props.showLoadingBar();
            }
          }}
          onEnd={() => {
            if(props.hideLoadingBar){
              props.hideLoadingBar();
            }
          }}    
          renderSubmitButton={onCheckIn => {
            return (
              <TouchableOpacity
                onPress={() => {
                  onCheckIn();
                }}
                style={[
                  styles.itemButton,
                  {backgroundColor: getButtonColor(item.checkin_state)},
                ]}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.itemButtonText}>
                    {getButtonText(item.checkin_state)}
                  </Text>
                </View>
                {item.checkin_state === 'checkin_completed' ? (
                  <FontAwesomeIcon
                    style={styles.itemButtonIcon}
                    size={16}
                    color={whiteLabel().actionFullButtonIcon}
                    icon={faCheckCircle}
                  />
                ) : (
                  <SvgIcon
                    style={styles.itemButtonIcon}
                    icon="Angle_Left"
                    width="14px"
                    height="14px"
                  />
                )}
              </TouchableOpacity>
            );
          }}
        />
      );
    }
    return (
      <TouchableOpacity
        style={[
          styles.itemButton,
          {backgroundColor: getButtonColor(item.checkin_state)},
        ]}
        onPress={() => {
          if (checkOpenReplaceCheckin()) {
            dispatch({
              type: LOCATION_ID_CHANGED,
              payload: {value: item.location_id, type: tabIndex},
            });
            navigation.navigate('CRM', {
              screen: 'LocationSearch',
              params: {location_id: item.location_id},
            });
            onItemSelected();
          }
        }}>
        <Text style={styles.itemButtonText}>
          {' '}
          {getButtonText(item.checkin_state)}{' '}
        </Text>
        <FontAwesomeIcon
          style={styles.itemButtonIcon}
          size={16}
          color={whiteLabel().actionFullButtonIcon}
          icon={faCheckCircle}
        />
      </TouchableOpacity>
    );
  };

  if (item != undefined && item.coordinates != undefined) {
    return (
      <View style={[styles.itemContainer, style.card]}>
        <View style={styles.itemLeft}>
          <View style={styles.itemTitleBox}>
            <SvgIcon
              style={{marginRight: 4}}
              icon="Location_Arrow"
              width="12px"
              height="12px"
            />
            <Text style={styles.itemTitle}>{item.location_name}</Text>
          </View>
          <Text style={styles.itemText}>{item.address}</Text>
        </View>

        <View style={styles.itemRight}>
          <Text style={[styles.itemTitle, {textAlign: 'center'}]}>
            {' '}
            {item.schedule_time}
          </Text>
          {item.checkin_state === 'checkin_current'
            ? renderCheckOutButton()
            : renderStatusButton()}
        </View>
      </View>
    );
  }
  return <View></View>;
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 4,
    backgroundColor: Colors.whiteColor,
    borderWidth: 1.5,
    borderColor: whiteLabel().fieldBorder,
  },
  itemLeft: {
    flex: 1,
  },
  itemRight: {
    width: 100,
    marginLeft: 16,
  },

  itemTitleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },

  itemTitle: {
    fontSize: 14,
    fontFamily: Fonts.secondaryMedium,
    color: whiteLabel().mainText,
  },
  itemText: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: Fonts.secondaryMedium,
    color: Colors.disabledColor,
    maxHeight: 36,
  },
  itemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'center',
    padding: 4,
    marginTop: 4,
    marginBottom: 4,
    borderRadius: 4,
  },
  itemButtonText: {
    fontSize: 14,
    fontFamily: Fonts.secondaryMedium,
    textAlign: 'center',
    color: '#fff',
  },
  itemButtonIcon: {},
});
