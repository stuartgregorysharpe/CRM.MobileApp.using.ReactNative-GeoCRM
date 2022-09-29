import React, {useRef, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {Constants} from '../../../constants';
import SelectInputView from './components/SelectInputView';
import SingleSelectModal from './modals/SingleSelectModal';

const CSingleSelectInput = props => {
  const {items, hideClear, mode} = props;
  const selectModalRef = useRef(null);

  const {
    placeholder,
    description,
    checkedValue,
    hasError,
    renderDropdownItem,
    isPressOption,
  } = props;

  const getTextFormCheckedValue = () => {
    if (mode == 'single') {
      if (items) {
        const foundItem = items.find(x => x.value == checkedValue);
        if (foundItem) return foundItem.label;
      }
    } else if (
      mode == 'multi' &&
      checkedValue != '' &&
      checkedValue.length > 0
    ) {
      var title = '';
      checkedValue.forEach((element, index) => {
        if(items instanceof Array){
          const foundItem = items.find(x => x.value == element);
          if(foundItem != undefined){
            if (index == 0) {
              title = foundItem.label;
            } else {
              title = title + ', ' + foundItem.label;
            }
          }          
        }                
      });
      return title;
    }
    return '';
  };
  const _text = useMemo(() => getTextFormCheckedValue());
  const text = props.text ? props.text : _text;
  const showDescription = text != '' && text != null;

  const onOpenPicker = () => {
    selectModalRef.current.showModal();
  };

  const onEmpty = () => {
    props.onPress();
  };

  const onButtonAction = ({type, item}) => {
    if (type == Constants.actionType.ACTION_CHECK) {
      if (props.onSelectItem) {
        props.onSelectItem(item);
      }
    }
    if (type == Constants.actionType.ACTION_FORM_CLEAR) {
      if (props.onClear) {
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
        onPress={props.isClickable ? onEmpty : onOpenPicker}
      />
      <SingleSelectModal
        items={items}
        hideClear={hideClear}
        modalTitle={placeholder}
        clearText={mode == 'single' ? 'Clear' : 'Done'}
        mode={mode}
        checkedValue={checkedValue}
        onButtonAction={onButtonAction}
        renderItem={renderDropdownItem}
        isPressOption={isPressOption}
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
