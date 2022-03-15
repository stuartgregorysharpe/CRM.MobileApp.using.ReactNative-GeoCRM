import { StyleSheet , Platform, Dimensions} from "react-native";
import Fonts from "./Fonts";
import Colors, { BG_COLOR, PRIMARY_COLOR, whiteLabel } from "./Colors";

export const boxShadow = StyleSheet.create({
  shadowColor: '#808080',
  shadowOffset: { width: 0, height: 5 },
  shadowOpacity: Platform.OS == 'ios' ? 0.1 : 0.8,
  elevation: 1,
});

export const grayBackground = StyleSheet.create({
  backgroundColor: '#27272778',
  position: 'absolute',
  width: '100%',
  height: '100%',
  zIndex: 1,
  elevation: 1
});

export const style = StyleSheet.create({

  headerTitle: {
    fontFamily:Fonts.primaryRegular, 
    color: whiteLabel().headerText , 
    fontSize:20 , 
    fontWeight:"400",
    marginLeft:0,        
  },
  

  headerLeftStyle: {
    backgroundColor: whiteLabel().headerBackground,
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: '100%'
  },

  headerTitleContainerStyle: {        
    flexDirection:'row',    
    justifyContent:'flex-start',
    alignItems:'center',    
  },

  plusButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1,
    elevation: 1,
  },
  
  innerPlusButton: {          

  },

  // card:{
  //   flex:1, 
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   backgroundColor: '#fff',
  //   paddingLeft: 12,
  //   paddingRight: 12,
  //   borderRadius: 7,
  //   marginBottom: 10
  // },
  card: {    
    marginBottom: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 4,
    padding: 8,        
    shadowColor:'#000',
    shadowOffset:{ width: 1,  height: 1 },
    shadowOpacity: Platform.OS === 'android' ? 0.27 : 0.27,
    shadowRadius:Platform.OS === 'android' ? 0.65 : 0.65,     
    zIndex: 2,
    
  },

  grey_bar: {    
    height: 12,
    borderRadius: 10,
    backgroundColor: '#d1d1d1',
    marginTop:3,
    marginBottom:3,
    marginRight:10,
  },
  numberBox: {
    width: 24,
    height: 24,
    backgroundColor: whiteLabel().countBoxBackground,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginRight: 4
  },
  

  tip:{
    position:'absolute',
    width:20,
    height:20,
    top:-10,
    backgroundColor:'#DDD',    
    transform: [{ rotate: '45deg'}]
  },  

  triangle: {
    position:'absolute',
    top:-15,
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#DDD",
  },

  compulsoryStyle:{
    borderWidth:1,
    borderColor:Colors.selectedRedColor
  }

  

})


