import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {SubmitButton} from '../../../shared/SubmitButton';
import SingleSelectList from '../components/SingleSelectList';

const SingleSelectContainer = props => {
  const {buttonTitle, checkedValue} = props;
  const onButtonAction = data => {
    if (props.onButtonAction) {
      props.onButtonAction(data);
    }
  };
  return (
    <View style={[styles.container, props.style]}>
      <SingleSelectList
        items={props.items}
        checkedValue={checkedValue}
        onItemAction={onButtonAction}
        style={{marginHorizontal: 12}}
      />
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

export default SingleSelectContainer;
