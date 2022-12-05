import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {SubmitButton} from '../../../shared/SubmitButton';
import ContactEmailView from '../components/ContactEmailView';

const ContactEmailContainer = props => {

  const {buttonTitle, checkedValue, renderItem, isPressOption, mode} = props;
  let _checkedValue = checkedValue;
  if (isPressOption) {
    _checkedValue = false;
  }

  const onButtonAction = data => {
    if (props.onButtonAction) {
      props.onButtonAction(data);
    }
  };

  return (
    <View style={[styles.container, props.style]}>
      <ScrollView style={{maxHeight: 400, alignSelf: 'stretch'}}>
        <ContactEmailView
          items={props.items}
          checkedValue={_checkedValue}
          isPressOption={isPressOption}
          mode={mode}
          onItemAction={onButtonAction}
          renderItem={renderItem}
          style={{marginHorizontal: 12}}
        />
      </ScrollView>
      
      {buttonTitle && (
        <SubmitButton
          onSubmit={() => {
            if (props.onSave) {
              props.onSave();
            }
          }}
          title={buttonTitle}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    paddingBottom: 16,
  },
});


export default ContactEmailContainer;
