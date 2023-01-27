import React, { useEffect, Fragment } from 'react';
import { SafeAreaView, View, StyleSheet, ScrollView } from 'react-native';

import Searchbar from '../../components/SearchBar';
import Card from '../../screens/GeoRep/ContentLibrary/partial/Card';
import Colors, { } from '../../constants/Colors';
import Images from '../../constants/Images';

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
    image: Images.linkedin,
    title: "Linkedin"
  },
  {
    image: Images.maskGroup,
    title: "CNN News"
  },
  {
    image: Images.chrom,
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
  });
  return (
    <SafeAreaView>
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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    backgroundColor: Colors.bgColor
  },
  innerContainer: {
    padding: 10
  }
})