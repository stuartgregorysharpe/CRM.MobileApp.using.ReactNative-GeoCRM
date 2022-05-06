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

const SKUCountForm = props => {
  const {item} = props;
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState();
  const [isSegmentNotInStore, setIsSegmentNotInStore] = useState(false);
  const [countItems, setCountItems] = useState([]);
  const data = item;
  const categories = data.categories.map(category => {
    return {
      title: category,
      category: category,
    };
  });
  const onButtonAction = actionType => {
    if (props.onButtonAction) {
      props.onButtonAction({type: actionType});
    }
  };
  useEffect(() => {
    setCountItems(constructCountItems());
  }, [selectedCategory, item]);

  const constructCountItems = () => {
    const items = [];
    items.push({
      name: data.brand,
      count: 0,
    });
    if (data.competitors && data.competitors[selectedCategory]) {
      const competitors = data.competitors[selectedCategory];
      competitors.forEach(item => {
        items.push({
          name: item,
          count: 0,
        });
      });
    }
    return items;
  };
  const onCounterItemAction = ({type, item}) => {
    const _countItems = [...countItems];
    const itemIndex = _countItems.findIndex(x => x.name == item.name);
    if (itemIndex >= 0) {
      if (type == Constants.actionType.ACTION_COUNT_MINUS) {
        _countItems[itemIndex].count -= 1;
        if (_countItems[itemIndex].count < 0) {
          _countItems[itemIndex].count = 0;
        }
      } else {
        _countItems[itemIndex].count += 1;
      }
      setCountItems(_countItems);
    }
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
            setIsSegmentNotInStore(!isSegmentNotInStore);
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
          onButtonAction(Constants.actionType.ACTION_FORM_SUBMIT);
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
