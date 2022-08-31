import { View, ActivityIndicator , TouchableOpacity , StyleSheet } from 'react-native'
import React , {useState , useRef} from 'react'
import OfflineSyncLists from './OfflineSyncLists';
import SvgIcon from '../../../../../../components/SvgIcon';
import { AppText } from '../../../../../../components/common/AppText';
import { whiteLabel } from '../../../../../../constants/Colors';
import { style } from '../../../../../../constants/Styles';
import { Colors, Constants, Fonts } from '../../../../../../constants';
import { white } from 'react-native-paper/lib/typescript/styles/colors';
import { CHorizontalProgressBar } from '../../../../../../components/common/CHorizontalProgressBar';
import ErrorRefresh from './ErrorRefresh';


export default function OfflineSyncType(props) {

  const { lists , onItemSelected , item } = props; 
  const { isStart, isSynced, isError,  label } = item; 
  const [isShown, setIsShown] = useState(false);  
  const progressRef = useRef();

  return (
    <View style={[style.card]}>

        <View style={styles.container}>

            <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}} onPress={() => {
              if(!isSynced){
                setIsShown(!isShown);
              }
              
            }}>
                <View style={{flex:1}}>
                  <View style={{flexDirection:'row'}}>
                    <AppText style={{flex:1}} title={label} size="medium" type="secondaryBold" color={whiteLabel().mainText}  ></AppText>                  
                    <AppText style={{flex:1}} title={ isSynced ? '21 April 2022 22:33' : !isStart ? 'Pendding..' : ''} size="small" type="secondaryMedium" color={Colors.greyColor}  ></AppText>                                
                  </View>        
                </View>
                
                {
                  isSynced && <SvgIcon icon={ "Check_Circle"} width="23px" height="23px" style={{marginRight:10}} /> 
                }

                {
                  !isSynced && !isStart &&
                  <View style={{marginRight: 10 , flexDirection:'row' , alignItems:'center'}}>
                    {
                      !isError ?
                      <View style={{marginRight:10, borderRadius:20, borderWidth:1, borderColor:whiteLabel().borderColor , width:22,height:22 , justifyContent:'center', alignItems:'center'}}>
                        <AppText title="4" color={whiteLabel().mainText} />
                      </View> :
                      <ErrorRefresh />
                    }                
                    <SvgIcon icon={ isShown ?  "Drop_Up" : "Drop_Down"} width="23px" height="23px" />              
                  </View>
                }

                {
                  isStart &&
                  <ActivityIndicator size="small" color={whiteLabel().actionFullButtonBackground} style={{marginRight:12}} />
                }
                
            </TouchableOpacity>
                  
            {
              isStart && <CHorizontalProgressBar ref={progressRef} isStart={isStart} title={ "1/2 Items Synced"} />
            }
            
            {
              isShown && 
              <OfflineSyncLists
                onItemSelected={(item) => {                            
                  onItemSelected(item);
                  setIsShown(!isShown);
                }}
                lists = {lists}>
              </OfflineSyncLists>
            }                
        </View>                    
    </View>
  )
}

const styles = StyleSheet.create({
  container: {  
    lineHeight: 30,      
    borderColor: whiteLabel().fieldBorder,
    fontFamily: Fonts.primaryRegular,    
    borderRadius: 4,
    paddingLeft: 5,
    paddingTop: 3,
    paddingBottom:3,
    flexDirection: 'column',
    flex:1,    
  },
})
