import {View, Text} from 'react-native';
import React, {useEffect, useState, useRef, useImperativeHandle} from 'react';
import {whiteLabel} from '../../../../../constants/Colors';
import {checkFeatureIncludeParam} from '../../../../../constants/Storage';
import {Fonts} from '../../../../../constants';
import DynamicForm from '../../../../../components/common/DynamicForm';
import {getFormData, getFormStructureData} from '../helper';

const PrimaryContactFields = React.forwardRef((props, ref) => {
  const actionFormRef = useRef();
  const [isCustomerAndContacts, setIsCustomerAndContacts] = useState(false);
  const [formData, setFormData] = useState(getFormData());
  const [formStructure, setFormStructure] = useState(getFormStructureData());
  let _hasCustomerFeature = true;
  useImperativeHandle(
    ref,
    () => ({
      validateForm: async () => {
        return await _validateForm();
      },
    }),
    [],
  );
  const _validateForm = async () => {
    let isValid = true;
    const isCustomerAndContacts = await checkFeatureIncludeParam('contacts');
    if (!isCustomerAndContacts) return true;
    if (actionFormRef && actionFormRef.current) {
      const isFormValid = actionFormRef.current.validateForm();
      console.log('isFormValid', isFormValid);
      if (!isFormValid) {
        isValid = false;
      }
    }
    return isValid;
  };
  useEffect(() => {
    var isMount = true;
    initView();
    return () => {
      isMount = false;
    };
  }, []);

  const initView = async () => {
    const tmp = await checkFeatureIncludeParam('contacts');
    setIsCustomerAndContacts(tmp);
  };

  return (
    <View>
      {isCustomerAndContacts && (
        <View>
          <View
            style={{
              borderBottomColor: whiteLabel().mainText,
              borderBottomWidth: 1,
              marginVertical: 10,
              marginHorizontal: 10,
            }}>
            <Text
              style={{
                fontFamily: Fonts.secondaryBold,
                color: whiteLabel().mainText,
              }}>
              Primary Contact
            </Text>
          </View>

          <DynamicForm
            ref={actionFormRef}
            formData={formData}
            formStructureData={formStructure}
            isShowRequiredFromBegining={true}
            updateFormData={formData => {
              console.log('Fomr data', formData);
              setFormData(formData);
              props.onPrimaryContactFields(formData);
            }}
          />
        </View>
      )}
    </View>
  );
});

export default PrimaryContactFields;
