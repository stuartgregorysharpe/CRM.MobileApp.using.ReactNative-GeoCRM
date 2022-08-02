import { View, Text, TouchableOpacity , StyleSheet } from 'react-native'
import React , {useState , useEffect} from 'react'
import { Colors, Constants, Fonts } from '../../../constants';
import { whiteLabel } from '../../../constants/Colors';
import { AppText } from '../../../components/common/AppText';
import SvgIcon from '../../SvgIcon';
import DropdownLists from './DropdownLists';
import { style } from '../../../constants/Styles';

export default function TieredMultipleChoiceInput(props) {

  const { header, hasError, selectedItem, lists , onItemSelected } = props;   
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    let isMount = true;
    if(isMount && lists.length == 0){
      setIsShown(false)
    }
    return () => {
      isMount = false;
    };
  }, [lists])

  return (
    <View>
        <AppText title={header} size="medium" type="secondaryBold" color={whiteLabel().mainText} style={{marginBottom:5}} ></AppText>

        <View style={[style.card, {alignItems:'flex-start', flexDirection:'column' , borderWidth: hasError? 1 : 0, borderColor: hasError ? Colors.redColor : '' }]}>

            {
                !isShown && 
                <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}} onPress={() => {
                    if(lists && lists.length > 0){
                      setIsShown(!isShown);
                    }
                  }}>                
                        <View style={{flex:1}}>
                          <View style={{flexDirection:'row'}}>
                            {
                              !(selectedItem && selectedItem != undefined) &&
                              <AppText style={{flex:1}} title={"Please select"} size="medium" type="secondaryMedium" color={lists && lists.length > 0 ? Colors.blackColor : Colors.disabledColor }  ></AppText>                                   
                            }                    
                          </View>
                          {
                            selectedItem && selectedItem != undefined &&
                            <AppText title={selectedItem != null ? selectedItem.label: ''} size="medium" color={Colors.mainText} ></AppText> 
                          }              
                        </View>
                                      
                      <View style={{marginRight: 10}}>
                        <SvgIcon icon={"Drop_Down"} width="23px" height="23px" />
                      </View>
                </TouchableOpacity>

            }
            
            {
              isShown && 
              <DropdownLists
                onItemSelected={(item) => {                  
                  onItemSelected(item);  
                  setIsShown(!isShown);
                }}
                lists = {lists}>
              </DropdownLists>
            }              
        </View>
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
