import {StyleSheet, Platform, Dimensions} from 'react-native';
import Fonts from './Fonts';
import Colors, {whiteLabel} from './Colors';

export const boxShadow = StyleSheet.create({
  shadowColor: '#808080',
  shadowOffset: {width: 0, height: 5},
  shadowOpacity: Platform.OS == 'ios' ? 0.1 : 0.8,
  elevation: 1,
});

export const cardShadow = StyleSheet.create({
  shadowColor: '#808080',
  shadowOffset: {width: 1, height: 1},
  shadowOpacity: Platform.OS === 'android' ? 0.27 : 0.27,
  shadowRadius: Platform.OS === 'android' ? 0.65 : 0.65,
});
export const grayBackground = StyleSheet.create({
  backgroundColor: '#27272778',
  position: 'absolute',
  width: '100%',
  height: '100%',
  zIndex: 1,
  elevation: 1,
});

export const style = StyleSheet.create({
  headerTitle: {
    fontFamily: Fonts.primaryRegular,
    color: whiteLabel().headerText,
    fontSize: 20,
    fontWeight: '400',
    marginLeft: 0,
  },

  headerLeftStyle: {
    backgroundColor: whiteLabel().headerBackground,
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: '100%',
  },

  headerTitleContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  plusButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1,
    elevation: 1,
  },

  innerPlusButton: {},

  scrollTabCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    paddingBottom: 10,
    borderRadius: 7,
    backgroundColor: '#fff',
    marginBottom: 8,
    shadowColor: '#808080',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: Platform.OS == 'ios' ? 0.1 : 0.8,
    elevation: 1,
  },
  cardContainer: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: Platform.OS === 'android' ? 0.27 : 0.27,
    shadowRadius: Platform.OS === 'android' ? 0.65 : 0.65,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 8,
    elevation: 1,
  },
  card: {
    marginBottom: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 6,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: Platform.OS === 'android' ? 0.27 : 0.27,
    shadowRadius: Platform.OS === 'android' ? 0.65 : 0.65,
    zIndex: 2,
  },

  grey_bar: {
    height: 12,
    borderRadius: 10,
    backgroundColor: '#d1d1d1',
    marginTop: 3,
    marginBottom: 3,
    marginRight: 10,
  },
  numberBox: {
    width: 24,
    height: 24,
    backgroundColor: whiteLabel().countBoxBackground,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginRight: 4,
  },

  tip: {
    position: 'absolute',
    width: 20,
    height: 20,
    top: -10,
    backgroundColor: '#DDD',
    transform: [{rotate: '45deg'}],
  },

  triangle: {
    position: 'absolute',
    top: -15,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#DDD',
  },

  compulsoryStyle: {
    borderWidth: 1,
    borderColor: Colors.selectedRedColor,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 0,
    //backgroundColor:'red'
    backgroundColor: '#00000055',
  },
  modalView: {
    bottom: 0,
    width: '100%',
    backgroundColor: Colors.bgColor,
    padding: 10,
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingBottom: Platform.OS === 'ios' ? 30 : 10,
  },

  tabItem: {
    marginHorizontal: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },

  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12,
    //marginBottom: 8
  },
  tabText: {
    fontFamily: Fonts.secondaryMedium,
    fontSize: 16,
    color: Colors.disabledColor,
    borderBottomColor: Colors.disabledColor,
    //borderBottomWidth: 2,
    paddingBottom: 2,
    paddingHorizontal: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  tabActiveText: {
    fontSize: 16,
    color: whiteLabel().activeTabText,
    fontFamily: Fonts.secondaryBold,
    borderBottomColor: whiteLabel().activeTabUnderline,
    paddingBottom: 2,
    paddingHorizontal: 5,
    marginLeft: 5,
    marginRight: 5,
  },

  checkBoxStyle: {
    width: 25,
    height: 25,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: whiteLabel().itemSelectedBackground,
    borderWidth: 1,
    borderColor: whiteLabel().itemSelectedBackground,
  },

  divider:{
    height:1,
    width: '100%',
    backgroundColor:'#eee',        
  },

  buttonText:{
    fontFamily:Fonts.secondaryBold,
    fontSize:16,
    color:whiteLabel().mainText,        
    padding:10
  },  

});
