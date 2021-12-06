import React, {
  useState, 
  useEffect
} from 'react';
import { 
  SafeAreaView, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { useSelector } from 'react-redux';

export default function RepMoreIndexScreen({navigation, screenProps}) {
  const payload = useSelector(state => state.selection.payload);

  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    screenProps.setOptions({
      title: "More"
    });
  });

  useEffect(() => {
    let items = [];
    for (const index in payload.user_scopes.geo_rep.modules_nav_order) {
      if (index > 3) {
        items.push(payload.user_scopes.geo_rep.modules_nav_order[index].replace("_", " "));
      }
    }
    setOrderList(items);
  }, []);

  const ChangeScreen = (key) => {
    switch(key) {
      case 0:
        navigation.navigate("ContentLibrary");
        return;
      case 1:
        navigation.navigate("ProductSales");
        return;
      case 2:
        navigation.navigate("Notifications");
        return;
      case 3:
        navigation.navigate("WebLinks");
        return;
      case 4:
        navigation.navigate("Help");
        return;
      case 5:
        navigation.navigate("Messages");
        return;
      case 6:
        navigation.navigate("OfflineSync");
        return;
      case 7:
        navigation.navigate("RecordedSales");
        return;
      case 8:
        navigation.navigate("SalesPipeline");
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