import React, {useEffect} from 'react';
import { 
  SafeAreaView, 
  Text, 
  View, 
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import { Card } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import LocationInfoInput from '../../components/LocationInfoInput';
import { PRIMARY_COLOR, BG_COLOR } from '../../constants/Colors';
import FilterButton from '../../components/FilterButton';

const specificInfo = [
  {
    icon: require('../../assets/images/person_sharp.png'),
    title: 'Company & Contacts',
    text: 'View all information ->'
  },
  {
    icon: require('../../assets/images/file_earmark_text_fill.png'),
    title: 'Forms',
    text: 'Specific to this location ->'
  },
  {
    icon: require('../../assets/images/chatboxes.png'),
    title: 'Activity & Comments',
    text: 'Activity tree ->'
  },
  {
    icon: require('../../assets/images/filter_list_black.png'),
    title: 'Sales Pipeline',
    text: 'Specific to this location ->'
  },
  {
    icon: require('../../assets/images/exclamation_triangle_fill.png'),
    title: 'Action Items',
    text: 'Specific actions to be addressed ->'
  },
  {
    icon: require('../../assets/images/sale.png'),
    title: 'Sales',
    text: 'Quotes, orders and returns ->'
  },
  {
    icon: require('../../assets/images/camera.png'),
    title: 'Location Image',
    text: 'Take an image for this location ->'
  },
  {
    icon: require('../../assets/images/geo.png'),
    title: 'Geo Location',
    text: 'Update geo co-ordinates ->'
  }
]

export default function LocationSpecificInfoScreen(props) {
  useEffect(() => {
    props.screenProps.setOptions({
      tabBarStyle: {
        display: 'flex',
        height: 60,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#fff",
      },
    });
  })
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <View style={styles.headerBox}>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'}}>
            <View style={styles.headerTitleBox}>
              <View style={styles.subtitleBox}>
                <FontAwesomeIcon style={styles.headerIcon} color="#fff" size={12} icon={faUser} />
                <Text style={styles.subtitle}>Customer Name</Text>
              </View>
              <Text style={styles.title}>Best Deal Trading</Text>
            </View>
            <View style={styles.subtitleBox}>
              <FontAwesomeIcon style={styles.headerIcon} color="#fff" size={12} icon={faUser} />
              <Text style={styles.subtitle}>Last Interaction: 12 June 2021</Text>
            </View>
          </View>
          <View style={styles.headerTitleBox}>
            <View style={styles.subtitleBox}>
              <FontAwesomeIcon style={styles.headerIcon} color="#fff" size={12} icon={faUser} />
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
                  <Image style={styles.cardIcon} source={info.icon} />
                  <Text style={styles.cardTitle}>{info.title}</Text>
                </View>
                <Text style={styles.cardText}>{info.text}</Text>
              </Card.Content>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: BG_COLOR,
    padding: 10
  },
  headerBox: {
    backgroundColor: PRIMARY_COLOR,
    padding: 8,
    marginBottom: 10
  },
  headerTitleBox: {
    marginBottom: 16
  },
  subtitleBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#fff',
    textAlign: 'left',
    fontFamily: 'Gilroy-Medium',
  },
  dateText: {
    color: '#0AD10A',
    fontFamily: 'Gilroy-Medium',
  },
  title: {
    fontSize: 16,
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
    marginBottom: 10,
    width: '48%'
  },
  cardTitleBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  cardIcon: {
    width: 16,
    height: 16,
    marginRight: 8
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
  }
})