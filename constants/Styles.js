import { StyleSheet , Platform, Dimensions} from "react-native";
import Fonts from "./Fonts";
import { BG_COLOR, PRIMARY_COLOR } from "./Colors";

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
    color:"#FFF" , 
    fontSize:20 , 
    fontWeight:"400",
    marginLeft:0,        
  },
  

  headerLeftStyle: {
    backgroundColor: PRIMARY_COLOR,
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

  
})


