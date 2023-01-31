import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BaseForm from '../BaseForm';
import DropdownTextView from './components/DropdownTextView';
import BaseFormWithUnderLine from '../BaseFormWithUnderLine';

const DropdownText = (props) => {
  
    const {item, questionType, onChange} = props;
    const isCompleted = item.completed_data != false && item.completed_data != null;

    const renderContent = formCompleted => {
        if (formCompleted) {
          return <Text>completed</Text>
        }

        return (          
          <DropdownTextView {...props}  onItemAction={props.onFormAction} />                    
        );
        
      };
             
    return (            
      <BaseFormWithUnderLine
          item={item}
          style={[styles.container, props.style]}
          onItemAction={props.onFormAction}>
          {renderContent(isCompleted)}                
      </BaseFormWithUnderLine>
    );


}

export default DropdownText

const styles = StyleSheet.create({
    container: {        
        alignSelf: 'stretch',
    },
})