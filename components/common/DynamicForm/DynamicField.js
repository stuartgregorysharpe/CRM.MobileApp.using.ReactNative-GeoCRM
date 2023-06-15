import {RuleTester} from 'eslint';
import React from 'react';
import {View , Text, TouchableOpacity } from 'react-native';
import { Constants } from '../../../constants';
import { whiteLabel } from '../../../constants/Colors';
import DropdownText from '../../shared/DropdownText';
import EmailInputView from '../../shared/EmailPdf/EmailInputView';
import Paragraph from '../../shared/Paragraph';
import SignatureSignView from '../../shared/SignatureSignView';
import TakePhotoView from '../../shared/TakePhotoView';
import { TextForm } from '../../shared/TextForm';
import {YesNoForm} from '../../shared/YesNoForm';
import { AppText } from '../AppText';
import CTextInput from '../CTextInput';
import CDateTimePickerInput from '../SelectInput/CDateTimePickerInput';
import CSingleSelectInput from '../SelectInput/CSingleSelectInput';

const DynamicField = props => {
  const {
    field_id,
    field_name,
    field_label,
    field_type,
    is_required,
    editable,
    items,
    value,
    price_value,
    updateFormData,
    updateSecondFormData,
    hasError,
    errorText,
    add_prefix,
    add_suffix,
    isFirst,
    index,
    dynamicFieldRef,
    preset_options,
    isClickable,
    isHidden,
    input_label,
    rule_compulsory
  } = props;

  const disabled = editable && editable == '0';

  const renderNumber = () => {
    return (
      <CTextInput
        label={field_label}
        key={index}        
        dynamicFieldRef={dynamicFieldRef}
        index={index}
        isRequired={is_required}
        value={value}
        hasError={hasError}
        errorText={errorText}
        add_prefix={add_prefix}
        add_suffix={add_suffix} 
        disabled={disabled}
        keyboardType={'decimal-pad'}   
        onChangeText={text => {
          updateFormData(field_name, text);
        }}
        style={{marginTop: isFirst ? 0 : 5}}
      />
    );
  };

  const renderText = () => {

    if(isClickable){
      console.log("render clickable view");
      return <TouchableOpacity 
        onPress={() => {
          if(props.onPress){
            props.onPress();
          }
        }}
      >
        <CTextInput
            label={field_label}
            key={index}
            dynamicFieldRef={dynamicFieldRef}
            index={index}
            isRequired={is_required}
            value={value}
            add_prefix={add_prefix}
            add_suffix={add_suffix}        
            hasError={hasError}
            errorText={errorText}
            disabled={disabled}
            pointerEvents={disabled ? 'none' : 'auto'}
            isClickable={isClickable}            
            onChangeText={text => {
              console.log("chagned data", field_name);
              updateFormData(field_name, text);
            }}
            style={{marginTop: isFirst ? 0 : 5 , paddingTop:0}}
          // textInputStyle={[ type == "text" ? {} : { textAlignVertical: 'top', height:100, marginTop:0, paddingTop:0 , lineHeight: 20} ]}        
          />
      </TouchableOpacity>
    }
    
    return (
      <CTextInput
        label={field_label}
        key={index}
        dynamicFieldRef={dynamicFieldRef}
        index={index}
        isRequired={is_required}
        value={value}
        add_prefix={add_prefix}
        add_suffix={add_suffix}        
        hasError={hasError}
        errorText={errorText}
        disabled={disabled}
        pointerEvents={disabled ? 'none' : 'auto'}
        isClickable={isClickable}
        
        onChangeText={text => {
          console.log("chagned data", field_name);
          updateFormData(field_name, text);
        }}
        style={{marginTop: isFirst ? 0 : 5 , paddingTop:0}}
       // textInputStyle={[ type == "text" ? {} : { textAlignVertical: 'top', height:100, marginTop:0, paddingTop:0 , lineHeight: 20} ]}        
      />
    );
  };

  const renderTextForm = () => {
    return (
      <TextForm 
        key={'text_question' + index}
        onTextChanged={text => {
          //onValueChangedSelectionView(key, index, text);
          updateFormData(field_name, text);
        }}
        item={{
          value: value, 
          rule_compulsory: is_required ? '1' : '',
          rule_editable: "1",
          add_prefix:'R',
          add_suffix: '%'
        }}
        type="text"
      />
    )
  }

  const renderTextarea = () =>{
    return (
      <CTextInput
        label={field_label}
        key={index}
        dynamicFieldRef={dynamicFieldRef}
        index={index}
        multiline={true}
        isRequired={is_required}
        value={value}        
        hasError={hasError}
        disabled={disabled}
        pointerEvents={disabled ? 'none' : 'auto'}      
        onChangeText={text => {
          updateFormData(field_name, text);
        }}
        style={{marginTop: isFirst ? 0 : 5 , paddingTop:0}}
        //textInputStyle={[ type == "text" ? {} : { textAlignVertical: 'top', height:100, marginTop:0, paddingTop:0 , lineHeight: 20} ]}        
      />
    );

    // return <TextInput 
    //     multiline
    //     //numberOfLines={6}
    //     style={{maxHeight:120 , borderRadius:5, borderWidth:1, borderColor:'#fff'}}
    //   />
  }

  const renderPrice = () => {
    
    return (
      <View style={{flexDirection:'row'}}>
        <View style={{flex:3}}>
          <CTextInput
            label={field_label}
            key={index}
            dynamicFieldRef={dynamicFieldRef}
            index={index}
            isRequired={is_required}
            value={value != undefined ? value.value : ''}          
            keyboardType={'decimal-pad'}
            hasError={hasError}
            disabled={disabled}
            pointerEvents={disabled ? 'none' : 'auto'}
            onChangeText={text => {
              
              updateFormData(field_name, {value: text , type: value != undefined && value.type != undefined ? value.type : '' });
                            
            }}
            style={{marginTop: isFirst ? 0 : 5 , paddingTop:0}}
          />
        </View>
        
        <View style={{flex:2}}>
          <CSingleSelectInput
            key={index}
            description={"Type"}
            placeholder={''}
            checkedValue={ value != undefined ? value.type : ''}
            items={items}
            mode={'single'}
            hasError={hasError}
            disabled={disabled}
            isClickable={isClickable}
            dropdownIcon="Up_Arrow"
            onPress={() => {
              
            }}
            onSelectItem={item => {
              updateFormData(field_name, {value: value.value , type: item.value});
            }}            
            containerStyle={{ marginLeft:10, marginTop: isFirst ? 0 : 10}}
          />
        </View>
      </View>
    );
  }


  const renderEmailText = () => {
    return (
      <CTextInput
        label={field_label}
        key={index}
        dynamicFieldRef={dynamicFieldRef}
        index={index}
        isRequired={is_required}
        value={value}
        keyboardType="email-address"
        hasError={hasError}
        disabled={disabled}
        pointerEvents={disabled ? 'none' : 'auto'}
        onChangeText={text => {
          updateFormData(field_name, text);
        }}
        style={{marginTop: isFirst ? 0 : 5}}
      />
    );
  };
  
  
  const renderDropdown = (mode = 'single') => {
    
    return (
      <CSingleSelectInput
        key={index}
        description={field_label}
        placeholder={'Select ' + field_label}
        checkedValue={value}
        items={items}
        hasError={hasError}
        disabled={disabled}
        isClickable={isClickable}
        mode={mode}
        onPress={() => {
          if (isClickable) {            
            if(props.onPress){              
              props.onPress();
            }
          }
        }}
        onClear={() => {          
          updateFormData(field_name, '');
        }}
        onSelectItem={ item => {
          
          if(mode == "contact_email" || mode == "contact_select"){            
            onContactItemSelected(item , mode);
          }else if (mode === 'single') {
            updateFormData(field_name, item.value);
          } else if (mode === 'multi') {
            var isData = false;
            if (value != undefined && value != '' && value != null) {
              var check = value.find(element => element === item.value);
              if (check != undefined) {
                isData = true;
              }
            } else {
              isData = false;
            }
 
            if (isData) {
              updateFormData(
                field_name,
                value.filter(element => element != item. value),
              );
            } else {
              if(value != undefined && value != ''){
                updateFormData(field_name, [...value, item.value]);
              }else{
                updateFormData(field_name, [item.value]);
              } 
            }
          }

        }}
        containerStyle={{marginTop: isFirst ? 4 : 10}}
        
      />
    );
  };

  const renderDropdownInput = () => {
    
    return (
      <View>
        <CSingleSelectInput
          key={index}
          description={field_label}
          placeholder={'Select ' + field_label}
          checkedValue={value.value}
          items={items}
          mode={'single'}
          hasError={hasError}
          disabled={disabled}
          isClickable={isClickable}
          onPress={() => {
            if (isClickable) {
              props.onPress();
            }
          }}
          onClear={() => {
            updateSecondFormData(field_name, null, null);
          }}
          onSelectItem={item => {
            updateSecondFormData(field_name, item.value, value.secondValue);
          }}
          containerStyle={{marginTop: isFirst ? 0 : 10}}
        />

        {value != '' && value.value != null && (
          <CTextInput
            label={field_label + ' Number & Details'}
            key={'dropdown_input' + index}
            dynamicFieldRef={dynamicFieldRef}
            index={index}
            isRequired={true}
            value={value.secondValue}
            hasError={hasError}
            disabled={disabled}
            onChangeText={text => {
              updateSecondFormData(field_name, value.value, text);
            }}
            style={{marginTop: 5}}
          />
        )}
      </View>
    );
  };

  const renderDatePicker = () => {

    return (
      <CDateTimePickerInput
        key={index}
        description={field_label}
        placeholder={'Select ' + field_label}
        value={value}
        hasError={hasError}
        disabled={disabled}
        onSelectDate={date => {
          updateFormData(field_name, date);
        }}
        containerStyle={{marginTop: isFirst ? 0 : 10}}
      />
    );
  };
  const renderTakePhotoView = () => {
    return (
      <View style={{alignItems:'center', marginVertical:15 }}>                
        <AppText title={field_label?.trim()} size="medium" type="secondaryBold" style={{fontWeight:'bold' , color : whiteLabel().mainText}} ></AppText>
        <TakePhotoView
          key={index}
          isOptimize={true}
          hasError={hasError}
          isRequired={is_required}
          maxSize={props.maxSize != undefined ? props.maxSize : -1}
          onUpdatePhotos={photos => {
            updateFormData(field_name, photos);
          }}
          disabled={disabled}
          photos={value}
          style={{marginVertical: 0}}
        />  
      </View>      
    );
  };

  const renderYesNoView = () => {
    return (
      <View style={{marginTop:5}}>
        <YesNoForm        
          onTakeImage={async (images, type) => {}}
          onPress={(value, type) => {
            updateFormData(field_name, value);
          }}
          key={index}
          item={{
            question_text: field_label,
            include_image: [],
            rule_compulsory: is_required ? '1' : '',
            value: value,
          }}></YesNoForm>
      </View>      
    );
  };

  const renderDropdownText = () => {
    return (
      <DropdownText
        questionType={field_type}
        item={{
          question_text: field_label + 's',
          field_label: field_label,
          field_name: field_name,
          value: value,
          input_label: input_label,
        }}
        options={preset_options}
        hasError={hasError}
        errorText={errorText}
        style={{marginHorizontal: 0}}
        onFormAction={({type, value}) => {
          updateFormData(field_name, value);
        }}
      />
    );
  };

  const renderEmailInput = () => {    
    return (
      <EmailInputView 
        isShowTitle
        style={{marginTop:10}}
        hasError={hasError}
        isRequired={is_required}
        item={{
          question_text: field_type,
          value: value
        }}
        onItemAction={({type, value, item}) =>{          
          if (type == Constants.actionType.ACTION_FORM_SUBMIT) {            
            updateFormData(field_name, value);
          }
        }} />
    );
  }
    
  const renderSignature = () => {
    return (
      <SignatureSignView 
        hasError={hasError}
        title={field_label}
        isRequired={is_required}
        setScrollEnabled={(flag) => {
          if(props.setScrollEnabled){
            props.setScrollEnabled(flag);
          } 
        }}
        onOK={(signature) => {
          if(signature != undefined){
            console.log("filed", field_name , signature);
            updateFormData(field_name , signature);
          }          
        }}
      />
    )
  }

  const renderParagraph = () => {
    return (
      <Paragraph 
        title={field_label}
      />
    )
  }
  
  const onContactItemSelected = (item , mode) =>{

    var isData = false;
    if (value != undefined && value != '' && value != null) {
      var check = value.find(element => element === item.contact_id);
      if (check != undefined) {
        isData = true;
      }
    } else {
      isData = false;
    }

    console.log("is data", isData)
    if (isData) {
      updateFormData(
        field_name,
        value.filter(element => element != item.contact_id),
      );
    } else {
      if(mode == 'contact_email' && item?.contact_email?.trim() == ''){
        if(props.onNoData){
          props.onNoData(item);
        }
        return;
      }
      if(value != undefined){
        console.log("is value", field_name , value , field_name ,item.contact_id , item)
        updateFormData(field_name, [...value, item.contact_id]);
      }else{
        updateFormData(field_name, [item.contact_id]);
      }
      
    }

  }

  if (!field_type) return null;

  if (isHidden != undefined && isHidden == true) return null;

  if (field_type == 'text') {
    return renderText();
    //return renderTextForm();
  }

  if(field_type == 'textarea'){
    return renderTextarea();
  }

  if(field_type == 'price'){
    return renderPrice();
  }

  if (field_type == 'email') {
    return renderEmailText();
  }
  if (field_type == 'numbers') {
    return renderNumber();
  }
  if (field_type == 'dropdown') {
    return renderDropdown('single');
  }

  if (field_type == 'dropdown_input') {
    return renderDropdownInput();
  }

  if (field_type == 'date') {
    return renderDatePicker();
  }
  if (field_type == 'take_photo') {
    return renderTakePhotoView();
  }
  if (field_type == 'yes_no') {
    return renderYesNoView();
  }

  if (field_type == 'dropdown_text') {
    return renderDropdownText();
  }

  if (field_type == 'multi_select') {
    return renderDropdown('multi');
  }

  if(field_type == 'multiple') {
    return renderDropdown('single');
  }

  if(field_type == 'contact_email') {
    return renderDropdown('contact_email');
  }

  if(field_type == 'contact_select') {
    return renderDropdown('contact_select');
  }

  if(field_type == 'email_input') {
    return renderEmailInput();
  }

  if(field_type == 'signature') {
    return renderSignature();
  }

  if(field_type == 'paragraph'){
    return renderParagraph();
  }

  return null;
};

export default DynamicField;
