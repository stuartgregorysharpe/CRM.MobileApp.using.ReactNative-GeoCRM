import React, {
  useEffect
} from 'react';
import { 
  SafeAreaView, 
  Text, 
  View, 
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { 
  useSelector, 
  useDispatch 
} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  setWidthBreakpoints,
  parse
} from 'react-native-extended-stylesheet-breakpoints';
import { Card } from 'react-native-paper';

import LocationInfoInput from '../../components/LocationInfoInput';
import { 
  PRIMARY_COLOR, 
  BG_COLOR 
} from '../../constants/Colors';
import FilterButton from '../../components/FilterButton';
import SvgIcon from '../../components/SvgIcon';
import { SLIDE_STATUS } from '../../actions/actionTypes';

const specificInfo = [
  {
    icon: "Person_Sharp",
    title: 'Company & Contacts',
    text: 'View all information ->'
  },
  {
    icon: "File_Earmark_Text_Fill",
    title: 'Forms',
    text: 'Specific to this location ->'
  },
  {
    icon: "ChatBoxes",
    title: 'Activity & Comments',
    text: 'Activity tree ->'
  },
  {
    icon: "Pipeline",
    title: 'Sales Pipeline',
    text: 'Specific to this location ->'
  },
  {
    icon: "Exclamation_Triangle_Fill",
    title: 'Action Items',
    text: 'Specific actions to be addressed ->'
  },
  {
    icon: "Sale",
    title: 'Sales',
    text: 'Quotes, orders and returns ->'
  },
  {
    icon: "Camera",
    title: 'Location Image',
    text: 'Take an image for this location ->'
  },
  {
    icon: "Geo",
    title: 'Geo Location',
    text: 'Update geo co-ordinates ->'
  }
]

export default function LocationSpecificInfoScreen(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({type: SLIDE_STATUS, payload: false});
  });
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <View style={styles.headerBox}>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'}}>
            <View style={styles.headerTitleBox}>
              <View style={styles.subtitleBox}>
                <SvgIcon style={styles.headerIcon} icon="Person_Sharp_White" width='14px' height='14px' />
                <Text style={styles.subtitle}>Customer Name</Text>
              </View>
              <Text style={styles.title}>Best Deal Trading</Text>
            </View>
            <View style={styles.subtitleBox}>
              <SvgIcon style={styles.headerIcon} icon="Insert_Invitation" width='16px' height='16px' />
              <Text style={styles.subtitle}>Last Interaction: 12 June 2021</Text>
            </View>
          </View>
          <View style={styles.headerTitleBox}>
            <View style={styles.subtitleBox}>
              <SvgIcon style={styles.headerIcon} icon="Location_Arrow_White" width='14px' height='14px' />
              <Text style={styles.subtitle}>Address</Text>
            </View>
            <Text style={styles.title}>Century City Cape Town 7441, South Africa, Cape Town Western Cape, 7441, South Africa</Text>
          </View>
          <FilterButton text="Contact: Jack Reacher" />
        </View>
        <LocationInfoInput />
        <View style={styles.cardContainer}>
          {specificInfo.map((info, key) => (
            <Card key={key} style={styles.card}>
              <Card.Content>
                <View style={styles.cardTitleBox}>
                  <SvgIcon style={styles.cardIcon} icon={info.icon} width="15px" height="15px" />
                  <Text style={styles.cardTitle}>{info.title}</Text>
                </View>
                <Text style={styles.cardText}>{info.text}</Text>
              </Card.Content>
            </Card>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.plusButton} onPress={() => props.navigation.navigate("AddLead")}>
        <SvgIcon icon="Round_Btn_Default_Dark" width='70px' height='70px' />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const perWidth = setWidthBreakpoints(850);

const styles = EStyleSheet.create(parse({
  container: {
    backgroundColor: BG_COLOR,
    padding: 10
  },
  headerBox: {
    backgroundColor: PRIMARY_COLOR,
    padding: 10,
    paddingBottom: 0,
    marginBottom: 8
  },
  headerTitleBox: {
    marginBottom: 8
  },
  subtitleBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'left',
    fontFamily: 'Gilroy-Medium',
  },
  dateText: {
    color: '#0AD10A',
    fontFamily: 'Gilroy-Medium',
  },
  title: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Gilroy-Bold',
    lineHeight: 22
  },
  headerIcon: {
    marginRight: 8
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  card: {
    marginBottom: 8,
    width: '48%',
  },
  cardTitleBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  cardIcon: {
    marginRight: 6
  },
  cardTitle: {
    color: '#23282D',
    fontFamily: 'Gilroy-Bold',
  },
  cardTextBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardText: {
    color: '#9D9FA2',
    fontSize: 12,
    fontFamily: 'Product Sans-Regular'
  },
  plusButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    zIndex: 1,
    elevation: 1,
  },
}));