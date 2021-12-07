import React, {
  useEffect
} from 'react';
import { 
  SafeAreaView, 
  Text, 
  View, 
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import { useDispatch } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  setWidthBreakpoints,
  parse
} from 'react-native-extended-stylesheet-breakpoints';

import LocationInfoInput from '../../components/LocationInfoInput';
import { 
  PRIMARY_COLOR, 
  BG_COLOR,
  TEXT_COLOR
} from '../../constants/Colors';
import { boxShadow } from '../../constants/Styles';
import FilterButton from '../../components/FilterButton';
import SvgIcon from '../../components/SvgIcon';
import MarkerIcon from '../../components/Marker';
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
];

const Rectangle = ({style, text, backgroundColor, borderColor, icon}) => (
  <View style={[styles.rectangle, style, {backgroundColor, borderColor}, borderColor ? {borderWidth: 1} : {}]}>
    <Text style={styles.text}>{text}</Text>
    {icon && <MarkerIcon icon={icon} width="20px" height="20px" />}
  </View>
);

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
        <View style={styles.innerContainer}>
          <View style={styles.locationInfoBox}>
            <View style={[styles.cardBox, boxShadow]}>
              <Text style={styles.boldText}>Outcome</Text>
              <View style={{display: 'flex', flexDirection: 'row', position: 'relative'}}>
                <View style={styles.outComeBox}>
                  <Rectangle style={{width: '48%'}} text="DNK Request" icon="Red_X" backgroundColor="#155AA14F" />
                  <Rectangle style={{width: '48%'}} text="Not Interested" icon="Grey_Triangle" backgroundColor="#fff" borderColor="#97ACC2" />
                  <Rectangle style={{width: '48%'}} text="Priority Re-loop" icon="Orange_Star" backgroundColor="#fff" borderColor="#97ACC2" />
                  <Rectangle style={{width: '48%'}} text="Re-loop" icon="Green_Star" backgroundColor="#fff" borderColor="#97ACC2" />
                </View>
                <TouchableOpacity>
                  <Image style={styles.refreshImage} source={require("../../assets/images/Re_Loop_Button.png")} />
                </TouchableOpacity>
              </View>
            </View>
            <LocationInfoInput />
          </View>
          <View style={styles.cardContainer}>
            <View style={[styles.cardBox, boxShadow]}>
              <Text style={styles.boldText}>Stage</Text>
              <Rectangle text="Opportunity" backgroundColor="#15A1234F" />
              <Rectangle text="Contact" backgroundColor="#15A1234F" />
              <Rectangle text="DM" backgroundColor="#155AA14F" />
              <Rectangle text="Presentation" backgroundColor="#fff" borderColor="#97ACC2" />
              <Rectangle style={{marginBottom: 0}} text="Order" backgroundColor="#fff" borderColor="#97ACC2" />
            </View>
            {specificInfo.map((info, key) => (
              <View key={key} style={[styles.card, boxShadow]}>
                <View style={styles.cardTitleBox}>
                  <SvgIcon style={styles.cardIcon} icon={info.icon} width="15px" height="15px" />
                  <Text style={styles.cardTitle}>{info.title}</Text>
                </View>
                <Text style={styles.cardText}>{info.text}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.plusButton}>
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
  innerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: perWidth('row-reverse', 'column')
  },
  locationInfoBox: {
    width: perWidth('63%', '100%')
  },
  cardContainer: {
    width: perWidth('33%', '100%'),
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  cardBox: {
    display: perWidth('flex', 'none'),
    width: '100%',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  boldText: {
    fontSize: 18,
    color: TEXT_COLOR,
    fontFamily: 'Gilroy-Bold',
    marginBottom: 8
  },
  text: {
    fontSize: 16,
    color: TEXT_COLOR,
    fontFamily: 'Gilroy-Medium'
  },
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginBottom: 8,
    width: perWidth('100%', '48%'),
    padding: 12,
    height: 80,
    borderRadius: 10,
  },
  cardTitleBox: {
    display: 'flex',
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  cardIcon: {
    marginRight: 6
  },
  cardTitle: {
    color: TEXT_COLOR,
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
  rectangle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 30,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 7,
    marginBottom: 8,
  },
  refreshImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 68,
    height: 68
  },
  outComeBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginRight: 88,
  }
}));