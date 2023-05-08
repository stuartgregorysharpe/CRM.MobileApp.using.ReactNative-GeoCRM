import {baseURL, Strings} from '../constants';
import {ExecuteQuery} from '../sqlite/DBHelper';
import GetRequest from './GetRequest';
import {parseDateFromString} from '../helpers/formatHelpers';


export function find(postData) {
  return new Promise(function (resolve, reject) {
    GetRequest.call('locations/location-info', postData)
      .then(async res => {
        if (res.status == Strings.Success && res.isConnected) {
          resolve(res.data);
        } else if (res.status == Strings.Success && !res.isConnected) {
          const client_id = res.data.client_id;
          const business_unit_id = res.data.business_unit_id;
          const user_id = res.data.user_id;

          if (client_id && business_unit_id) {
            console.log('post data', postData.location_id);
            let lists = await fetchContactDataFromDB(postData.location_id);
            const contactsLists = await getContactsLists(lists);

            const msisdnList = await fetchMsisdnDataFromDB(
              postData.location_id,
            );
            const msisdn = getMsisdnString(msisdnList);
            let locationInfoLists = await fetchLocationDataFromDB(
              business_unit_id,
              client_id,
              postData.location_id,
            );
            const response = await getLocationData(
              locationInfoLists,
              contactsLists,
              msisdn,
            );

            console.log('RES', response);
            resolve(response);
          } else {
            reject();
          }
        } else {
          reject(res.status);
        }
      })
      .catch(e => {
        reject(e);
      });
  });
}

const fetchContactDataFromDB = async location_id => {
  const query = generateContactQuery();
  console.log('query', query);
  const res = await ExecuteQuery(query, [location_id]);
  var lists = res.rows ? res.rows : [];
  return lists;
};

const fetchMsisdnDataFromDB = async location_id => {
  const query = generateMsisdnQuery();  
  const res = await ExecuteQuery(query, [location_id]);  
  var lists = res.rows ? res.rows : [];
  return lists;
};

const fetchLocationDataFromDB = async (
  business_unit_id,
  client_id,
  location_id,
) => {
  const query = generateLocationDataQuery();
  const res = await ExecuteQuery(query, [
    business_unit_id,
    client_id,
    location_id,
  ]);
  var lists = res.rows ? res.rows : [];
  return lists;
};

const generateContactQuery = () => {
  var query =
    `SELECT contact_name, contact_cell, contact_email ` +
    `FROM crm_contacts ` +
    `WHERE location_id = ? ` +
    `ORDER BY primary_contact DESC,contact_name `;
  return query;
};

const generateLocationDataQuery = () => {
  var query =
    `SELECT ` +
    `lcmd.location_id, ` +
    `lcmd.location_image, ` +
    `lcmd.location_name, ` +
    `lcmd.latitude, ` +
    `lcmd.longitude, ` +
    `lcmf.custom_field_name, ` +
    `lcmd.last_activity as 'last_visit', ` +
    `lcmd.location_unit_type, ` +
    `lcmd.location_unit, ` +
    `lcmd.street_address, ` +
    `lcmd.suburb, ` +
    `lcmd.city, ` +
    `lcmd.pincode ` +
    `FROM ` +
    `locations_core_master_data AS lcmd ` +
    `LEFT JOIN locations_custom_master_fields as lcmf ` +
    `ON lcmf.core_field_name = 'location_name'  ` +
    `AND lcmf.business_unit_id = ? ` +
    `AND lcmf.client_id = ? ` +
    `WHERE ` +
    `lcmd.location_id = ? ` +
    `LIMIT 1 `;
  return query;
};

const generateMsisdnQuery = () => {
  const query = `SELECT
                device_msisdn as 'msisdn'
              FROM location_devices
              WHERE location_id = ?
              AND delete_status = 0`;
  return query;
};
const getContactsLists = async lists => {
  var tmp = [];
  for (var i = 0; i < lists.length; i++) {
    var element = lists.item(i);
    tmp.push({
      contact_name: element.contact_name,
      contact_cell: element.contact_cell,
      contact_email: element.contact_email,
    });
  }
  return tmp;
};
const getMsisdnString = items => {
  const msisdnItems = [];
  for (let i = 0; i < items.length; i++) {
    const element = items.item(i);
    msisdnItems.push(element.msisdn);
  }
  return msisdnItems.join(', ');
};

const getLocationData = async (lists, contactsLists, msisdn) => {
  var tmp = {};
  for (var i = 0; i < lists.length; i++) {
    var element = lists.item(i);
    
    var coordinate = {
      latitude: element.latitude,
      longitude: element.longitude,
    };

    var locationName = {
      custom_field_name: element.custom_field_name,
      value: element.location_name,
    };

    var lastVisit = parseDateFromString(element.last_visit);

    var address = '';
    if(element.location_unit_type != ''){
      address = element.location_unit_type + ", " ;
    }
    if(element.location_unit != ''){
      address = element.location_unit + ", " ;
    }
    if(element.street_address != ''){
      address =  element.street_address + ", " +      
      element.suburb +
      ', ' +
      element.city +
      ', ' +
      element.pincode;
    }

    tmp = {
      location_id: element.location_id,
      location_name: locationName,
      last_interaction:
        lastVisit != null && lastVisit.length > 0 ? lastVisit[0] : '',
      last_visit: element.last_visit,
      address: address,
      coordinates: coordinate,
      current_stage_id: '',
      current_outcome_id: '',
      location_image:
        element.location_image != ''
          ? baseURL + '/common/assets/location_images/' + element.location_image
          : '',
      contacts: contactsLists,
      stages: [],
      outcomes: [],
      disposition_fields: [],
      next: [],
      feedback: [],
      msisdn: msisdn,
    };
  }
  return tmp;
};

export default {
  find,
};
