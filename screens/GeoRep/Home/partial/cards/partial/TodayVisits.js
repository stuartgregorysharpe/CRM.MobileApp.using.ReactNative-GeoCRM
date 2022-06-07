
import { View, Text ,FlatList, Dimensions } from 'react-native'
import React , {useState} from 'react'
import ProgressBar from '../../ProgressBar'
import CircularProgress from 'react-native-circular-progress-indicator';
import Colors, { whiteLabel } from '../../../../../../constants/Colors';
import { AppText } from '../../../../../../components/common/AppText';
import VisitCheckinItem from '../components/VisitCheckinItem';
import { ScrollView } from 'react-native-gesture-handler';
import Legend from '../../../../../../components/common/Legend';

export default function TodayVisits(props) {

    const {today} = props;

    const barTypes = [
        {color:whiteLabel().graphs.primary, name:'Completed'} ,
        {color:whiteLabel().graphs.color_1, name:'Additional'} ,
        {color:whiteLabel().graphs.color_3, name:'Remaining'}  ,        
    ];
    const colors = [whiteLabel().graphs.primary, whiteLabel().graphs.color_1, whiteLabel().graphs.color_3];
    const [checkinLists, setCheckinLists] = useState(today.next_calls);
    const renderSeparator = () => (
        <View
          style={{
            backgroundColor: '#70707045',
            height: 0.5,
          }}
        />
    );

    const renderCheckin = (item, index) => {
        return (
            <VisitCheckinItem item={item} key={index}></VisitCheckinItem>
        )
    }
    
  return (
    <View style={{ flexDirection:'column' }}>              
        <View style={{flexDirection:'row', alignItems:'center' ,  marginHorizontal:10}}>            
            
            <View style={{marginBottom:10, flex:1 , marginRight:10 }}>
                <ProgressBar colors={colors} steps={[parseInt(today.completed), parseInt(today.additional), parseInt(today.remaining)]} height={25} ></ProgressBar> 
            </View>
                                       
            <View style={{flexDirection:'column' , alignItems:'center' , marginTop:-30}}>
                <AppText color={whiteLabel().mainText} style={{marginBottom:5, marginTop:0}} title="Strike Rate"></AppText>
                <CircularProgress
                    radius={Dimensions.get("window").width * 0.105}
                    //radius={40}
                    value={today.strike_rate}
                    valueSuffix='%'
                    progressValueStyle={{fontSize:14}}                    
                    activeStrokeWidth={12}
                    progressValueColor={whiteLabel().graphs.primary}              
                    activeStrokeColor={whiteLabel().graphs.primary}                    
                />
            </View>
        </View>
       
        <Legend types={barTypes} ></Legend>

        <View style={{ marginTop:10, marginHorizontal:10}}>
            {
                checkinLists.map((item, index) => {
                    return renderCheckin(item, index);
                })
            }
          
        </View>

        
    </View>
  )
}