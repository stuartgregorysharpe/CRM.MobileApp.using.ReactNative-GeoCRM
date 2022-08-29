import React, {useState, useEffect, useMemo, useRef} from 'react';
import {View, StyleSheet, Text, Keyboard} from 'react-native';
import {useDispatch} from 'react-redux';
import {Colors, Constants, Fonts, Strings, Values} from '../../../constants';

import {SubmitButton} from '../SubmitButton';
import FSUCampaignList from './components/FSUCampaignList';
import {constructFormData, getValueFromFormData} from './helper';

const FSUCampaignView = props => {
  const dispatch = useDispatch();
  const {item, questionType, formIndex} = props;
  console.log('item', item);
  const [formData, setFormData] = useState({campaigns: []});
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const onSubmit = () => {
    const submitValueData = getValueFromFormData(formData, item, formIndex);
    if (props.onButtonAction) {
      props.onButtonAction({
        type: Constants.actionType.ACTION_FORM_SUBMIT,
        value: submitValueData,
      });
    }
  };
  useEffect(() => {
    const formData = constructFormData(item);
    setFormData(formData);
  }, [item]);

  const onItemAction = data => {
    const {type, item} = data;
    if (type == Constants.actionType.ACTION_CHANGE_ITEM_PLACED) {
      const {placed} = data;
      const _formData = {...formData};
      const _campaigns = _formData.campaigns;
      const itemIndex = _campaigns.findIndex(
        x => x.fsu_campaign_id == item.fsu_campaign_id,
      );
      if (itemIndex < 0) {
        return false;
      }
      _campaigns[itemIndex].placed = placed;
      setFormData(_formData);
    }
  };
  return (
    <View style={[styles.container, props.style]}>
      <FSUCampaignList
        style={{
          maxHeight: isKeyboardVisible
            ? Values.deviceHeight * 0.4
            : Values.deviceHeight * 0.6,
          alignSelf: 'stretch',
        }}
        items={formData.campaigns}
        onItemAction={onItemAction}
      />
      <SubmitButton
        title={'Record FSU'}
        style={{marginVertical: 16}}
        onSubmit={() => {
          onSubmit();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    paddingHorizontal: 10,
  },
  text: {
    fontFamily: Fonts.primaryMedium,
    fontSize: Values.fontSize.xSmall,
    color: Colors.textColor,
  },

  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBoxContainer: {
    marginTop: 8,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  boxContainer: {
    marginTop: 8,
    paddingVertical: 8,
    alignSelf: 'stretch',
  },
});

export default FSUCampaignView;
