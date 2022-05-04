import CheckBox from '@react-native-community/checkbox';
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Colors, Fonts, Values} from '../../../constants';
import {style} from '../../../constants/Styles';
import CardView from '../../common/CardView';
import CCheckBox from '../../common/CCheckBox';
import CTabSelector from '../../common/CTabSelector';
import dummyData from './dummyData.json';
const SKUCountForm = props => {
  const {item} = props;
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState();
  const [isSegmentNotInStore, setIsSegmentNotInStore] = useState(false);
  const categories = dummyData.categories.map(category => {
    return {
      title: category,
      category: category,
    };
  });
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
});

export default SKUCountForm;
