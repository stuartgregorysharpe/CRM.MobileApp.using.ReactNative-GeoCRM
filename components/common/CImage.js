import React from 'react';
import {Image} from 'react-native';
import {Images} from '../../constants';
const CImage = props => {
  const getSource = () => {
    if (props.imgUrl) {
      if (props.imgUrl.startsWith('Local:')) {
        const name = props.imgUrl.substring(6);
        return Images[name];
      } else {
        return {uri: props.imgUrl};
      }
    } else if (props.source) {
      return props.source;
    }
    return null;
  };

  return <Image {...props} source={getSource()} />;
};

export default CImage;
