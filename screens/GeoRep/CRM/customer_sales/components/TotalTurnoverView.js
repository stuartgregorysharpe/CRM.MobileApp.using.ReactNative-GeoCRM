import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Colors, Fonts} from '../../../../../constants';
import {whiteLabel} from '../../../../../constants/Colors';

const HeaderView = props => {
  const {title, month_labels} = props;
  return (
    <View style={styles.headerContainer}>
      <Text style={[styles.headerTitleText, {flex: 2}]}>{title}</Text>
      {month_labels != null &&
        month_labels.map((label, index) => {
          return (
            <Text style={[styles.headerText, {flex: 1}]} key={index + 'header'}>
              {label}
            </Text>
          );
        })}
    </View>
  );
};

const FooterView = props => {
  const {title, grand_totals} = props;
  const values = Object.values(grand_totals);
  return (
    <View style={styles.footerContainer}>
      <Text
        style={[
          styles.headerTitleText,
          {
            flex: 2,
            color: whiteLabel().inputText,
          },
        ]}>
        {title}
      </Text>
      {values != null &&
        values.map((item, index) => {
          const {value, color} = item;
          return (
            <Text
              style={[styles.cellText, {flex: 1, color: color}]}
              key={index + 'header'}>
              {value}
            </Text>
          );
        })}
    </View>
  );
};
const CategoriesView = ({categories}) => {
  return categories.map((category, index) => {
    const {description, months} = category;
    const values = Object.values(months);
    return (
      <CategoryItemView
        title={description}
        values={values}
        key={index + 'category'}
        isLast={index == categories.length - 1}
      />
    );
  });
};
const CategoryItemView = props => {
  const {title, values, isLast} = props;

  return (
    <View style={[styles.rowContainer, isLast && {borderBottomWidth: 0}]}>
      <Text
        style={[
          styles.headerText,
          {
            flex: 2,
            textAlign: 'left',
            fontWeight: 'bold',
            fontFamily: Fonts.primaryBold,
          },
        ]}>
        {title}
      </Text>
      {values != null &&
        values.map((item, index) => {
          const {value, color} = item;
          return (
            <Text
              style={[styles.cellText, {flex: 1, color: color}]}
              key={index + 'header'}>
              {value}
            </Text>
          );
        })}
    </View>
  );
};

const TotalTurnoverView = props => {
  const {data} = props;
  if (!data) return null;
  const {month_labels, categories, grand_totals} = data;
  return (
    <View style={[styles.container, props.style]}>
      <HeaderView title="Categories" month_labels={month_labels} />
      <CategoriesView categories={categories} />
      <FooterView title="Grand Totals:" grand_totals={grand_totals} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    borderWidth: 2,
    borderColor: whiteLabel().fieldBorder,
    borderRadius: 2,
  },
  headerContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    borderBottomWidth: 2,
    paddingHorizontal: 12,
    borderBottomColor: whiteLabel().fieldBorder,
    paddingVertical: 4,
  },
  footerContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    borderTopWidth: 2,
    paddingHorizontal: 12,
    borderTopColor: whiteLabel().fieldBorder,
    paddingVertical: 4,
  },
  rowContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: whiteLabel().lineSeperator,
    paddingVertical: 4,
  },
  headerText: {
    fontSize: 12,
    fontFamily: Fonts.primaryRegular,
    color: whiteLabel().mainText,
    textAlign: 'center',
    fontWeight: '500',
  },
  headerTitleText: {
    fontSize: 12,
    fontFamily: Fonts.primaryRegular,
    color: whiteLabel().mainText,
    textAlign: 'left',
    fontWeight: '600',
  },
  cellText: {
    fontSize: 12,
    fontFamily: Fonts.primaryRegular,
    color: whiteLabel().helpText,
    textAlign: 'center',
  },
});

export default TotalTurnoverView;
