import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import AddToCalendar from './AddToCalendar';

const AddToCalendarContainer = props => {
  const selectedLocationsForCalendar = useSelector(
    state => state.selection.selectedLocationsForCalendar,
  );
  return (
    <AddToCalendar selectedItems={selectedLocationsForCalendar} {...props} />
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
});

export default AddToCalendarContainer;
