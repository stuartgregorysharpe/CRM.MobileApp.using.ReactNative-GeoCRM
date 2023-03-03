
import { StyleSheet, Text, View , TouchableOpacity } from 'react-native'
import React from 'react'
import { style } from '../../../../constants/Styles';
import SvgIcon from '../../../../components/SvgIcon';

const OptimizePlusButtonView = (props) => {

    const { isOptimize , tabIndex , isAdd } = props;


    return (
        <View style={styles.plusButtonContainer}>
            {isOptimize && tabIndex == 2 && (
            <TouchableOpacity
                style={style.innerPlusButton}
                onPress={() => {              
                    props.onOptimize();
                }}>
                <SvgIcon icon="Calendar_Optimize" width="70px" height="70px" />
            </TouchableOpacity>
            )}

            {isAdd && (
            <TouchableOpacity
                style={style.innerPlusButton}
                onPress={() => {
                    props.onAdd();
                }}>                    
                <SvgIcon icon="Round_Btn_Default_Dark" width="70px" height="70px" />
            </TouchableOpacity>
            )}
        </View>
    )
}

export default OptimizePlusButtonView

const styles = StyleSheet.create({
    plusButtonContainer: {
        position: 'absolute',
        flexDirection: 'row',
        bottom: 20,
        right: 20,
        zIndex: 1,
        elevation: 1,
    },

})