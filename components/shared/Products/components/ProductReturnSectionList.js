import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, Dimensions, Keyboard} from 'react-native';
import {Constants} from '../../../../constants';
import ProductReturnSelectItem from './ProductReturnSelectItem';
import SelectItem from './SelectItem';

const ProductReturnSectionList = props => {
  const {questionType, productReturn, selectedLists, sections, checkedItemIds} =
    props;
  const height = Dimensions.get('screen').height;
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  console.log('selectedLists', selectedLists);

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

  const getCount = product_id => {
    if (questionType == Constants.questionType.FORM_TYPE_PRODUCT_RETURN) {
      var tmp = selectedLists.find(item => {
        if (
          item.productReturn === productReturn &&
          item.product_id === product_id
        ) {
          return true;
        }
        return false;
      });

      console.log('selectedLists', tmp);
      if (tmp === undefined) {
        return '';
      } else {
        return tmp.value;
      }

      return 0;

      // if(tmp != null && tmp != undefined && tmp.length != 0){
      //   return true;
      // }
      return false;
    } else {
      // if(checkedItemIds.includes(product_id)){
      //   return true;
      // }
      // return false;
    }
  };

  const updateCount = (count, item, index) => {
    console.log('count', count);
  };

  const renderItem = (item, index) => {
    return (
      <ProductReturnSelectItem
        item={item}
        key={index + 'section'}
        index={index}
        count={getCount(item.product_id)}
        checkedItemIds={checkedItemIds}
        onCount={count => {
          updateCount(count, item, index);
        }}
        onItemChanged={props.onItemChanged}
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
        removeClippedSubviews={false}
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

export default ProductReturnSectionList;
