import { StyleSheet, Text, View ,TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors, Fonts } from '../../constants';
import { whiteLabel } from '../../constants/Colors';

const BaseFormWithUnderLine = (props) => {
  
    const {item} = props;
    if (!item) return null;
    onItemAction = type => {
        if (props.onItemAction) {
            props.onItemAction({type, item});
        }
    };
    
    const isShowInfoIcon = item.guide_info !== undefined && item.guide_info.length != 0

    return (
        <View
          style={[
            styles.container,            
            {marginHorizontal: 5, marginVertical: 3, flexDirection: 'column'},
            props.style,
          ]}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1, paddingHorizontal: 5}}>
              <Text style={styles.titleStyle}> {item.question_text} </Text>
              <View style={{flex:1, height: 1, backgroundColor:whiteLabel().fieldBorder, marginBottom:10}} ></View>
            </View>
            {
              isShowInfoIcon && (
                <TouchableOpacity
                  onPress={() => onItemAction(Constants.actionType.ACTION_INFO)}>
                  <Icon name={`info-outline`} size={25} color={whiteLabel().mainText} />
                </TouchableOpacity>
              )
            }
          </View>
          {props.children}
        </View>
    );
}

export default BaseFormWithUnderLine

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
    },

    titleStyle: {    
        paddingVertical: 5,
        color: Colors.blackColor,
        fontSize: 14,
        fontFamily: Fonts.secondaryMedium,
    },
})