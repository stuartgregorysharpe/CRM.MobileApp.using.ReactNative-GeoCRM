import { View, Text ,SectionList ,TouchableOpacity ,StyleSheet , Dimensions } from 'react-native'
import React from 'react'
import SvgIcon from '../../../../../components/SvgIcon';
import { style } from '../../../../../constants/Styles';
import { whiteLabel } from '../../../../../constants/Colors';
import { Fonts } from '../../../../../constants';

export default function Contacts(props) {

  const { contacts} = props;

  const renderContactItem = (item, index, tabIndex) => {
    return (
      <TouchableOpacity
        onPress={() => {
          // setSelectedContact(item);
          // setPageType('update');
          // animation('addcontact');
        }}>
        <View
          style={[
            styles.contactItemContainer,
            {
              borderColor:
                item.primary_contact === '1'
                  ? whiteLabel().headerBackground
                  : Colors.whiteColor,
            },
          ]}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                fontSize: 15,
                fontFamily: Fonts.secondaryBold,
                color: Colors.textColor,
              }}>
              {item.contact_name}
            </Text>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tel:${item.contact_cell}`);
              }}>
              <Text
                style={{
                  fontFamily: Fonts.secondaryMedium,
                  color: whiteLabel().headerBackground,
                  fontSize: 15,
                  textDecorationLine: 'underline',
                }}>
                {phoneNumberReformat(item.contact_cell)}
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontFamily: Fonts.secondaryRegular,
              color: whiteLabel().subText,
            }}>
            {item.contact_email}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (        
    <View style={{flex: 1, marginBottom: 60, marginHorizontal:10}}>
        <SectionList
          keyExtractor={(item, index) => index.toString()}
          sections={contacts}
          renderItem={({item, index}) => {
            return renderContactItem(item, index, tabIndex);
          }}
          renderSectionHeader={({section}) => {
            // console.log(section);
            return (
              <View style={{marginTop: 10}}>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: Fonts.secondaryMedium,
                    color: whiteLabel().headerBackground,
                  }}>
                  {section.title}
                </Text>
                <View
                  style={{
                    height: 2,
                    backgroundColor: whiteLabel().headerBackground,
                    marginVertical: 5,
                  }}
                />
              </View>
            );
          }}
        />


        <View style={styles.plusButtonContainer}>
          <TouchableOpacity
            style={style.innerPlusButton}
            onPress={() => {
              setPageType('add');
              setSelectedContact(null);
              animation('addcontact');
            }}>
            <SvgIcon icon="Round_Btn_Default_Dark" width="70px" height="70px" />            
          </TouchableOpacity>
        </View>
      </View>

  )
}

const styles = StyleSheet.create({
  
  plusButtonContainer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: Dimensions.get('window').height * 0.02,
    right: 20,
    zIndex: 1,
    elevation: 1,
  },
  
});
