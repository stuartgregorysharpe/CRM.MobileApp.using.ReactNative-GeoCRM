import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Colors, Fonts, Values} from '../../../../constants';
const SKUFeedbackTable = props => {
  const {tableData, brand} = props;
  const tableHeaderData = ['', brand, 'Market:', 'FSI:'];
  const renderTableHeader = () => {
    return (
      <View style={styles.tableHeader}>
        {tableHeaderData.map((header, index) => {
          return (
            <View key={'hd' + index} style={styles.tableItem}>
              <Text style={styles.headerTitle}>{header}</Text>
            </View>
          );
        })}
      </View>
    );
  };

  const renderTableContent = () => {
    return tableData.map((tableItem, index) => {
      return (
        <View style={styles.tableRow} key={index + 'key'}>
          <View style={styles.tableItem}>
            <Text style={styles.categoryTitle}>{tableItem.category}:</Text>
          </View>
          <View style={styles.tableItem}>
            <Text style={[styles.rowText, {color: Colors.primaryColor}]}>
              {tableItem.brand}
            </Text>
          </View>
          <View style={styles.tableItem}>
            <Text style={[styles.rowText, {color: Colors.primaryColor}]}>
              {tableItem.market}
            </Text>
          </View>
          <View style={styles.tableItem}>
            <Text
              style={[
                styles.rowText,
                {
                  color: tableItem.isHighlightFsi
                    ? Colors.green2Color
                    : Colors.red2Color,
                  textDecorationLine: 'underline',
                },
              ]}>
              {tableItem.fsi}
            </Text>
          </View>
        </View>
      );
    });
  };
  return (
    <View style={[styles.container, props.style]}>
      {renderTableHeader()}
      {renderTableContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  tableHeader: {
    alignSelf: 'stretch',
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tableRow: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: Values.fontSize.xSmall,
    fontFamily: Fonts.primaryMedium,
    color: Colors.disabledColor,
  },
  categoryTitle: {
    fontSize: Values.fontSize.xSmall,
    fontFamily: Fonts.primaryMedium,
    color: Colors.blackColor,
    textAlign: 'right',
    alignSelf: 'flex-end',
  },
  rowText: {
    fontSize: Values.fontSize.xSmall,
    fontFamily: Fonts.primaryMedium,
    color: Colors.blackColor,
  },
  tableItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default SKUFeedbackTable;
