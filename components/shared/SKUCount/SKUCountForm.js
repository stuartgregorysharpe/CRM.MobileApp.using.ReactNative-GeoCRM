import React, {useState, useEffect, useMemo} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {showNotification} from '../../../actions/notification.action';
import {Colors, Constants, Fonts, Strings, Values} from '../../../constants';
import {boxShadow, style} from '../../../constants/Styles';

import CCheckBox from '../../common/CCheckBox';
import CTabSelector from '../../common/CTabSelector';
import {Notification} from '../../modal/Notification';
import {SubmitButton} from '../SubmitButton';
import CounterItemList from './components/CounterItemList';
import {constructFormData, getValueFromFormData} from './helper';

const SKUCountForm = props => {
  const dispatch = useDispatch();
  const {item, questionType, formIndex} = props;
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState();
  const [formData, setFormData] = useState({});
  const [categories, setCategories] = useState([]);

  let countStep = 1;
  let countNumberFixed = 0;
  if (questionType == Constants.questionType.FORM_TYPE_SKU_SHELF_SHARE) {
    countStep = 0.1;
    countNumberFixed = 1;
  }
  let countItems = [];
  let isSegmentNotInStore = false;
  if (formData[selectedCategory]) {
    countItems = formData[selectedCategory].competitors;
    isSegmentNotInStore = formData[selectedCategory].noSegment;
  }

  const getCategories = data => {
    if (data && data.categories) {
      return data.categories.map(category => {
        return {
          title: category,
          category: category,
        };
      });
    }
    return [];
  };

  const validateForm = () => {
    const invalidCategories = [];
    for (category in formData) {
      const categoryFormData = formData[category];
      const hasSegment = categoryFormData.competitors.find(x => x.count > 0);
      if (!categoryFormData.noSegment && !hasSegment) {
        invalidCategories.push(category);
      }
    }
    if (invalidCategories.length > 0) {
      const errorMessage = `Please make an input/selection for categories: ${invalidCategories.join(
        ', ',
      )}`;
      dispatch(
        showNotification({
          type: 'error',
          message: errorMessage,
          buttonText: Strings.Ok,
        }),
      );
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    if (!validateForm()) {
      return;
    }
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
    const categories = getCategories(item);
    setCategories(categories);
    if (categories.length > 0) {
      setSelectedTabIndex(0);
      setSelectedCategory(categories[0].category);
    }
  }, [item]);

  const onCounterItemAction = ({type, item, nextCount}) => {
    const _formData = {...formData};
    const _countItems = _formData[selectedCategory].competitors;
    const itemIndex = _countItems.findIndex(x => x.name == item.name);
    if (itemIndex < 0) {
      return false;
    }
    _countItems[itemIndex].count = nextCount;
    setFormData(_formData);
  };

  const setIsSegmentNotInStore = (_category, _value) => {
    const _formData = {...formData};
    if (_formData[_category]) {
      _formData[_category].noSegment = _value;
    }
    setFormData(_formData);
  };

  return (
    <View style={[styles.container, props.style]}>
      <CTabSelector
        items={categories}
        selectedIndex={selectedTabIndex}
        onSelectTab={(item, index) => {
          setSelectedTabIndex(index);
          setSelectedCategory(item.category);
        }}
        containerStyle={[
          boxShadow,
          {
            marginBottom: 0,
            height: 40,
            backgroundColor: 'white',
            borderRadius: 4,
          },
        ]}
      />

      <View style={[style.card, styles.checkBoxContainer]}>
        <Text style={[styles.text, {marginRight: 32}]}>
          {'Segment not in store'}
        </Text>
        <CCheckBox
          value={isSegmentNotInStore}
          onValueChange={value => {
            setIsSegmentNotInStore(selectedCategory, !isSegmentNotInStore);
          }}
        />
      </View>

      {!isSegmentNotInStore && (
        <CounterItemList
          items={countItems}
          step={countStep}
          fixed={countNumberFixed}
          onItemAction={onCounterItemAction}
          style={[style.card, {marginBottom: 0}]}
        />
      )}
      <Notification />
      <SubmitButton
        title={'Submit'}
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

export default SKUCountForm;
