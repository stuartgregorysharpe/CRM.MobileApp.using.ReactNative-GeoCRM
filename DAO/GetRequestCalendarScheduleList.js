import {Constants, Strings} from '../constants';
import {getJsonData, getLocalData} from '../constants/Storage';
import {ExecuteQuery} from '../sqlite/DBHelper';
import GetRequest from './GetRequest';

export function find(postData) {
  return new Promise(function (resolve, reject) {
    GetRequest.call('calendar', postData)
      .then(async res => {
        if (res.status == Strings.Success && res.isConnected) {
          resolve(res.data);
        } else if (res.status == Strings.Success && !res.isConnected) {
          const client_id = res.data.client_id;
          const business_unit_id = res.data.business_unit_id;
          const user_id = res.data.user_id;

          if (client_id && business_unit_id && user_id) {
            const scheduleItems = await fetchDataFromDB(
              business_unit_id,
              client_id,
              user_id,
              postData,
            );
            const checkedScheduleId = await getLocalData(
              Constants.storageKey.CHECKIN_SCHEDULE_ID,
            );
            const offlineScheduleCheckins = await getJsonData(
              Constants.storageKey.OFFLINE_SCHEDULE_CHECKINS,
            );
            console.log('offlineScheduleCheckins', offlineScheduleCheckins);
            resolve({
              status: Strings.Success,
              items: getScheduleList(
                scheduleItems,
                postData,
                checkedScheduleId,
                offlineScheduleCheckins,
              ),
            });
          } else {
            reject();
          }
        }
      })
      .catch(e => {
        reject(e);
      });
  });
}

const fetchDataFromDB = async (
  business_unit_id,
  client_id,
  user_id,
  postData,
) => {
  let query = `SELECT 
                  s.schedule_order,
                  s.location_id,
                  lcmd.location_name,
                  s.schedule_id,
                  s.schedule_date,
                  CASE WHEN schedule_time IS NOT NULL AND schedule_time != "00:00:00" 
                  THEN 
                    (strftime(s.schedule_time, "%H:%i") || " - " || strftime(s.end_time, "%H:%i"))
                  ELSE "Today" END AS "schedule_time", 
                  lcmd.street_address,
                  lcmd.suburb, 
                  lcmd.city,
                  lcmd.pincode,
                  lcmd.latitude,
                  lcmd.longitude,
                  CASE WHEN ua.checkin_time > 0 AND ua.checkout_time > 0 
                  THEN 
                    "checkin_completed" 
                  WHEN ua.checkin_time > 0 AND (ua.checkout_time = "0000-00-00 00:00:00" OR ua.checkout_time IS NULL)
                  THEN 
                    "checkin_current" 
                  ELSE "checkin_required" END AS "checkin_state"
                FROM schedules AS s
                LEFT JOIN locations_core_master_data AS lcmd 
                ON s.location_id = lcmd.location_id
                LEFT JOIN schedules_activities AS ua 
                ON s.schedule_id = ua.schedule_id
                WHERE s.user_id = ${user_id}
                AND s.client_id = ${client_id}
                AND s.delete_status = 0`;
  if (postData['period'].toLowerCase() == 'today') {
    query += ` AND s.schedule_date = date('now')`;
  }
  if (postData['period'] == 'last_week') {
    query += ` AND s.schedule_date BETWEEN date('now', '-7 days') AND date('now', '-1 day')`;
  }
  if (postData['period'] == 'week_ahead') {
    query += ` AND s.schedule_date BETWEEN date('now', '1 day') AND date('now', '7 days')`;
  }
  query += ` ORDER BY s.schedule_order ASC`;
  console.log('calendar schedule', query);
  const res = await ExecuteQuery(query);
  const result = res.rows ? res.rows : [];

  const resultList = [];
  for (let i = 0; i < result.length; i++) {
    const item = result.item(i);
    resultList.push({...item});
  }
  console.log('resultList', resultList);
  return resultList;
};

const getScheduleList = (
  scheduleItems,
  postData,
  checkedScheduleId,
  offlineScheduleCheckins,
) => {
  const calendarItems = [];
  const {period} = postData;
  scheduleItems.forEach(schedule => {
    const item = {...schedule};
    if (period == 'week_ahead' || period == 'last_week') {
      //Remove Today schedule_time if week_ahead or last_week
      if (schedule.schedule_time == 'Today') {
        item.schedule_time = '';
      } else {
        item.schedule_time = schedule.schedule_time;
      }
    } else {
      item.schedule_time = schedule.schedule_time;
    }

    //Concat address fields (Only non-empty fields) with a comma separator
    var address = '';
    if(schedule.street_address && schedule.street_address != ''){
      address = schedule.street_address;
    }
    if(schedule.suburb && schedule.suburb != ''){
      address = address != '' ? address + ", " + schedule.suburb : schedule.suburb;
    }
    if(schedule.city && schedule.city != ''){
      address = address + ", " + schedule.city;
    }
    if(schedule.pincode && schedule.pincode != ''){
      address = address + ", " + schedule.pincode;
    }      
    item.address = address;

    //Check if location currently checked-in to this schedule_id or if they checked-in already (While in offline mode)
    if (checkedScheduleId == schedule.schedule_id) {
      item.checkin_state = 'checkin_current';
    } else if (
      offlineScheduleCheckins &&
      offlineScheduleCheckins.includes(schedule.schedule_id)
    ) {
      item.checkin_state = 'checkin_completed';
    } else {
      item.checkin_state = schedule.checkin_state;
    }
    item.coordinates = {
      latitude: item.latitude,
      longitude: item.longitude,
    };

    calendarItems.push(item);
  });
  console.log('calendarItems', calendarItems);
  return calendarItems;
};

export default {
  find,
};
