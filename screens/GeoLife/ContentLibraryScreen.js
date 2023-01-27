import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet, ScrollView, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Searchbar from '../../components/SearchBar';
import Card from '../../screens/GeoRep/ContentLibrary/partial/Card';
import Colors, { } from '../../constants/Colors';
import { CHANGE_LIBRARY_CHILD_STATUS } from '../../actions/actionTypes';
import Fonts from '../../constants/Fonts';

const libraryLists = [
  {
    title: "Best Practice Examples",
    number: 11,
    children: [
      {
        icon: "Description",
        title: "Code & Conduct",
        subtitle: "71.96kb, Modified on 2021_05_29"
      }
    ]
  },
  {
    title: "Price List May 2020",
    number: 6,
    children: [
      {
        icon: "Description",
        title: "Code & Conduct",
        subtitle: "71.96kb, Modified on 2021_05_29"
      }
    ]
  },
  {
    title: "Policies & Procedures",
    number: 2,
    children: [
      {
        icon: "Description",
        title: "Code & Conduct",
        subtitle: "71.96kb, Modified on 2021_05_29"
      },
      {
        icon: "Wallpaper",
        title: "Mobile Phone Policy",
        subtitle: "43.96kb, Modified on 2021_05_29"
      },
      {
        icon: "Description",
        title: "Health & Safety Policy.",
        subtitle: "23.96kb, Modified on 2021_05_29"
      },
      {
        icon: "Description",
        title: "Internet & Email Policy",
        subtitle: "21.96kb, Modified on 2021_05_29"
      },
      {
        icon: "Video_Library",
        title: "Help Video",
        subtitle: "21.96kb, Modified on 2021_05_29"
      }
    ]
  },
  {
    title: "Trade Presenters",
    number: 4,
    children: [
      {
        icon: "Description",
        title: "Code & Conduct",
        subtitle: "71.96kb, Modified on 2021_05_29"
      }
    ]
  },
  {
    title: "Training Videos",
    number: 3,
    children: [
      {
        icon: "Description",
        title: "Code & Conduct",
        subtitle: "71.96kb, Modified on 2021_05_29"
      }
    ]
  },
  {
    title: "Promo Grid",
    number: 8,
    children: [
      {
        icon: "Description",
        title: "Code & Conduct",
        subtitle: "71.96kb, Modified on 2021_05_29"
      }
    ]
  },
  {
    title: "Field Sales Guide",
    number: 1,
    children: [
      {
        icon: "Description",
        title: "Code & Conduct",
        subtitle: "71.96kb, Modified on 2021_05_29"
      }
    ]
  },
];

export default function ContentLibraryScreen({screenProps}) {
  const showLibraryChild = useSelector(state => state.rep.showLibraryChild);
  const dispatch = useDispatch();
  const [childList, setChildList] = useState({});

  useEffect(() => {
    if (screenProps) {
      screenProps.setOptions({
        title: "Content Library"
      });
    }
  });

  const showChildItem = (index) => {
    dispatch({type: CHANGE_LIBRARY_CHILD_STATUS, payload: true})
    setChildList(libraryLists[index]);
  }

  if (showLibraryChild) {
    return (
      <SafeAreaView>
        <ScrollView style={styles.container}>
          <View style={styles.innerContainer}>
            <Text style={{ fontSize: 18, color: '#000', fontFamily: Fonts.secondaryBold }}>{childList.title}</Text>
            {childList.children.map((item, index) => (
              <Card icon={item.icon} title={item.title} subtitle={item.subtitle} key={index} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Searchbar />
        <View style={styles.innerContainer}>
          {libraryLists.map((item, index) => (
            <Card title={item.title} number={item.number} key={index} onPress={showChildItem.bind(null, index)}/>
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