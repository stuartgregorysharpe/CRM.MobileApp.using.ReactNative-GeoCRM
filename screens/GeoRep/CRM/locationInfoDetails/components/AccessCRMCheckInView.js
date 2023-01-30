import { StyleSheet, Text, View , Platform , Dimensions , TouchableOpacity } from 'react-native'
import React from 'react'
import DeviceInfo from 'react-native-device-info';
import { whiteLabel } from '../../../../../constants/Colors';
import { Fonts, Strings } from '../../../../../constants';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons';
import CheckinLinkButton from '../../../../../components/common/DynamicButtons/CheckinLinkButton';

const AccessCRMCheckInView = (props) => {

    const { features , location_id } = props;
    if( location_id == undefined ) return null;
            

  return (    
      <View style={styles.nextButtonBar}>
            {features && features.includes('access_crm') && (
              <TouchableOpacity
                style={[styles.nextButton, styles.accessButton]}
                onPress={async () => {
                    if(props.onAccessCRM) {
                        props.onAccessCRM();
                    }                
                }}>
                <Text style={styles.nextButtonText}>                    
                  {Strings.CRM.Access_CRM}
                </Text>
                <FontAwesomeIcon
                  size={22}
                  color={whiteLabel().actionOutlineButtonText}
                  icon={faAngleDoubleRight}
                />
              </TouchableOpacity>
            )}

            {features && features.includes('checkin') && (
                <CheckinLinkButton
                  title="Check In"
                  locationId={location_id}        
                  onCallback={() => {
                    if(props.onCheckIn){
                      console.log("triger on callback");
                        props.onCheckIn();
                    }
                  }}     
                  renderSubmitButton={onCheckIn => {
                    return (
                      <TouchableOpacity
                        style={[styles.checkInButton]}
                        onPress={async () => {
                            onCheckIn();                                          
                        }}>
                        <Text style={[styles.checkInButtonText]}>
                          {Strings.CRM.Check_In}
                        </Text>
                        <FontAwesomeIcon
                          size={22}
                          color={whiteLabel().actionFullButtonIcon}
                          icon={faAngleDoubleRight}
                        />
                      </TouchableOpacity>
                    );
                  }}
                />
                
              
            )}
        </View>
    
  )
}

export default AccessCRMCheckInView

const styles = StyleSheet.create({
    nextButtonBar: {
        position: 'absolute',
        bottom: Platform.OS == 'android' ? 0 : 25,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: DeviceInfo.isTablet() ? 20 : 15,
        paddingLeft: DeviceInfo.isTablet() ? 20 : 15,
        paddingRight: DeviceInfo.isTablet() ? 20 : 15,
        width: Dimensions.get('screen').width,
        paddingBottom: DeviceInfo.isTablet() ? 20 : 5,
        borderColor: 'rgba(0, 0, 0, 0.2)',
        borderTopWidth: 0.5,
    },

    nextButton: {
        width: '47%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        paddingLeft: 20,
        paddingRight: 20,
        borderWidth: 1,
        borderColor: whiteLabel().actionOutlineButtonBorder,
        borderRadius: 7,
    },

    nextButtonText: {
        color: whiteLabel().actionOutlineButtonText,
        fontSize: 15,
        fontFamily: Fonts.secondaryBold,
    },

    checkInButton: {
        width: '47%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        paddingLeft: 20,
        paddingRight: 20,
        borderWidth: 1,
        borderRadius: 7,
        backgroundColor: whiteLabel().actionFullButtonBackground,
      },
    
      checkInButtonText: {
        color: whiteLabel().actionFullButtonText,
        fontSize: 15,
        fontFamily: Fonts.secondaryBold,
      },

})