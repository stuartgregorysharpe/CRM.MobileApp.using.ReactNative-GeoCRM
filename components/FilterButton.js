import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

export default function FilterButton(props) {
  return (
    <Card style={styles.card}>
      <Card.Title
        title={props.text}
        titleStyle={styles.cardtitle}
        subtitle={props.subText}
        right={() => <Image style={styles.dropdownImage} source={require("../assets/images/Drop_Down.png")} />}
      />
    </Card>
  )
}
  
const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
  },
  cardtitle: {
    color: '#23282D',
    fontSize: 16,
    fontFamily: 'Gilroy-Medium',
  },
  dropdownImage: {
    width: 25,
    height: 25,
    marginRight: 10
  }
})
