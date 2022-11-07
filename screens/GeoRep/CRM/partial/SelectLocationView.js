import { Platform, StyleSheet, Text, View , TouchableOpacity } from 'react-native'
import React from 'react'
import Colors, { whiteLabel } from '../../../../constants/Colors';
import { IS_CALENDAR_SELECTION, SELECTED_LOCATIONS_FOR_CALENDAR } from '../../../../actions/actionTypes';
import { useDispatch } from 'react-redux';
import { Fonts } from '../../../../constants';
import { checkConnectivity } from '../../../../DAO/helper';
import { showNotification } from '../../../../actions/notification.action';
import { showOfflineDialog } from '../../../../constants/Helper';
import SvgIcon from '../../../../components/SvgIcon';

const SelectLocationView = (props) => {

    const { isLoading , isSelected , features , selectedLocationsForCalendar , addToCalendar} = props;

    const dispatch = useDispatch()


    return (                
        <View style={styles.buttonContainer}>
            <View style={styles.leftContainer}>
                <TouchableOpacity
                    disabled={isLoading}
                    style={[
                    styles.buttonTextStyle,
                    {
                        backgroundColor: isLoading
                        ? Colors.skeletonColor
                        : isSelected
                        ? Colors.disabledColor
                        : whiteLabel().actionFullButtonBackground,
                    },
                    ]}
                    onPress={() => {
                    if (!isLoading) {

                        checkConnectivity().then((isConnected) => {
                            if(isConnected){
                                if (isSelected) {
                                    dispatch({
                                        type: SELECTED_LOCATIONS_FOR_CALENDAR,
                                        payload: [],
                                    });
                                }
                                dispatch({
                                    type: IS_CALENDAR_SELECTION,
                                    payload: !isSelected,
                                });
                            }else{
                                showOfflineDialog(dispatch);
                            }
                        });
                        
                    }
                    }}>
                    <Text
                    style={[
                        styles.buttonText,
                        {
                        color: isLoading
                            ? Colors.skeletonColor
                            : Colors.whiteColor,
                        },
                    ]}>
                    {isSelected ? 'Cancel' : 'Select'}
                    </Text>
                </TouchableOpacity>
            </View>

            {isSelected && !features.includes('disable_crm_map_view') && (
                <View style={{alignItems: 'flex-start'}}>
                    <TouchableOpacity
                    disabled={isLoading}
                    style={[
                        styles.buttonTextStyle,
                        {
                        backgroundColor: Colors.bgColor,
                        borderColor: isLoading
                            ? Colors.bgColor
                            : Colors.skeletonColor,
                        borderWidth: 2,
                        marginLeft: 10,
                        },
                    ]}
                    onPress={() => {
                        checkConnectivity().then((isConnected) => {
                            if(isConnected){
                                if (isSelected) {
                                    dispatch({type: IS_CALENDAR_SELECTION, payload: true});
                                    if(props.goPreviousPage){
                                        props.goPreviousPage();
                                    }                            
                                }
                            }else{
                                showOfflineDialog(dispatch)
                            }
                        })
                        
                    }}>
                    <Text
                        style={[
                        styles.buttonText,
                        {color: isLoading ? Colors.bgColor : Colors.blackColor},
                        ]}>
                        {'Map'}
                    </Text>
                    </TouchableOpacity>
                </View>
            )}

            <View style={styles.rightContainer}>
                {isLoading === false &&
                    isSelected &&
                    selectedLocationsForCalendar.length > 0 && (
                    <TouchableOpacity
                        style={styles.buttonTextStyle}
                        onPress={() => {
                        if (selectedLocationsForCalendar.length > 0) {
                            addToCalendar()                            
                        }
                        }}>
                        <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.buttonText}>Add to Calendar</Text>
                        
                        <SvgIcon
                            icon="Arrow_Right"
                            width="13px"
                            height="13px"
                        />
                        </View>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );

}

export default SelectLocationView

const styles = StyleSheet.create({

    buttonContainer: {
        alignSelf:'stretch',
        paddingTop: 8,
        paddingBottom: 17,
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
    },

    leftContainer: {
        alignItems: 'flex-start',
    },

    buttonTextStyle: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: Platform.OS == 'android' ? 5 : 8,
        paddingBottom: Platform.OS == 'android' ? 5 : 8,
        borderRadius: 15,
        backgroundColor: whiteLabel().actionFullButtonBackground,
    },

    buttonText: {
        color: whiteLabel().actionFullButtonText,
        fontSize: 12,
        fontFamily: Fonts.secondaryBold,
    },

    rightContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },

})