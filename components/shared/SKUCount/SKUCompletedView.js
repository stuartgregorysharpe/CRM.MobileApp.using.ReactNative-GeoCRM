import React, {useState, useEffect, useMemo} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Colors, Fonts, Values} from '../../../constants';

const SKUCountCompletedView = props => {
  const {item} = props;
  if (!item) return null;
  const brand = item.brand;
  constructTableData = item => {
    const categories = item.categories;
    const completed_data = item.completed_data;
    const market_targets = item.market_targets;
    if (!completed_data) return [];
    return categories.map(category => {
      const brand = completed_data['category_value'][category] + '%';
      const market = market_targets[category] + '%';
      const fsi = completed_data['fsi_values'][category] + '%';
      const isHighlightFsi =
        Number(completed_data['fsi_values'][category]) >= 100;
      return {
        category,
        brand,
        market,
        fsi,
        isHighlightFsi,
      };
    });
  };
  const tableData = useMemo(() => constructTableData(item));
  const tableHeaderData = ['', brand, 'Market:', 'FSI:'];
  const renderTableHeader = () => {
    return (
      <View style={styles.tableHeader}>
        {tableHeaderData.map(header => {
          return (
            <View style={styles.tableItem}>
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
            <Text style={styles.categoryTitle}>{tableItem.category}</Text>
          </View>
          <View style={styles.tableItem}>
            <Text style={[styles.categoryTitle, {color: Colors.primaryColor}]}>
              {tableItem.brand}
            </Text>
          </View>
          <View style={styles.tableItem}>
            <Text style={[styles.categoryTitle, {color: Colors.primaryColor}]}>
              {tableItem.market}
            </Text>
          </View>
          <View style={styles.tableItem}>
            <Text
              style={[
                styles.categoryTitle,
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
  },
  tableItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default SKUCountCompletedView;
