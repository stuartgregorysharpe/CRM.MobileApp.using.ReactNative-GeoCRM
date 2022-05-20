export function getUsersFromFormData(formData) {
  const isUsersAvailable =
    formData && formData.user_field && formData.user_field.users;
  if (isUsersAvailable) {
    return formData.user_field.users;
  }
}
