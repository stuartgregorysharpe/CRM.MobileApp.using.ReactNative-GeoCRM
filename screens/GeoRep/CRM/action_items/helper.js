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
