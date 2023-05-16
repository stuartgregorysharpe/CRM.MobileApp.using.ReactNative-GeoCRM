import {View, Text, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {FeatureCard} from './../../partial/FeatureCard';
import {useSelector} from 'react-redux';
import {Values} from '../../../../../constants';
import {checkConnectivity} from '../../../../../DAO/helper';
import {showOfflineDialog} from '../../../../../constants/Helper';
import {useDispatch} from 'react-redux';

export default function FeaturedCardLists(props) {

  const {onItemClicked, isFormCompulsory , isLocationFieldCompulsory , isDeviceCompulsory} = props;
  const [featureCards, setFeatureCards] = useState([]);
  const features = useSelector(
    state => state.selection.payload.user_scopes.geo_rep.features,
  );
  const custom_feature_names = useSelector(
    state => state.selection.payload.user_scopes.geo_rep.custom_feature_names,
  );
  
  const dispatch = useDispatch();

  useEffect(() => {
    loadFeatureCards();
  }, [isFormCompulsory , isDeviceCompulsory , isLocationFieldCompulsory]);

  const loadFeatureCards = async () => {
    const customer_and_contacts = features.includes('customer_and_contacts')
      ? true
      : false;
    const location_specific_forms = features.includes('location_specific_forms')
      ? true
      : false;
    const location_specific_pipeline = features.includes(
      'location_specific_pipeline',
    )
      ? true
      : false;
    const history_and_comments = features.includes('history_and_comments')
      ? true
      : false;
    const actions_items = features.includes('actions_items') ? true : false;
    const customer_sales_history_feature = features.includes(
      'customer_sales_history',
    )
      ? true
      : false;
    const isShowTouchpoint = features.includes('location_specific_touchpoints')
      ? true
      : false;

    let featureCards = [];

    if (customer_and_contacts) {
      featureCards.push({
        title: `Customer & Contacts`,
        icon: 'Person_Sharp_feature_card',
        action: 'View all information',
        link: 'customer_contacts',
        isOffline: true,
        isFormCompulsory: isLocationFieldCompulsory,
      });
    }

    if (location_specific_forms) {
      featureCards.push({
        title: `Forms`,
        icon: 'Form_feature_card',
        action: 'Specific to this location',
        link: 'forms',
        isOffline: true,
        isFormCompulsory: isFormCompulsory,
      });
    }

    if (history_and_comments) {
      featureCards.push({
        title: `Activity & Comments`,
        icon: 'Activity_Comments',
        action: 'Activity tree',
        link: 'activity_comments',
        isOffline: false,
        isFormCompulsory: false,
      });
    }

    if (location_specific_pipeline) {
      featureCards.push({
        title: `Sales Pipeline`,
        icon: 'Sales_Pipeline_feature_Card',
        action: 'View location pipeline',
        link: 'sales_pipeline',
        isOffline: false,
        isFormCompulsory: false,
      });
    }

    if (actions_items) {
      featureCards.push({
        title: `Action Items`,
        icon: 'Action_Item',
        action: 'Specific actions to be addressed',
        link: 'actions_items',
        isOffline: false,
        isFormCompulsory: false,
      });
    }

    if (features.includes('location_specific_devices')) {
      featureCards.push({
        title: `Devices`,
        icon: 'DEVICES',
        action: 'View allocated devices',
        link: 'devices',
        isOffline: true,
        isFormCompulsory: isDeviceCompulsory,
      });
    }

    if (customer_sales_history_feature) {
      featureCards.push({
        title: `Customer Sales`,
        icon: 'Customer_Sales',
        action: 'View customer sales history',
        link: 'customer_sales',
        isOffline: false,
        isFormCompulsory: false,
      });
    }

    if (isShowTouchpoint) {
      if (
        custom_feature_names &&
        custom_feature_names['location_specific_touchpoints']
      ) {
        const title = custom_feature_names['location_specific_touchpoints'];
        featureCards.push({
          title: title,
          icon: 'Touchpoints',
          action: `View ${title} history`,
          link: 'touchpoints',
          isOffline: false,
          isFormCompulsory: false,
        });
      } else {
        featureCards.push({
          title: `Touchpoints`,
          icon: 'Touchpoints',
          action: 'View touchpoints history',
          link: 'touchpoints',
          isOffline: false,
          isFormCompulsory: false,
        });
      }
    }

    if(features && features.includes('danone_sales_dash')){
      featureCards.push({
        title: `Danone Sales`,
        icon: 'Sale',
        action: 'View Customer Sales',
        link: 'danone_sales',
        isOffline: false,
        isFormCompulsory: false
      });
    }


    if(features && features.includes('sims_report')){
      featureCards.push({
        title: `Sim Card Report`,
        icon: 'Sim_Card',
        action: 'View  Sim Allocations',
        link: 'sim_card_report',
        isOffline: false,
        isFormCompulsory: false
      });
    }


    setFeatureCards([...featureCards]);
  };

  return (
    <View style={styles.featureCardContainer}>
      {featureCards.map((item, index) => {
        return (
          <View
            key={index}
            style={{
              marginLeft: index % 2 ? 10 : 0,
              width: (Values.deviceWidth - 30) / 2,
            }}>
            <FeatureCard
              icon={item.icon}
              title={item.title}
              actionTitle={item.action}
              isFormCompulsory={item.isFormCompulsory}
              onAction={() => {
                checkConnectivity().then(isConnected => {
                  if (isConnected || item.isOffline) {
                    onItemClicked(item);
                  } else {
                    showOfflineDialog(dispatch);
                  }
                });
              }}
            />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  featureCardContainer: {
    flex: 1,
    marginBottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
});
