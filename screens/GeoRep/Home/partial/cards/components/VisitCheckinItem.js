import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import SvgIcon from '../../../../../../components/SvgIcon';
import {AppText} from '../../../../../../components/common/AppText';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons';
import Colors, {whiteLabel} from '../../../../../../constants/Colors';
import CheckinLinkButton from '../../../../../../components/common/DynamicButtons/CheckinLinkButton';

export default function VisitCheckinItem(props) {
  
  const { item } = props;

  return (
    <View style={{alignSelf: 'stretch'}}>
      <View style={{height: 1, backgroundColor: Colors.lightGreyColor}}></View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 5,
          alignItems: 'center',
          marginBottom: 5,
        }}>
          
        <View style={{flex: 1, flexDirection: 'row'}}>
          <SvgIcon icon="Location_Arrow" width="15px" height="15px" />
          <View style={{marginLeft: 5}}>
            <AppText title={item.location_name}></AppText>
            <AppText title={item.time}></AppText>
          </View>
        </View>
        
        <CheckinLinkButton
          title="Check In"
          locationId={item.location_id}
          scheduleId={item.scheduleId}
          coordinates={{latitude: item?.latitude , longitude : item?.longitude}}
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
          onReloadLocationData={() => {
            if(props.onReloadLocationData){
              props.onReloadLocationData();
            }
          }}
          renderSubmitButton={onCheckIn => {
            return (
              <TouchableOpacity
                onPress={() => {
                  onCheckIn();
                }}
                style={styles.submitButtonStyle}>
                <AppText color={Colors.whiteColor} title="Check In"></AppText>
                <FontAwesomeIcon
                  style={{marginLeft: 5}}
                  size={15}
                  color={whiteLabel().actionFullButtonText}
                  icon={faAngleDoubleRight}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  submitButtonStyle: {
    backgroundColor: whiteLabel().actionFullButtonBackground,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
});
