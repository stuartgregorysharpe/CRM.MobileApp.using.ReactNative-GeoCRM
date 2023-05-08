import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import SvgIcon from '../../../../../components/SvgIcon';
import Colors , { whiteLabel } from '../../../../../constants/Colors';
import { Fonts } from '../../../../../constants';

const AddLeadButton = (props) => {

    const { title , hasData , style } = props;
    return (
        
        <TouchableOpacity
            style={[
            styles.btnStyles,
            style,
            !hasData && {
                borderColor: Colors.redColor,
            },
            ]}
            onPress={() => {
                if(props.onPress){
                    props.onPress();
                }
            }}>

            <Text
                style={{
                    fontSize: 14,
                    fontFamily: Fonts.secondaryBold,
                    color: whiteLabel().fieldBorder,
                }}>
                {title}
            </Text>

            <SvgIcon icon="Drop_Down" width="23px" height="23px" />
        </TouchableOpacity>
        
    )
}

export default AddLeadButton

const styles = StyleSheet.create({
    btnStyles: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: whiteLabel().fieldBorder,
        borderRadius: 5,
        flexDirection: 'row',
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: 10,
    },

})