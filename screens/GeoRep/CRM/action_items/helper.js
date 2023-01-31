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
    field_label: 'User',
    field_name: 'selected_user_id',
    items: userList,
    initial_value: selected_user_id,
    editable: '1',
    is_required: true,
  };

  const dueDateField = {
    field_type: 'date',
    field_label: 'Due Date',
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
    postData.location_id = locationId.toString();
  }
  if (postData.action_image) {
    const actionImages = postData.action_image.filter(x => {
      const isAlreadyUploaded = x.includes('http');
      return !isAlreadyUploaded;
    });
    postData.action_image = actionImages;
  }
  return postData;
}

export function constructNormalUpdateActionFormStructure(
  formBaseData,
  userType,
) {
  if (!formBaseData) return [];
  const descriptionField = formBaseData.dynamic_fields[0];
  descriptionField.field_name = 'description';
  descriptionField.initial_value = descriptionField.value;

  const commentField = formBaseData.dynamic_fields[1];
  commentField.field_name = 'comments';
  commentField.initial_value = commentField.value;

  const takePhotoField = formBaseData.dynamic_fields[2];
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
    field_label: 'Status',
    field_name: 'selected_status',
    items: statusList,
    initial_value: selected_status,
    editable: '1',
  };
  const due_date = formBaseData.due_date;
  const dueDateField = {
    field_type: 'date',
    field_label: 'Due Date',
    field_name: 'due_date',
    editable: '1',
    initial_value: due_date,
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

const generateFieldName = fieldLabel => {
  if (!fieldLabel) return 'field';
  let fieldName = fieldLabel.replaceAll(' ', '_');
  fieldName = fieldLabel.toLowerCase();
  return fieldName;
};

export function constructRedflagActionFormStructure(formBaseData, userType) {
  if (!formBaseData) return [];
  const dynamicFields = formBaseData.dynamic_fields.map(field => {
    return {
      ...field,
      initial_value: field.value,
      field_name: generateFieldName(field.field_label),
    };
  });
  const formStructure = [...dynamicFields];

  const formData = {};
  formStructure.forEach(item => {
    formData[item.field_name] = item.initial_value;
  });
  return {formStructure, formData};
}

export function constructUpdateActionFormStructure(
  formBaseData,
  userType,
  actionItemType,
) {
  if (
    actionItemType ==
      Constants.actionItemType.ACTION_ITEM_TYPE_RED_FLAG_CHURN ||
    actionItemType == Constants.actionItemType.ACTION_ITEM_TYPE_RED_FLAG_DECLINE
  ) {
    return constructRedflagActionFormStructure(
      formBaseData,
      userType,
      actionItemType,
    );
  }
  return constructNormalUpdateActionFormStructure(
    formBaseData,
    userType,
    actionItemType,
  );
}
