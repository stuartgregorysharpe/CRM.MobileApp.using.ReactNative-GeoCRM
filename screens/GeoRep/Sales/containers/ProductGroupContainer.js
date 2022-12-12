import {View, BackHandler, Dimensions, Keyboard} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Constants, Values} from '../../../../constants';
import ProductGroupView from '../components/ProductGroupView';

const ProductGroupContainer = props => {
  useEffect(() => {}, []);
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
  const onSaveProduct = data => {
    props.onButtonAction({
      type: Constants.actionType.ACTION_CLOSE,
      value: data,
    });
  };

  return (
    <View
      style={{
        alignSelf: 'stretch',
        marginHorizontal: 5,
        marginTop: 10,
        maxHeight: isKeyboardVisible
          ? Values.deviceHeight * 0.5
          : Values.deviceHeight * 0.8,
      }}>
      <ProductGroupView onSaveProduct={onSaveProduct} {...props} />
    </View>
  );
};
export default ProductGroupContainer;
