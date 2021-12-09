import React, {useState, useEffect} from 'react';
import { SafeAreaView, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

export default function MoreScreen({navigation, screenProps}) {
  const payload = useSelector(state => state.selection.payload);

  const [orderList, setOrderList] = useState([]);

  // useEffect(() => {
  //   screenProps.setOptions({
  //     title: "More"
  //   });
  // });

  useEffect(() => {
    let items = [];
    for (const index in payload.user_scopes.geo_life.modules_nav_order) {
      if (index > 3) {
        items.push(payload.user_scopes.geo_life.modules_nav_order[index].replace("_", " "));
      }
    }
    setOrderList(items);
  }, []);

  const ChangeScreen = (key) => {
    switch(key) {
      case 0:
        navigation.navigate("Access");
        return;
      case 1:
        navigation.navigate("Club");
        return;
      case 2:
        navigation.navigate("Flashbook");
        return;
      case 3:
        navigation.navigate("BusinessDirectory");
        return;
      case 4:
        navigation.navigate("ContentLibrary");
        return;
      case 5:
        navigation.navigate("Forms");
        return;
      case 6:
        navigation.navigate("Help");
        return;
      case 7:
        navigation.navigate("LoyaltyCards");
        return;
      case 8:
        navigation.navigate("LunchOrders");
        return;
      case 9:
        navigation.navigate("Messages");
        return;
      case 10:
        navigation.navigate("Profile");
        return;
      case 11:
        navigation.navigate("ReportFraud");
        return;
      case 12:
        navigation.navigate("WebLinks");
        return;
      case 13:
        navigation.navigate("WellBeing");
        return;
      default:
        return;
    }
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {orderList.map((list, key) => (
          <TouchableOpacity style={styles.listItem} key={key} onPress={ChangeScreen.bind(null, key)}>
            <Text style={styles.listItemText}>{list.slice(0, 1).toUpperCase() + list.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  listItem: {
    marginBottom: 10
  },
  listItemText: {
    fontSize: 16
  }
})