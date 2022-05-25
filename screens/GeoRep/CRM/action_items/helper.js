import {Constants} from '../../../../constants';
import {getPostParameter} from '../../../../constants/Helper';

export function getAddActionItemPostValue(
  formData,
  locationId,
  currentLocation,
) {
  const userParam = currentLocation ? getPostParameter(currentLocation) : null;
  const postData = {
    action_item_id: '',
    selected_status: 'To Do',
    comments: '',
    ...formData,
  };
  if (userParam && userParam.user_local_data) {
    postData.user_local_data = userParam.user_local_data;
  }
  if (locationId) {
    postData.location_id = locationId;
  }
  return postData;
}

export function constructAddActionFormStructure(formBaseData) {
  if (!formBaseData) return [];
  const descriptionField = formBaseData.dynamic_fields[0];
  descriptionField.is_required = true;
  descriptionField.field_name = 'description';
  descriptionField.initial_value = descriptionField.value;
  const {users, selected_user_id} = formBaseData.user_field;
  const userList = users.map(user => {
    return {
      ...user,
      label: user.user_name,
      value: user.user_id,
    };
  });
  const selectUserField = {
    field_type: 'dropdown',
    field_label: 'Select User',
    field_name: 'selected_user_id',
    items: userList,
    initial_value: selected_user_id,
    editable: '1',
    is_required: true,
  };
  const dueDateField = {
    field_type: 'date',
    field_label: 'Select Due Date',
    field_name: 'due_date',
    editable: '1',
    initial_value: null,
    is_required: true,
  };
  const formStructure = [descriptionField, selectUserField, dueDateField];
  const formData = {};
  formStructure.forEach(item => {
    formData[item.field_name] = item.initial_value;
  });
  return {formStructure, formData};
}

export function getUpdateActionItemPostValue(
  formData,
  locationId,
  currentLocation,
  extraParams = {},
) {
  const userParam = currentLocation ? getPostParameter(currentLocation) : null;
  const postData = {
    ...formData,
    ...extraParams,
  };
  if (userParam && userParam.user_local_data) {
    postData.user_local_data = userParam.user_local_data;
  }
  if (locationId) {
    postData.location_id = locationId;
  }
  return postData;
}

export function constructUpdateActionFormStructure(formBaseData, userType) {
  if (!formBaseData) return [];
  const descriptionField = formBaseData.dynamic_fields[0];
  descriptionField.is_required = true;
  descriptionField.field_name = 'description';
  descriptionField.initial_value = descriptionField.value;

  const commentField = formBaseData.dynamic_fields[1];
  commentField.field_name = 'comments';
  commentField.initial_value = commentField.value;

  const takePhotoField = formBaseData.dynamic_fields[2];
  takePhotoField.is_required = true;
  takePhotoField.field_name = 'action_image';
  takePhotoField.initial_value = takePhotoField.value;
  const {users, selected_user_id} = formBaseData.user_field;
  const userList = users.map(user => {
    return {
      ...user,
      label: user.user_name,
      value: user.user_id,
    };
  });

  const selectUserField = {
    field_type: 'dropdown',
    field_label: 'Assign to User',
    field_name: 'selected_user_id',
    items: userList,
    initial_value: selected_user_id,
    editable: '1',
    is_required: true,
  };
  const {statuses, selected_status} = formBaseData.status;
  const statusList = statuses.map(status => {
    return {
      label: status,
      value: status,
    };
  });
  const selectStatusField = {
    field_type: 'dropdown',
    field_label: 'Select Status',
    field_name: 'selected_status',
    items: statusList,
    initial_value: selected_status,
    editable: '1',
    is_required: true,
  };
  const dueDateField = {
    field_type: 'date',
    field_label: 'Select Due Date',
    field_name: 'due_date',
    editable: '1',
    initial_value: null,
    is_required: true,
  };
  const formStructure = [descriptionField, commentField];
  if (
    userType == Constants.userType.USER_TYPE_ADMIN ||
    userType == Constants.userType.USER_TYPE_SUPER_ADMIN
  ) {
    formStructure.push(selectUserField);
  }

  formStructure.push(dueDateField, selectStatusField, takePhotoField);
  const formData = {};
  formStructure.forEach(item => {
    formData[item.field_name] = item.initial_value;
  });
  return {formStructure, formData};
}
