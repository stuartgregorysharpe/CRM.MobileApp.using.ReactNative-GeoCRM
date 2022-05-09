import CheckBox from '@react-native-community/checkbox';
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Colors, Constants, Fonts, Values} from '../../../constants';
import {style} from '../../../constants/Styles';
import CardView from '../../common/CardView';
import CCheckBox from '../../common/CCheckBox';
import CTabSelector from '../../common/CTabSelector';
import {SubmitButton} from '../SubmitButton';
import CounterItemList from './components/CounterItemList';
import {constructFormData, getValueFromFormData} from './helper';

const SKUCountForm = props => {
  const {item} = props;
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState();
  const [formData, setFormData] = useState({});
  let countItems = [];
  let isSegmentNotInStore = false;
  if (formData[selectedCategory]) {
    countItems = formData[selectedCategory].competitors;
    isSegmentNotInStore = formData[selectedCategory].noSegment;
  }
  const data = item;
  const categories = data.categories.map(category => {
    return {
      title: category,
      category: category,
    };
  });
  const onSubmit = () => {
    const submitValueData = getValueFromFormData(formData, item);
    if (props.onButtonAction) {
      props.onButtonAction({
        type: Constants.actionType.ACTION_FORM_SUBMIT,
        value: submitValueData,
      });
    }
  };
  useEffect(() => {}, [selectedCategory, item]);
  useEffect(() => {
    const formData = constructFormData(item);
    setFormData(formData);
    if (categories.length > 0) {
      setSelectedTabIndex(0);
      setSelectedCategory(categories[0].category);
    }
  }, [item]);

  const onCounterItemAction = ({type, item}) => {
    const _formData = {...formData};
    const _countItems = _formData[selectedCategory].competitors;
    const itemIndex = _countItems.findIndex(x => x.name == item.name);
    if (itemIndex < 0) {
      return false;
    }
    if (type == Constants.actionType.ACTION_COUNT_MINUS) {
      _countItems[itemIndex].count -= 1;
      if (_countItems[itemIndex].count < 0) {
        _countItems[itemIndex].count = 0;
      }
    } else {
      _countItems[itemIndex].count += 1;
    }
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
      <CardView>
        <CTabSelector
          items={categories}
          selectedIndex={selectedTabIndex}
          onSelectTab={(item, index) => {
            setSelectedTabIndex(index);
            setSelectedCategory(item.category);
          }}
        />
      </CardView>
      <CardView style={styles.checkBoxContainer}>
        <Text style={[styles.text, {marginRight: 32}]}>
          {'Segment not in store'}
        </Text>
        <CCheckBox
          value={isSegmentNotInStore}
          onValueChange={value => {
            setIsSegmentNotInStore(selectedCategory, !isSegmentNotInStore);
          }}
        />
      </CardView>
      <CardView style={styles.boxContainer}>
        <CounterItemList
          items={countItems}
          onItemAction={onCounterItemAction}
        />
      </CardView>
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
    paddingHorizontal: 8,
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
