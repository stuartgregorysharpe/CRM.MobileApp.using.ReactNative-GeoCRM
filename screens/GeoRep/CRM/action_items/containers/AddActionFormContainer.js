import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import addActionDummyData from '../add_action_items_dummyData.json';
const AddActionFormContainer = props => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const loadFormData = () => {
    const formData = addActionDummyData;
  };
  useEffect(() => {});
  return <View style={[styles.container, props.style]}></View>;
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
});

export default AddActionFormContainer;
