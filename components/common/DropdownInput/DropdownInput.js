import { View, Text, TouchableOpacity , StyleSheet } from 'react-native'
import React , {useState} from 'react'
import { Colors, Fonts } from '../../../constants';
import { whiteLabel } from '../../../constants/Colors';
import { AppText } from '../../../components/common/AppText';
import SvgIcon from '../../SvgIcon';
import DropdownLists from './DropdownLists';

export default function DropdownInput(props) {

  const { title , lists , onItemSelected } = props; 
  const [visibleTitle,setVisibleTitle] = useState(title);
  const [isShown, setIsShown] = useState(false);
  
  return (
    <View style={styles.container}>
        <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}} onPress={() => {
          setIsShown(!isShown);
        }}>
            <View style={{flex:1}}>
              <AppText title={visibleTitle} size="medium" ></AppText>
            </View>
            <View style={{marginRight: 10}}>
              <SvgIcon icon={"Drop_Down"} width="23px" height="23px" />
            </View>
        </TouchableOpacity>

        {
          isShown && 
          <DropdownLists
            onItemSelected={(item) => {
              setVisibleTitle(item.description);
              onItemSelected(item);              
              setIsShown(!isShown);
            }}
            lists = {lists}>
          </DropdownLists>
        }                
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop:5,              
    lineHeight: 30,
    backgroundColor: Colors.bgColor,
    borderColor: whiteLabel().fieldBorder,
    fontFamily: Fonts.primaryRegular,
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 10,
    paddingTop: 7,
    paddingBottom:7,
    flexDirection: 'column',
    flex:1,    
  },
})
