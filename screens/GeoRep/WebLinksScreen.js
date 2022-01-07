import React, { useEffect, Fragment } from 'react';
import { SafeAreaView, View, StyleSheet, ScrollView } from 'react-native';

import Searchbar from '../../components/SearchBar';
import Card from '../../components/Card';
import { BG_COLOR } from '../../constants/Colors';
import { getWebLinks } from '../../actions/weblinks.action';

const lists = [
  {
    icon: "Path",
    title: "Geo Rep Local"
  },
  {
    icon: "Path",
    title: "Geo Rep International"
  },
  {
    image: require("../../assets/images/linkedin.png"),
    title: "Linkedin"
  },
  {
    image: require("../../assets/images/mask_group.png"),
    title: "CNN News"
  },
  {
    image: require("../../assets/images/chrome.png"),
    title: "Google Search"
  }
];

export default function WebLinksScreen({screenProps}) {
  useEffect(() => {
    if (screenProps) {
      screenProps.setOptions({
        title: "Web Links"
      });
    }
    //dispatch(getWebLinks());
  });

  return (
   
      <ScrollView style={styles.container}>
        <Searchbar />
        <View style={styles.innerContainer}>
          {lists.map((item, index) => (
            <Fragment key={index}>
              {index < 2 && <Card icon={item.icon} title={item.title} subtitle={item.subtitle} />}
              {index >= 2 && <Card image={item.image} title={item.title} subtitle={item.subtitle} />}
            </Fragment>
          ))}
        </View>
      </ScrollView>
    
  )
}


const styles = StyleSheet.create({
  container: {   
    minHeight: '100%',
    backgroundColor: BG_COLOR,    
  },
  innerContainer: {
    padding: 10
  }
})