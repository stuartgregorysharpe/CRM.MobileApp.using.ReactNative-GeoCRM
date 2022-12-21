import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ContactsItem from '../../../items/ContactsItem';
import { SubmitButton } from '../../../shared/SubmitButton';
import { Constants } from '../../../../constants';
import { value } from 'react-native-extended-stylesheet';

const ContactEmailView = (props) => {

    const {checkedValue, idFieldName = 'contact_id', mode} = props;

    const isChecked = item => {
        if (checkedValue != '' && checkedValue != undefined) {          
          var tmp = checkedValue.find(element => element === item[idFieldName]);
          if (tmp !== null && tmp !== undefined) {
            return true;
          }
        }
        return false;

    };
    
    const renderItem = (item, index, isLast, isChecked, onItemAction) => {
        if (props.renderItem) {
          return props.renderItem(item, index, isLast, isChecked, onItemAction);
        }    
    
        return (
          <ContactsItem
            isChecked={isChecked}
            item={item}
            key={index + 'item'}
            isLast={isLast}
            onItemAction={onItemAction}
          />
        );
    };

    const renderItems = items => {
        if(items == null || items == undefined){
          return null;
        }
        return items.map((item, index) => {
          const isLast = index == items.length - 1;
    
          return renderItem(
            item,
            index,
            isLast,
            isChecked(item),
            props.onItemAction,
          );

        });
    };

    return (
        <View style={[styles.container, props.style]}>
          {renderItems(props.items)}

          <SubmitButton title="Save" 
            onSubmit={() => {
              if(props.onItemAction){
                console.log("close");
                props.onItemAction({type: Constants.actionType.ACTION_CLOSE});
              }
            }}
           />

        </View>
    );

}

export default ContactEmailView

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignSelf: 'stretch',
      },
      itemStyle: {
        marginBottom: 14,
      },

})