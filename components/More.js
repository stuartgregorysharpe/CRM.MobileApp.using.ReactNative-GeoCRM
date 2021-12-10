import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import SvgIcon from './SvgIcon';
import { BG_COLOR, PRIMARY_COLOR, TEXT_COLOR } from '../constants/Colors';
import { CHANGE_MORE_STATUS, SHOW_MORE_COMPONENT } from '../actions/actionTypes';

const lists = {
  0: [
    {
      icon: "Account_Circle",
      name: "Home",
      navigator: "Home",
      navOrder: "home_geo"
    },
    {
      icon: "Location_Arrow",
      name: "CRM",
      navigator: "CRM",
      navOrder: "crm_locations"
    },
    {
      icon: "Calendar_Event_Fill",
      name: "Calendar",
      navigator: "Calendar",
      navOrder: "calendar"
    },
    {
      icon: "Account_Circle",
      name: "Forms",
      navigator: "RepForms",
      navOrder: "forms"
    },
    {
      icon: "Ballot",
      name: "Content Library",
      navigator: "RepContentLibrary",
      navOrder: "content_library"
    },
    {
      icon: "Account_Circle",
      name: "Sales",
      navigator: "ProductSales",
      navOrder: "product_sales"
    },
    {
      icon: "Account_Circle",
      name: "Notifications",
      navigator: "Notifications",
      navOrder: "notifications"
    },
    {
      icon: "Travel_Explore",
      name: "Web Links",
      navigator: "RepWebLinks",
      navOrder: "web_links"
    },
    {
      icon: "Account_Circle",
      name: "Help",
      navigator: "RepHelp",
      navOrder: "help"
    },
    {
      icon: "Account_Circle",
      name: "Messages",
      navigator: "RepMessages",
      navOrder: "messages"
    },
    {
      icon: "Cloud_Off",
      name: "Sync",
      navigator: "OfflineSync",
      navOrder: "offline_sync"
    },
    {
      icon: "Account_Circle",
      name: "Recorded Sales",
      navigator: "RecordedSales",
      navOrder: "recorded_sales"
    },
    {
      icon: "Account_Circle",
      name: "Pipeline",
      navigator: "RepSalesPipeline",
      navOrder: "sales_pipeline"
    },
    {
      icon: "Support_Agent",
      name: "Support",
      navigator: "Support",
      navOrder: "support"
    },
  ],
  1: [
    {
      icon: "Account_Circle",
      name: "Home",
      navigator: "HomeLife",
      navOrder: "home_life"
    },
    {
      icon: "Account_Circle",
      name: "News",
      navigator: "News",
      navOrder: "news"
    },
    {
      icon: "Account_Circle",
      name: "Locations",
      navigator: "LocationsLife",
      navOrder: "locations_life"
    },
    {
      icon: "Account_Circle",
      name: "Check In",
      navigator: "CheckIn",
      navOrder: "check_in"
    },
    {
      icon: "Account_Circle",
      name: "Access Control",
      navigator: "Access",
      navOrder: "access"
    },
    {
      icon: "Account_Circle",
      name: "Club",
      navigator: "Club",
      navOrder: "club"
    },
    {
      icon: "Account_Circle",
      name: "FlashBook",
      navigator: "Flashbook",
      navOrder: "flashbook"
    },
    {
      icon: "Account_Circle",
      name: "Business Directory",
      navigator: "BusinessDirectory",
      navOrder: "business_directory"
    },
    {
      icon: "Ballot",
      name: "Content Library",
      navigator: "LifeContentLibrary",
      navOrder: "content_library"
    },
    {
      icon: "Account_Circle",
      name: "Forms",
      navigator: "LifeForms",
      navOrder: "forms"
    },
    {
      icon: "Account_Circle",
      name: "Help",
      navigator: "LifeHelp",
      navOrder: "help"
    },
    {
      icon: "Account_Circle",
      name: "Loyalty Cards",
      navigator: "LoyaltyCards",
      navOrder: "loyalty_cards"
    },
    {
      icon: "Account_Circle",
      name: "Lunch Orders",
      navigator: "LunchOrders",
      navOrder: "lunch_orders"
    },
    {
      icon: "Account_Circle",
      name: "Messages",
      navigator: "LifeMessages",
      navOrder: "messages"
    },
    {
      icon: "Account_Circle",
      name: "Profile",
      navigator: "Profile",
      navOrder: "profile"
    },
    {
      icon: "Account_Circle",
      name: "Report Fraud",
      navigator: "ReportFraud",
      navOrder: "report_fraud"
    },
    {
      icon: "Travel_Explore",
      name: "Web Links",
      navigator: "LifeWebLinks",
      navOrder: "web_links"
    },
    {
      icon: "Account_Circle",
      name: "Well-being",
      navigator: "WellBeing",
      navOrder: "well_being"
    }
  ],
  2: [
    {
      icon: "Ballot",
      name: "Content Library",
      navigator: "CRMContentLibrary",
      navOrder: "content_library"
    },
    {
      icon: "Location_Arrow",
      name: "CRM",
      navigator: "CRMLocations",
      navOrder: "crm_locations"
    },
    {
      icon: "Account_Circle",
      name: "Pipeline",
      navigator: "CRMSalesPipeline",
      navOrder: "sales_pipeline"
    }
  ]
}

export default function Profile() {
  const dispatch = useDispatch();
  const payload = useSelector(state => state.selection.payload);
  const selectProject = useSelector(state => state.selection.selectProject);

  const componentLists = {
    0: [
      payload.user_scopes.geo_rep.modules_nav_order[4],
      payload.user_scopes.geo_rep.modules_nav_order[5],
      payload.user_scopes.geo_rep.modules_nav_order[6],
      payload.user_scopes.geo_rep.modules_nav_order[7],
      payload.user_scopes.geo_rep.modules_nav_order[8],
      payload.user_scopes.geo_rep.modules_nav_order[9],
      payload.user_scopes.geo_rep.modules_nav_order[10],
      payload.user_scopes.geo_rep.modules_nav_order[11],
      payload.user_scopes.geo_rep.modules_nav_order[12],
      payload.user_scopes.geo_rep.modules_nav_order[13],
    ],
    1: [
      payload.user_scopes.geo_life.modules_nav_order[4],
      payload.user_scopes.geo_life.modules_nav_order[5],
      payload.user_scopes.geo_life.modules_nav_order[6],
      payload.user_scopes.geo_life.modules_nav_order[7],
      payload.user_scopes.geo_life.modules_nav_order[8],
      payload.user_scopes.geo_life.modules_nav_order[9],
      payload.user_scopes.geo_life.modules_nav_order[10],
      payload.user_scopes.geo_life.modules_nav_order[11],
      payload.user_scopes.geo_life.modules_nav_order[12],
      payload.user_scopes.geo_life.modules_nav_order[13],
      payload.user_scopes.geo_life.modules_nav_order[14],
      payload.user_scopes.geo_life.modules_nav_order[15],
      payload.user_scopes.geo_life.modules_nav_order[16],
      payload.user_scopes.geo_life.modules_nav_order[17]
    ],
    2: [
      payload.user_scopes.geo_crm.modules_nav_order[4]
    ]
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <View style={styles.avatarBox}>
          <TouchableOpacity style={styles.closeButton} onPress={() => dispatch({type: CHANGE_MORE_STATUS, payload: 1})}>
            <SvgIcon icon="Close" width='20px' height='20px' />
          </TouchableOpacity>
          <View style={styles.avatar}>
            <Text style={styles.avatarLabel}>
              {payload.user_scopes.geo_rep.user_name.split(' ')[0] && payload.user_scopes.geo_rep.user_name.split(' ')[0][0].toUpperCase()}
              {payload.user_scopes.geo_rep.user_name.split(' ')[1] && payload.user_scopes.geo_rep.user_name.split(' ')[1][0].toUpperCase()}
            </Text>
          </View>
          <View style={{width: '48%'}}>
            <Text style={styles.boldText}>{payload.user_scopes.geo_rep.user_name}</Text>
            <Text style={styles.text}>{payload.user_scopes.geo_rep.user_email}</Text>
            <Text style={styles.text}>+27 81 691 7262</Text>
          </View>
        </View>
        <View style={styles.selectBox}>
          {selectProject == 'geo_rep' && lists[0].map((list, index) => (
            <Fragment key={index}>
              {componentLists[0].includes(list.navOrder) && <TouchableOpacity 
                style={styles.selectButton} 
                onPress={() => {
                  dispatch({type: SHOW_MORE_COMPONENT, payload: list.navigator});
                  dispatch({type: CHANGE_MORE_STATUS, payload: 1});
                }}>
                <SvgIcon style={{marginRight: 8}} icon={list.icon} width='24px' height='24px' />
                <Text style={styles.selectName}>{list.name}</Text>
                <SvgIcon icon="Angle_Left" width='20px' height='20px' />
              </TouchableOpacity>}
            </Fragment>
          ))}

          {selectProject == 'geo_life' && lists[1].map((list, index) => (
            <Fragment key={index}>
              {componentLists[1].includes(list.navOrder) && <TouchableOpacity 
                style={styles.selectButton} 
                onPress={() => {
                  dispatch({type: SHOW_MORE_COMPONENT, payload: list.navigator});
                  dispatch({type: CHANGE_MORE_STATUS, payload: 1});
                }}>
                <SvgIcon style={{marginRight: 8}} icon={list.icon} width='24px' height='24px' />
                <Text style={styles.selectName}>{list.name}</Text>
                <SvgIcon icon="Angle_Left" width='20px' height='20px' />
              </TouchableOpacity>}
            </Fragment>
          ))}

          {selectProject == 'geo_crm' && lists[2].map((list, index) => (
            <Fragment key={index}>
              {componentLists[2].includes(list.navOrder) && <TouchableOpacity 
                style={styles.selectButton} 
                onPress={() => {
                  dispatch({type: SHOW_MORE_COMPONENT, payload: list.navigator});
                  dispatch({type: CHANGE_MORE_STATUS, payload: 1});
                }}>
                <SvgIcon style={{marginRight: 8}} icon={list.icon} width='24px' height='24px' />
                <Text style={styles.selectName}>{list.name}</Text>
                <SvgIcon icon="Angle_Left" width='20px' height='20px' />
              </TouchableOpacity>}
            </Fragment>
          ))}

          {/* <TouchableOpacity style={styles.selectButton} onPress={() => {
            dispatch({type: SHOW_MORE_COMPONENT, payload: 'OfflineSyncItems'});
            dispatch({type: CHANGE_MORE_STATUS, payload: 1});
          }}>
            <SvgIcon style={{marginRight: 8}} icon="Cloud_Off" width='24px' height='24px' />
            <Text style={styles.selectName}>Offline Sync Items</Text>
            <SvgIcon icon="Angle_Left" width='20px' height='20px' />
          </TouchableOpacity> */}

          <TouchableOpacity style={styles.selectButton}>
            <Text style={styles.selectName}>Logout</Text>
            <SvgIcon icon="Angle_Left" width='20px' height='20px' />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '100%',
    marginLeft: 'auto',
    backgroundColor: BG_COLOR,
    padding: 12,
    paddingTop: 70,
    borderWidth: 1,
    borderColor: '#70707070',
  },
  avatarBox: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomColor: PRIMARY_COLOR,
    borderBottomWidth: 2
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  avatar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: PRIMARY_COLOR,
    borderWidth: 2,
    width: 56,
    height: 56,
    borderRadius: 30,
    marginRight: 12,
  },
  avatarLabel: {
    color: PRIMARY_COLOR,
    fontFamily: 'Gilroy-Bold',
    fontSize: 32
  },
  boldText: {
    color: TEXT_COLOR,
    fontSize: 17,
    fontFamily: 'Gilroy-Bold'
  },
  text: {
    fontSize: 14,
    color: TEXT_COLOR,
    fontFamily: 'Gilroy-Medium',
    marginBottom: 2
  },
  selectBox: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 100,
  },
  selectButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomColor: '#70707045',
    borderBottomWidth: 2
  },
  selectName: {
    flexGrow: 1,
    fontSize: 16,
    fontFamily: 'Gilroy-Medium',
    color: TEXT_COLOR
  }
})