import {View, Keyboard} from 'react-native';
import React, { useRef , useState, useEffect} from 'react';
import {Constants, Values} from '../../../../constants';
import ProductGroupView from '../components/ProductGroupView';
import ProductDetailsModal from '../modal/ProductDetailsModal';

const ProductGroupContainer = props => {
  
  const { settings } = props;
  
  const productDetailsModalRef = useRef();
  const [product, setProduct] = useState();
  const [ productDetailTitle , setProductDetailTitle] = useState();

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
      <ProductGroupView 
        openProductDetail={(item) => {
          console.log("open" ,item)
          setProductDetailTitle(item.product_name);
          setProduct(item);
          if (productDetailsModalRef.current)
            productDetailsModalRef.current.showModal();
        }}
        onSaveProduct={onSaveProduct} {...props} />

      <ProductDetailsModal
        title={productDetailTitle}
        product={product}
        settings={settings}
        onButtonAction={({type, value}) => {          
          if (type === Constants.actionType.ACTION_DONE && productDetailsModalRef.current)
            productDetailsModalRef.current.hideModal();
          if(props.onProductDetailsModalClosed){
            props.onProductDetailsModalClosed({type, value});
          }
        }}
        ref={productDetailsModalRef}
      />

    </View>
  );
};
export default ProductGroupContainer;
