
import { View , StyleSheet, Dimensions } from 'react-native'
import React , {useEffect, useState , useRef} from 'react'
import PagerView from 'react-native-pager-view';
import { TopTab } from '../../../../../components/common/TopTab';
import Customer from '../components/Customer';
import Contacts from '../components/Contacts';
import { getApiRequest } from '../../../../../actions/api.action';
import { useDispatch } from 'react-redux';
import { expireToken } from '../../../../../constants/Helper';
import { GetRequestLocationFieldsDAO } from '../../../../../DAO';

export default function CustomerContactContainer(props) {
      
    const { locationId } = props;
    const [tabIndex , setTabIndex] = useState(0);
    const headers = ["Customer", "Contacts"];
    const refPagerView = useRef();
    const [locationFields, setLocationFields] = useState([]);
    const [contacts, setContacts] = useState([]);
    const dispatch = useDispatch()

    useEffect(() => {        
        if(tabIndex == 0){
            getCustomerInfo();  
        }else {
            getContactsInfo()
        }
    }, [tabIndex]);

    const getCustomerInfo = () => {

        var params = {location_id: locationId};

        GetRequestLocationFieldsDAO.find(params).then((res) => {
            console.log("res.custom_master_fields " , res.custom_master_fields);
            setLocationFields(res.custom_master_fields);
        }).catch((e) => {
            console.log("e",e)
            expireToken(dispatch , e);
        });
              

    }

    const getContactsInfo = () => {
        var params = {location_id: locationId};
        getApiRequest("locations/location-contacts" , params).then((res) => {            
            prepareContactsList(res.contacts);
        }).catch((e) => {
            expireToken(dispatch , e);
        })
    }

    const changePage = (nativeEvent) => {
        setTabIndex(nativeEvent.position);
    }
    
    const prepareContactsList = res => {        
        let data = [];
        data = res;
        let primaryContacts = data.filter(x => x.primary_contact === '1');
        let additionalContacts = data.filter(x => x.primary_contact !== '1');
    
        let requiredList = [];
        requiredList.push({
          title: 'Primary Contacts',
          data: primaryContacts,
        });
    
        requiredList.push({
          title: 'Additional Contacts',
          data: additionalContacts,
        });            
        setContacts([...requiredList]);
    };


    return (
        <View style={styles.container}>
            <TopTab 
                    tabIndex={tabIndex}
                    headers={headers} onTabClicked={(index) => {      
                    setTabIndex(index);
                    refPagerView.current.setPage(index);
            }} ></TopTab>
            <PagerView
                    onPageSelected={(e) => { changePage(e.nativeEvent); }}
                    ref={refPagerView} style={styles.pagerView} initialPage={0}>
                    <View key="1">
                        <Customer {...props} locationFields={locationFields}  getCustomerInfo={getCustomerInfo}/> 
                    </View>
                    <View key="2">                        
                        <Contacts {...props} contacts={contacts} updateContacts={getContactsInfo} />                    
                    </View>
            </PagerView>
            
        </View>
    )
}


const styles = StyleSheet.create({
    pagerView: {
        flex: 4,
    },
    container:{
        flex:1,
        alignSelf:'stretch',
        height:Dimensions.get("window").height * 0.85
    }
})
