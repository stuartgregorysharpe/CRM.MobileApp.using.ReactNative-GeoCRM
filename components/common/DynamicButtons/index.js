import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Constants} from '../../../constants';
import {SubmitButton} from '../../shared/SubmitButton';
import CheckinLinkButton from './CheckinLinkButton';
import FormLinkButton from './FormLinkButton';

const DynamicButtons = props => {

  const { buttons } = props;
  if (!buttons) return;

  const buttonViews = [];
  const onButtonAction = data => {
    if (props.onButtonAction) {
      props.onButtonAction(data);
    }
  };

  for (const buttonType in buttons) {
    const buttonData = buttons[buttonType];
    if (buttonData.button_label != '' && buttonData.active != '0') {
      if (buttonType == Constants.buttonType.BUTTON_TYPE_SUMBIT) {
        const buttonView = (
          <SubmitButton
            title={buttonData.button_label}
            key={buttonType}
            onSubmit={() => {
              onButtonAction({
                type: Constants.buttonType.BUTTON_TYPE_SUMBIT,
                item: buttonData,
              });
            }}
            style={{marginTop: 12}}
          />
        );
        buttonViews.push(buttonView);
      } else if (buttonType == Constants.buttonType.BUTTON_TYPE_FORM_LINK) {
        const buttonView = (
          <FormLinkButton
            title={buttonData.button_label}
            key={buttonType}
            formId={buttonData.form_id}
            locationId={buttonData.location_id}
            style={{marginTop: 12}}
            onPress={() => {
              onButtonAction({
                type: Constants.buttonType.BUTTON_TYPE_FORM_LINK,
                item: buttonData,
              });
            }}
          />
        );
        buttonViews.push(buttonView);
      } else if (buttonType == Constants.buttonType.BUTTON_TYPE_CHECKIN_LINK) {
        
        const buttonView = (
          <CheckinLinkButton
            title={buttonData.button_label}
            key={buttonType}
            locationId={buttonData.location_id}
            coordinates={{latitude: buttonData?.latitude , longitude : buttonData?.longitude}}
            checkinTypeId={buttonData?.checkin_type_id}
            checkinReasonId={buttonData?.checkin_reason_id}
            formId={buttonData.form_id}
            style={{marginTop: 12}}
            showConfirmModal={(message) => {
              if(props.showConfirmModal){
                props.showConfirmModal(message);
              }
            }}
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
            onFinishProcess={() => {
              onButtonAction({
                type: Constants.buttonType.BUTTON_TYPE_CHECKIN_LINK,
                item: buttonData,
              });
            }}
            onPress={() => {              
            }}
            onReloadLocationData={() => {
              if(props.onReloadLocationData){
                props.onReloadLocationData();
              }
            }}
          />
        );
        buttonViews.push(buttonView);
      }
    }
  }
  return <View style={[styles.container, props.style]}>{buttonViews}</View>;
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
});

export default DynamicButtons;
