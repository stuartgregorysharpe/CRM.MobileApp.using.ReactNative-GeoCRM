import React, {useState, useEffect, useRef, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {Constants} from '../../../constants';
import SelectInputView from './components/SelectInputView';
import SingleSelectModal from './modals/SingleSelectModal';

const CSingleSelectInput = props => {
  const {items} = props;
  const selectModalRef = useRef(null);

  const {placeholder, description, checkedValue, hasError} = props;

  const getTextFormCheckedValue = () => {
    if (items) {
      const foundItem = items.find(x => x.value == checkedValue);
      if (foundItem) return foundItem.label;
    }
    return '';
  };
  const text = useMemo(() => getTextFormCheckedValue());
  const showDescription = text != '' && text != null;
  const onOpenPicker = () => {
    selectModalRef.current.showModal();
  };
  const onButtonAction = ({type, item}) => {
    if (type == Constants.actionType.ACTION_CHECK) {
      if (props.onSelectItem) {
        props.onSelectItem(item);
      }
    }
    if( type == Constants.actionType.ACTION_FORM_CLEAR){
      if(props.onClear){
        props.onClear();
      }
      
    }
  };
  return (
    <View style={[styles.container, props.containerStyle]}>
      <SelectInputView
        bgType={props.bgType}        
        style={props.bgStyle}
        placeholderStyle={props.placeholderStyle}
        showDescription={showDescription}
        description={description || placeholder}
        placeholder={placeholder}
        hasError={hasError}
        text={text}
        onPress={onOpenPicker}
      />
      <SingleSelectModal
        items={items}
        modalTitle={placeholder}
        checkedValue={checkedValue}
        onButtonAction={onButtonAction}
        ref={selectModalRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
});

export default CSingleSelectInput;