import React from 'react';
import {StyleSheet, View} from 'react-native';
import SvgIcon from '../SvgIcon';
import CImage from './CImage';
const CAvatar = props => {
  const size = props.size || 30;
  const svgIcon = props.svgIcon || 'Avatar_Placeholder';
  const sizeInPixel = size + 'px';
  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        props.style,
      ]}>
      {props.url ? (
        <CImage imgUrl={props.url} style={styles.avatarImage} />
      ) : (
        <SvgIcon icon={svgIcon} width={sizeInPixel} height={sizeInPixel} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 16,
    height: 16,
    overflow: 'hidden',
    borderRadius: 8,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
});

export default CAvatar;
