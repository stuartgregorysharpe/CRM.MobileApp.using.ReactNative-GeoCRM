import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

export default function Root({navigation}) {
  const payload = useSelector(state => state.selection.payload);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity style={styles.selection} onPress={() => navigation.navigate("RepBottomTabNavigator")}>
          <Text style={styles.selectionText}>{payload.user_scopes.geo_rep.project_custom_name}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.selection} onPress={() => navigation.navigate("LifeBottomTabNavigator")}>
          <Text style={styles.selectionText}>{payload.user_scopes.geo_life.project_custom_name}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.selection} onPress={() => navigation.navigate("CrmBottomTabNavigator")}>
          <Text style={styles.selectionText}>{payload.user_scopes.geo_crm.project_custom_name}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'white', 
    height: '100%',
    paddingLeft: 40
  },
  selection: {
    padding: 10,
  },
  selectionText: {
    fontSize: 18
  }
})