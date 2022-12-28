import {Strings} from '../constants';
import {ExecuteQuery} from '../sqlite/DBHelper';
import UrlResource from './UrlResource';
import GetRequest from './GetRequest';

export function find(postData) {
  return new Promise(function (resolve, reject) {
    GetRequest.call(UrlResource.Form.Leadfields, postData)
      .then(async res => {
        if (res.status == Strings.Success && res.isConnected) {
          resolve(res.data);
        } else if (res.status == Strings.Success && !res.isConnected) {
          const client_id = res.data.client_id;
          const business_unit_id = res.data.business_unit_id;

          if (client_id && business_unit_id) {
            let commonTitle = await getCommonTitle(client_id, business_unit_id);
            let lists = await fetchDataFromDB(client_id, business_unit_id);
            let response = await getData(lists, commonTitle);
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

const getCommonTitle = async (client_id, business_unit_id) => {
  const titleQuery = generateTitleQuery();
  const titleQueryRes = await ExecuteQuery(titleQuery, [
    client_id,
    business_unit_id,
  ]);
  var commonTitle = '';
  if (titleQueryRes.rows.length > 0) {
    commonTitle = titleQueryRes.rows.item(0).custom_field_name;
  }
  return commonTitle;
};

const fetchDataFromDB = async (client_id, business_unit_id) => {
  const query = generateQuery();
  const res = await ExecuteQuery(query, [client_id, business_unit_id]);
  var lists = res.rows ? res.rows : [];
  return lists;
};

const getData = async (lists, commonTitle) => {
  var tmp = [];
  for (var i = 0; i < lists.length; i++) {
    var element = lists.item(i);
    try {
      var presetOptions = [];
      var locationUnitOptions = [];
      var dropdownTextOptions = [];

      if (element.preset_field == 1) {
        const query = getPresetOptionQuery(element.custom_master_field_id);
        console.log('QUERY    ===== ', query, element.custom_master_field_id);
        const res = await ExecuteQuery(query, []);
        var _lists = res.rows ? res.rows : [];
        presetOptions = getPresetOptionData(_lists);
      }

      if (element.core_field_name == 'location_unit') {
        const query = getLocationUnitOptionQuery();
        const res = await ExecuteQuery(query, []);
        var _lists = res.rows ? res.rows : [];
        locationUnitOptions = getLocationUnitOptionData(_lists);
      }

      if (element.field_type == 'dropdown_text') {
        const query = getDropdownTextOptionQuery(
          element.custom_master_field_id,
        );
        const res = await ExecuteQuery(query, []);
        var _lists = res.rows ? res.rows : [];
        presetOptions = getPresetOptionData(_lists);
      }

      var triggerData = [];
      if (element.trigger_field_id != 0) {
        const query = getTriggerFieldQuery(element.trigger_field_id);
        console.log('TRIGER API : ', query);
        const res = await ExecuteQuery(query, []);
        var _lists = res.rows ? res.rows : [];
        triggerData = getTriggerFieldData(_lists, element);
      }

      if (element.field_type == 'dropdown_input') {
        presetOptions = locationUnitOptions;
      }

      tmp.push({
        custom_master_field_id: element.custom_master_field_id,
        field_type: element.field_type,
        field_name: element.custom_field_name,
        core_field_name: element.core_field_name,
        value: element.value,
        rule_characters: element.rule_characters,
        rule_editable: element.rule_editable,
        rule_compulsory: element.rule_compulsory + '',
        add_prefix: element.add_prefix,
        add_suffix: element.add_suffix,
        preset_field: element.preset_field,
        preset_options: presetOptions,
        trigger: triggerData,
        input_label: element.dropdown_input_label,
        field_tag: element.field_tag,
      });
    } catch (e) {
      console.log(e);
    }
  }
  console.log('GetRequestLeaffield', tmp);

  return {
    status: String.Success,
    accuracy_distance_measure: 'm',
    component_title: commonTitle,
    custom_master_fields: tmp,
  };
};

const generateTitleQuery = () => {
  var sql =
    `SELECT ` +
    `custom_master_field_id, ` +
    `custom_field_name, ` +
    `core_field_name, ` +
    `field_type  as "value", ` +
    `rule_characters, ` +
    `"1" as rule_editable, ` +
    `add_prefix, ` +
    `add_suffix, ` +
    `rule_compulsory, ` +
    `preset_field ` +
    `FROM locations_custom_master_fields ` +
    `WHERE ` +
    `core_field_name = "location_name" AND ` +
    `client_id = ? AND ` +
    `business_unit_id = ? AND ` +
    `delete_status = 0  AND ` +
    `status = "active" `;
  return sql;
};

const generateQuery = () => {
  var sql =
    `SELECT ` +
    `custom_master_field_id, ` +
    `custom_field_name, ` +
    `core_field_name, ` +
    `field_type, ` +
    `"" as "value", ` +
    `rule_characters, ` +
    `"1" as rule_editable, ` +
    `add_prefix, ` +
    `add_suffix, ` +
    `rule_compulsory, ` +
    `preset_field, ` +
    `trigger_field_id, ` +
    `trigger_field_answer, ` +
    `trigger_field_condition, ` +
    `dropdown_input_label, ` +
    `field_tag ` +
    `FROM locations_custom_master_fields ` +
    `WHERE ` +
    `client_id = ? AND ` +
    `business_unit_id = ? AND ` +
    `delete_status = 0 AND ` +
    `status = "active" `;
  return sql;
};

const getPresetOptionQuery = custom_master_field_id => {
  var sql =
    `SELECT  preset_data FROM locations_field_presets WHERE custom_master_field_id = ` +
    custom_master_field_id +
    ` ORDER BY preset_data `;
  return sql;
};

const getLocationUnitOptionQuery = () => {
  var sql = `SELECT unit FROM location_unit_field_options ORDER BY unit`;
  return sql;
};

const getDropdownTextOptionQuery = custom_master_field_id => {
  var sql =
    `SELECT preset_data  FROM locations_dropdown_input_presets WHERE custom_master_field_id = ` +
    custom_master_field_id +
    ` ORDER BY preset_data`;
  return sql;
};

const getTriggerFieldQuery = trigger_field_id => {
  var sql =
    `SELECT  field_type FROM locations_custom_master_fields WHERE custom_master_field_id = ` +
    trigger_field_id;
  return sql;
};

const getPresetOptionData = lists => {
  var tmp = [];
  for (var i = 0; i < lists.length; i++) {
    const subElement = lists.item(i);
    tmp.push(subElement.preset_data);
  }
  return tmp;
};

const getLocationUnitOptionData = lists => {
  var tmp = [];
  for (var i = 0; i < lists.length; i++) {
    const subElement = lists.item(i);
    tmp.push(subElement.unit);
  }
  return tmp;
};

const getTriggerFieldData = (lists, element) => {
  var tmp = [];
  for (var i = 0; i < lists.length; i++) {
    const subElement = lists.item(i);
    tmp = {
      trigger_field_id: element.trigger_field_id,
      trigger_condition: element.trigger_field_condition,
      answer: element.trigger_field_answer,
    };
    if (subElement.field_type == 'text' || subElement.field_type == 'yes_no') {
      tmp = {
        ...tmp,
        type: 'text',
      };
    }
    if (subElement.field_type == 'numbers') {
      tmp = {
        ...tmp,
        type: 'numbers',
      };
    }

    if (
      subElement.field_type == 'multiple' ||
      subElement.field_type == 'multi_select'
    ) {
      console.log(
        'subElement.trigger_field_answer',
        element.trigger_field_answer,
      );
      tmp = {
        type: 'dropdown',
        trigger_field_id: element.trigger_field_id,
        trigger_condition: element.trigger_field_condition,
        answer: element.trigger_field_answer,
      };
    }
    break;
  }
  return tmp;
};

export default {
  find,
};
