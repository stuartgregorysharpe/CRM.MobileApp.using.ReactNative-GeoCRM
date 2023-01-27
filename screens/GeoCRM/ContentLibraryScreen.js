import React, { useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, ScrollView } from 'react-native';

import Searchbar from '../../components/SearchBar';
import Card from '../../screens/GeoRep/ContentLibrary/partial/Card';
import Colors , { } from '../../constants/Colors';


const lists = [
  {
    icon: "Description",
    title: "Best Practice Examples",
    subtitle: "21.96kb, Modified on 2021_05_29"
  },
  {
    icon: "Wallpaper",
    title: "Price List May 2020",
    subtitle: "21.96kb, Modified on 2021_05_29"
  },
  {
    icon: "Description",
    title: "Policies & Procedures",
    subtitle: "21.96kb, Modified on 2021_05_29"
  },
  {
    icon: "Description",
    title: "Trade Presenters",
    subtitle: "21.96kb, Modified on 2021_05_29"
  },
  {
    icon: "Video_Library",
    title: "Training Videos",
    subtitle: "21.96kb, Modified on 2021_05_29"
  },
  {
    icon: "Description",
    title: "Promo Grid",
    subtitle: "21.96kb, Modified on 2021_05_29"
  },
  {
    icon: "Description",
    title: "Field Sales Guide",
    subtitle: "21.96kb, Modified on 2021_05_29"
  }
];

export default function ContentLibraryScreen({screenProps}) {
  useEffect(() => {
    if (screenProps) {
      screenProps.setOptions({
        title: "Content Library"
      });
    }
  });
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Searchbar />
        <View style={styles.innerContainer}>
          {lists.map((item, index) => (
            <Card icon={item.icon} title={item.title} subtitle={item.subtitle} key={index} />
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