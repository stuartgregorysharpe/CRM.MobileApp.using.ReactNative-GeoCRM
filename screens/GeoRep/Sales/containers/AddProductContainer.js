import {View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  GetRequestAddProductFieldsDAO,  
} from '../../../../DAO';
import {expireToken} from '../../../../constants/Helper';
import {useDispatch} from 'react-redux';
import {Constants, Strings} from '../../../../constants';
import {getTokenData} from '../../../../constants/Storage';
import {getRandomNumber, getTimeStamp} from '../../../../helpers/formatHelpers';
import DynamicFormView from '../../../../components/common/DynamicFormView';

const AddProductContainer = props => {

  const dispatch = useDispatch();
  const [fields, setFields] = useState([]);
  let isMount = true;

  useEffect(() => {
    GetRequestAddProductFieldsDAO.find({})
      .then(res => {
        if (isMount) {
          if (res.status == Strings.Success) {
            if (props.onChangeTitle) props.onChangeTitle(res.title);
            setFields(res.fields);
          }
        }
      })
      .catch(e => {
        expireToken(dispatch, e);
      });

    return () => {
      isMount = false;
    };
  }, []);

  const onAdd = async data => {
    const {isEdit, value} = props;
    const user_id = await getTokenData('user_id');
    const add_product_id = getTimeStamp() + user_id + getRandomNumber(4);
    const submitData = {
      ...data,
    };
    if (!isEdit) {
      submitData.add_product_id = add_product_id;
    } else {
      submitData.add_product_id = value?.add_product_id;
    }    
    props.onButtonAction({
      type: Constants.actionType.ACTION_DONE,
      value: submitData,
    });
  };

  return (
    <View
      style={{
        alignSelf: 'stretch',
        flex: 1,
        marginHorizontal: 10,
        marginBottom: 10,
        paddingTop: 10,
      }}>
      <DynamicFormView
        page="add_product"
        buttonTitle="Add"
        fields={fields}
        onAdd={onAdd}
        {...props}
      />
    </View>
  );
};
export default AddProductContainer;
