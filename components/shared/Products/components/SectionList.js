import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, Dimensions, Keyboard} from 'react-native';
import {Constants} from '../../../../constants';
import SelectItem from './SelectItem';

const SectionList = props => {
  const {questionType, productIssue, selectedLists, sections, checkedItemIds} =
    props;
  const height = Dimensions.get('screen').height;
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  if (!sections) return null;

  const isChecked = product_id => {
    if (questionType == Constants.questionType.FORM_TYPE_PRODUCT_ISSUES) {
      var tmp = selectedLists.filter(item => {
        if (
          item.productIssue == productIssue &&
          item.product_id == product_id
        ) {
          return true;
        }
        return false;
      });
      console.log('selectedLists', tmp);
      if (tmp != null && tmp != undefined && tmp.length != 0) {
        return true;
      }
      return false;
    } else {
      if (checkedItemIds.includes(product_id)) {
        return true;
      }
      return false;
    }
  };

  const renderItem = (item, index) => {
    return (
      <SelectItem
        item={item}
        key={index + 'section'}
        index={index}
        isChecked={isChecked(item.product_id)}
        checkedItemIds={checkedItemIds}
        onItemAction={props.onItemAction}
      />
    );
  };

  return (
    <View
      style={[
        styles.container,
        props.style,
        {height: isKeyboardVisible ? height * 0.2 : height * 0.32},
      ]}>
      <FlatList
        data={sections}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => renderItem(item, index)}
        keyExtractor={(item, index) => index.toString()}
        extraData={this.props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flexDirection: 'column',
    height: Dimensions.get('screen').height * 0.32,
  },
});

export default SectionList;
