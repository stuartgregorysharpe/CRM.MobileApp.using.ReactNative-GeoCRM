import { View, Text , TouchableOpacity , Linking} from 'react-native'
import React from 'react'
import Colors, { whiteLabel } from '../../constants/Colors';
import { boxShadow, style } from '../../constants/Styles';
import { Constants, Fonts } from '../../constants';
import { AppText } from '../common/AppText';

const ContactsItem = (props) => {

    const { isChecked, item } = props;
    if(!item){
      return null;
    }

    const onValueChange = value => {
        if (props.onItemAction) {
          props.onItemAction({
            type: Constants.actionType.ACTION_CHECK,
            item: item,
            value: value,
          });
        }
    };

  return (
    
    <TouchableOpacity
        onPress={() => {
            onValueChange();
        }}>
          
        <View style={[style.card, boxShadow, isChecked ? {borderColor:whiteLabel().fieldBorder, borderWidth:1 , borderRadius:3} : {} ]}>

          <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>

            <AppText size="medium" title={item.contact_name} color={Colors.textColor} />

            <AppText  title={item.contact_email} color={whiteLabel().subText} />

          </View>

          <TouchableOpacity
              onPress={() => {
                //Linking.openURL(`tel:${item.contact_cell}`);
              }}>

              <AppText  title={item.contact_cell} color={whiteLabel().headerBackground} style={{textDecorationLine: 'underline'}} />

          </TouchableOpacity>
                
        </View>
      </TouchableOpacity>

  )
}

export default ContactsItem