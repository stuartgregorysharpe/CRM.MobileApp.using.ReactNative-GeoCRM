import { View, Text ,SectionList ,TouchableOpacity ,StyleSheet , Dimensions ,Linking} from 'react-native'
import React , { useRef , useState, useEffect  } from 'react'
import SvgIcon from '../../../../../components/SvgIcon';
import { style } from '../../../../../constants/Styles';
import  Colors, { whiteLabel } from '../../../../../constants/Colors';
import { Constants, Fonts } from '../../../../../constants';
import AddContactModal from '../modal/AddContactModal';

export default function Contacts(props) {

  const { contacts , locationId , updateContacts} = props;
  const addContactModalRef = useRef(null);
  const [pageType , setPageType] = useState("");
  const [contactInfo, setContactInfo] = useState("");

  useEffect(() => {    
  }, [pageType])

  const renderContactItem = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => {          
          setPageType("update");
          
          console.log("contact info item", item);

          setContactInfo(item);
          if(addContactModalRef.current){
            addContactModalRef.current.showModal();
          }

        }}>
        <View style={[style.card, {flexDirection:'row'}]}>

          <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
            <Text
              style={{ fontSize: 15, fontFamily: Fonts.secondaryMedium, color: Colors.textColor, }}>
              {item.contact_name}
            </Text>
            
            <Text style={{ fontFamily: Fonts.secondaryRegular, color: whiteLabel().subText }}>
              {item.contact_email}
            </Text>
            
          </View>

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
                {item.contact_cell}
              </Text>
          </TouchableOpacity>

        
          
        </View>
      </TouchableOpacity>
    );
  };


  const addContactModalClosed = ({type, value}) => {

    console.log("triggerdddd", type, value)
    if(type === Constants.actionType.ACTION_CLOSE){      

      updateContacts();
      if(addContactModalRef.current){
        addContactModalRef.current.hideModal();
      }      
    }
  }

  return (        
    <View style={{flex: 1, marginBottom: 60, marginHorizontal:10}}>
        <SectionList
          keyExtractor={(item, index) => index.toString()}
          sections={contacts}
          renderItem={({item, index}) => {
            return renderContactItem(item, index);
          }}
          renderSectionHeader={({section}) => {            
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
              setPageType("add");
              if(addContactModalRef.current){
                addContactModalRef.current.showModal();
              }
            }}>
            <SvgIcon icon="Round_Btn_Default_Dark" width="70px" height="70px" />            
          </TouchableOpacity>
        </View>

        <AddContactModal
            ref={addContactModalRef}
            title= {pageType == 'add' ? 'Add Contact' : 'Update Contact'}
            pageType={pageType}
            locationId={locationId}
            contactInfo={contactInfo}
            onButtonAction={addContactModalClosed}
          />

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
