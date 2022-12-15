
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppText } from '../../../../../components/common/AppText';
import { Colors } from '../../../../../constants';

const CategoryListItem = ({ data,toggle}) => {
  return (
    <TouchableOpacity
      onPress={() => { }}
      style={{ marginHorizontal: 15 }}>
      <View
        style={styles.container}>
        <View style={{ flex: 4 }}>
          <AppText
            size="big"
            type="secondaryBold"
            title={data.category}
            style={{ fontSize: 12.5,marginRight:5 }}></AppText>
        </View>
        <View style={{ flex: 2,alignItems:'center',marginHorizontal:2 }}>
          <AppText
            type="secondaryMedium"
            title={toggle==='value'?data.nsv:data.vol_tns}
            color={Colors.textColor}
            style={[styles.row_m_text]}></AppText>
        </View>
        <View style={{ flex: 2.1,alignItems:'center' }}>
          <AppText
            type="secondaryMedium"
            title={toggle==='value'?data.returns_value:data.returns_tns}
            color={Colors.textColor}
            style={styles.row_m_text}></AppText>
        </View>
        <View style={{ flex: 2,alignItems:'center' }}>
          <AppText
            type="secondaryMedium"
            title={data.return_percent}
            color={Colors.textColor}
            style={styles.row_m_text}></AppText>
        </View>
      </View>
      <View
        style={{ height: 1, backgroundColor: Colors.lightGreyColor }}></View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row_m_text: {
    fontSize: 10.4,
  }
});

export default CategoryListItem;