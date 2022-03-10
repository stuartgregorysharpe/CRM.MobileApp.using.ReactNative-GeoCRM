// @flow
import { Platform } from "react-native"

var ios = {
  primaryLight: 'Product Sans Light',
  primaryRegular: 'Product Sans',
  primaryRegularItalic: 'Product Sans Regular Italic',
  primaryMedium: 'Product Sans',
  primaryMediumItalic: 'Product Sans Medium Italic',
  primaryBold: 'ProductSans-Bold',
  primaryBoldItalic: 'Product Sans Bold Italic',

  secondaryRegular: 'Gilroy-Regular',
  secondaryMedium: 'Gilroy-Medium',
  secondaryBold: 'Gilroy-Bold',

}

var android = {
  primaryLight: 'Product Sans Light',
  primaryRegular: 'Product Sans',
  primaryRegularItalic: 'Product Sans Regular Italic',
  primaryMedium: 'Product Sans',
  primaryMediumItalic: 'Product Sans Medium Italic',
  primaryBold: 'Product Sans Bold',
  primaryBoldItalic: 'Product Sans Bold Italic',
  
  secondaryRegular: 'Gilroy-Regular',
  secondaryMedium: 'Gilroy-Medium',
  secondaryBold: 'Gilroy-Bold',
}


export default  Platform.OS == 'ios' ? ios : android
