import {Dimensions, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  GetRequestTransactionSubmitFieldsDAO,
  PostRequestDAO,
} from '../../../../DAO';
import {expireToken, getFileFormat} from '../../../../constants/Helper';
import {useDispatch} from 'react-redux';
import {Constants, Strings} from '../../../../constants';
import {getJsonData, getTokenData} from '../../../../constants/Storage';
import {getRandomNumber, getTimeStamp} from '../../../../helpers/formatHelpers';
import DynamicFormView from '../../../../components/common/DynamicFormView';
import {useSelector} from 'react-redux';
import * as RNLocalize from 'react-native-localize';
import {
  clearNotification,
  showNotification,
} from '../../../../actions/notification.action';

const TransactionSubmitContainer = props => {

  const {cartStatistics, productPriceList, addProductList} = props;
  const dispatch = useDispatch();
  const [fields, setFields] = useState([]);
  const currentLocation = useSelector(state => state.rep.currentLocation);
  let isMount = true;

  useEffect(() => {
    getTransactinSubmit();
    return () => {
      isMount = false;
    };
  }, []);

  const getTransactinSubmit = async () => {
    var setup = await getJsonData('@setup');
    var param = {};
    if (setup != null && setup.location && setup.transaction_type) {
      if (props.onChangeTitle)
        props.onChangeTitle(setup.transaction_type.type + ' Details');

      param = {
        transaction_type: setup.transaction_type.type,
        location_id: setup.location.location_id,
      };

      console.log('param', setup);
      GetRequestTransactionSubmitFieldsDAO.find(param)
        .then(res => {
          if (isMount) {
            if (res.status == Strings.Success) {
              console.log("response",res.fields)
              setFields(res.fields);
            }
          }
        })
        .catch(e => {
          expireToken(dispatch, e);
        });
    }
  };

  const onAdd = async data => {
    const user_id = await getTokenData('user_id');
    const add_product_id = getTimeStamp() + user_id + getRandomNumber(4);
    const submitData = {
      ...data,
      add_product_id: add_product_id,
    };
    //props.onButtonAction({type: Constants.actionType.ACTION_DONE, value: submitData});
    var res = await generatePostParam(data);
  };

  const generatePostParam = async data => {
    try {
      var transactionFields = [];
      var files = getAllFiles(addProductList, data);
      Object.keys(data).forEach(key => {
        transactionFields.push({field_id: key, answer: data[key]});
      });
      var items = generateProductPricePostData(productPriceList);
      var added_products = generateAddProductPostData(addProductList);
      const setupData = await getJsonData('@setup');
      var time_zone = RNLocalize.getTimeZone();

      const totals = {
        discount: (cartStatistics.discount.toFixed(2)).toString(),
        sub_total: (cartStatistics.subTotal.toFixed(2)).toString(),
        tax: (cartStatistics.tax.toFixed(2)).toString(),
        total: (cartStatistics.total.toFixed(2)).toString(),
      };

      var postJsonData = {
        transaction_type: setupData.transaction_type.type,
        location_id: setupData.location.location_id,
        currency_id: setupData.currency_id.id,
        // 'cart[items][add_product_id]' : items,
        // 'cart[added_products]' : added_products,
        // 'cart[totals]' : totals,
        cart: {
          items: items,
          added_products: added_products,
          totals: totals,
        },
        transaction_fields: transactionFields,
        'user_local_data[time_zone]': time_zone,
        'user_local_data[latitude]':
          currentLocation && currentLocation.latitude != null
            ? currentLocation.latitude
            : '0',
        'user_local_data[longitude]':
          currentLocation && currentLocation.longitude != null
            ? currentLocation.longitude
            : '0',
      };

      if (setupData.regret_id) {
        postJsonData.regret_id = setupData.regret_id;
      }
      
      files.forEach(item => {
        if(item.value instanceof Array){
          item.value.forEach((fileName) => {
            postJsonData = {
              ...postJsonData,
              [item.key]: getFileFormat(fileName),
            };
          });
        }else{
          postJsonData = {
            ...postJsonData,
            [item.key]: getFileFormat(item.value),
          };
        }        
      });
      console.log('postJSONData1', JSON.stringify(postJsonData));
      PostRequestDAO.find(
        0,
        postJsonData,
        'transaction-submit',
        'sales/transaction-submission',
        '',
        '',
      )
        .then(res => {
          dispatch(
            showNotification({
              type: Strings.Success,
              message: res.message,
              buttonText: 'Ok',
              buttonAction: () => {
                dispatch(clearNotification());
                props.onButtonAction({type: Constants.actionType.ACTION_DONE});
              },
            }),
          );
        })
        .catch(e => {
          expireToken(dispatch, e);
        });
    } catch (e) {
      console.log(e);
    }
    return postJsonData;
  };

  const getAllFiles = (addProductList, formData) => {
    var tmpList = [];
    addProductList.forEach(item => {
      if (item.product_image && item.product_image.length > 0) {
        tmpList.push({
          key: `productImages[${item.add_product_id}]`,
          value: item.product_image[0],
        });
      }
    });
    fields.forEach(item => {
      if (item.field_type == 'signature' || item.field_type == 'take_photo') {
        tmpList.push({
          key: `fieldPhotos[${item.field_id}]`,
          value: formData[item.field_id],
        });
      }
    });
    return tmpList;
  };

  const generateProductPricePostData = productPriceList => {
    var tmpList = [];
    productPriceList.forEach(item => {
      tmpList.push({
        product_id: item.product_id,
        add_product_id: '',
        price:
          parseFloat(item.product.finalPrice) != 0
            ? item.product.finalPrice
            : item.product.price,
        qty: item.qty,
      });
    });
    return tmpList;
  };

  const generateAddProductPostData = addProductPriceList => {
    var tmpList = [];
    addProductPriceList.forEach(item => {
      tmpList.push({
        add_product_id: item.add_product_id,
        product_name: item.product_name,
        product_type: item.product_type,
        additional_details: item.additional_details,
        quantity: item.quantity,
        price: item.price.value,
      });
    });
    return tmpList;
  };

  return (
    <View
      style={{
        alignSelf: 'stretch',
        flex: 1,
        marginHorizontal: 10,
        marginBottom: 10,
        paddingTop: 10,
        maxHeight: Dimensions.get('screen').height * 0.8,
      }}>

      <DynamicFormView
        page="transaction_submit"
        buttonTitle={'Submit'}
        fields={fields}
        onAdd={onAdd}
        
        {...props}
      />
    </View>
  );
};

export default TransactionSubmitContainer;
