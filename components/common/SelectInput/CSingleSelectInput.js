import React, {useRef, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {Constants} from '../../../constants';
import SelectInputView from './components/SelectInputView';
import ContactEmailModal from './modals/ContactEmailModal';
import SingleSelectModal from './modals/SingleSelectModal';

const CSingleSelectInput = props => {

  const { isKeyboardManager = true , items, hideClear, mode} = props;
  const selectModalRef = useRef(null);
  const contactEmailModalRef = useRef(null);

  const {
    placeholder,
    description,
    checkedValue,
    hasError,
    renderDropdownItem,
    isPressOption,
  } = props;

  const getTextFormCheckedValue = () => {

    if(mode == 'contact_email' || mode == 'contact_select'){
      if(checkedValue != null && checkedValue != undefined ){
        if(checkedValue instanceof Array && checkedValue.length == 1){          
          var title = '';
          console.log("checkedValue",checkedValue)
          checkedValue.forEach((element, index) => {
            if(items instanceof Array){
              const foundItem = items.find(x => x.contact_id == element);
              if(foundItem != undefined){
                if(mode == 'contact_email'){
                  title = foundItem.contact_email;
                }else{
                  title = foundItem.contact_name;
                }
              }          
            }
          });
          return title;          
        }else{

          return checkedValue != null && checkedValue != undefined  && checkedValue.length == 0 ? placeholder : checkedValue.length + " Selected";
        }
      }
      return '';      
    }else if (mode == 'single') {
      if (items) {
        const foundItem = items.find(x => x.value == checkedValue);
        if (foundItem) return foundItem.label;
      }
    } else if ( 
      mode == 'multi' &&
      checkedValue != undefined &&
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
    if(mode == "contact_email" || mode == "contact_select"){
      contactEmailModalRef.current.showModal();
    }else{
      selectModalRef.current.showModal();
    }    
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
        dropdownIcon={props.dropdownIcon}
        showDescription={showDescription}
        description={description || placeholder}
        placeholder={placeholder}
        hasError={hasError}
        text={text}
        onPress={props.isClickable ? onEmpty : onOpenPicker}
      />

      <ContactEmailModal         
        items={items}
        hideClear={hideClear}
        modalTitle={placeholder}                
        mode={mode}
        checkedValue={checkedValue}
        onButtonAction={onButtonAction}
        renderItem={renderDropdownItem}
        isPressOption={isPressOption}
        ref={contactEmailModalRef}
        onClear={() => {          
          if(contactEmailModalRef.current){
            contactEmailModalRef.current.hideModal();
          }                      
        }}
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
        isKeyboardManager={isKeyboardManager != undefined ? isKeyboardManager : true}
        ref={selectModalRef}
        onClear={() => {
          if(mode == "multi"){
            selectModalRef.current.hideModal();
          }else{
            if(props.onClear){
              props.onClear();
            }            
            selectModalRef.current.hideModal();
          }
        }}
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
