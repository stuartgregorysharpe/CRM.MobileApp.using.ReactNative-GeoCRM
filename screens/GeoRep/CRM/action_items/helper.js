export function getAddActionItemPostValue(formData) {
  return {
    action_item_id: '',
    selected_status: 'To Do',
    comments: '',
    ...formData,
  };
}
