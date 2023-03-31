import {View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Constants} from '../../../../constants';
import FormFilterModalView from '../components/FormFilterModalView';
import {GetRequestFilterDAO} from '../../../../DAO';
import UrlResource from '../../../../DAO/UrlResource';
import {SubmitButton} from '../../../../components/shared/SubmitButton';
import {expireToken} from '../../../../constants/Helper';
import {useDispatch} from 'react-redux';

const FormFilterContainer = props => {
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();

  let isMount = true;

  useEffect(() => {
    GetRequestFilterDAO.find(UrlResource.Form.Filter, {})
      .then(res => {
        initItems(res.items);
      })
      .catch(e => {
        console.log('error', e);
        expireToken(dispatch, e);
      });
    return () => {
      isMount = false;
    };
  }, []);

  const initItems = lists => {
    var tmp = [];
    lists.forEach(element => {
      var options = [];
      if (element.options) {
        element.options.forEach(subElement => {
          options.push({label: subElement.name, value: subElement.id});
        });
      }
      tmp.push({
        label: element.filter_label,
        value: element.filter_label,
        options: options,
      });
    });
    setItems(tmp);
  };

  const addData = value => {
    props.onButtonAction({
      type: Constants.actionType.ACTION_CAPTURE,
      value: value,
    });
  };

  const saveFilter = (value, isClick) => {
    props.onButtonAction({
      type: Constants.actionType.ACTION_CAPTURE,
      value: {value, isClick},
    });
  };

  const applyFilter = () => {
    props.onButtonAction({type: Constants.actionType.ACTION_DONE, value: null});
  };

  return (
    <View
      style={{
        alignSelf: 'stretch',
        flex: 1,
        marginHorizontal: 10,
        marginBottom: 10,
      }}>
        
      <FormFilterModalView
        onButtonAction={addData}
        saveFilter={saveFilter}
        items={items}
        {...props}
      />

      <SubmitButton title="Apply Filters" svgIcon="" onSubmit={applyFilter} />
    </View>
  );
};
export default FormFilterContainer;
