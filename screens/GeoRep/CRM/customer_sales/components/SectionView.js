import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import SvgIcon from '../../../../../components/SvgIcon';
import {Fonts, Values} from '../../../../../constants';
import {whiteLabel} from '../../../../../constants/Colors';
import {boxShadow, style} from '../../../../../constants/Styles';

const FooterView = props => {
  const {title, data} = props;
  const values = Object.values(data);
  return (
    <View style={styles.footerContainer}>
      <Text
        style={[
          styles.headerTitleText,
          {
            flex: 2,
            color: whiteLabel().inputText,
            fontWeight: 'bold',
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
              key={index + 'footer'}>
              {value}
            </Text>
          );
        })}
    </View>
  );
};
const CategoriesView = ({categories}) => {
  return categories.map((category, index) => {
    const {provider, values} = category;
    const _values = Object.values(values);
    return (
      <CategoryItemView
        title={provider}
        values={_values}
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
            fontWeight: '500',
            fontFamily: Fonts.primaryBold,
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
const MonthPricingView = ({label, value, color, arrow, style}) => {
  return (
    <View style={[{flexDirection: 'row', alignItems: 'center'}, style]}>
      {arrow != null && (
        <SvgIcon
          icon={arrow == 'down' ? 'Price_Fall_Icon' : 'Price_Rise_Icon'}
          width="20px"
          height="20px"
        />
      )}
      <Text
        style={{
          fontFamily: Fonts.primaryRegular,
          fontSize: 12,
          color: whiteLabel().mainText,
          marginLeft: 4,
        }}>
        {label + ': '}
      </Text>
      <Text
        style={{
          fontFamily: Fonts.primaryRegular,
          fontSize: 12,
          color: color,
        }}>
        {value}
      </Text>
    </View>
  );
};

const SectionCategoryHeaderView = props => {
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
const ExpandableCategoryView = props => {
  const [isExpanded, setIsExpanded] = useState(false);
  const {item} = props;
  const {category, last_month, current_month, sub_totals, category_items} =
    item;
  const month_labels = Object.keys(sub_totals);
  return (
    <View
      style={[
        styles.container,
        {
          borderWidth: 2,
          borderColor: whiteLabel().fieldBorder,
          borderRadius: 2,
        },
        boxShadow,
        props.style,
      ]}>
      <View
        style={[
          styles.expandableHeaderContainer,
          !isExpanded && {paddingBottom: 8},
          {paddingTop: 8},
        ]}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setIsExpanded(!isExpanded);
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'stretch',
            marginLeft: 12,
          }}>
          <SvgIcon icon="Cow_Green_Group_Icon" width="18" height="14" />
          <Text
            style={[
              styles.headerTitleText,
              {
                fontWeight: 'bold',
                marginLeft: 8,
                width: Values.deviceWidth * 0.2,
              },
            ]}>
            {category}
          </Text>
          <View style={{flex: 1}} />

          {!isExpanded && <MonthPricingView {...last_month} />}
          {!isExpanded && (
            <MonthPricingView {...current_month} style={{marginLeft: 8}} />
          )}

          <View style={{marginRight: 18, width: 20, height: 20, marginLeft: 8}}>
            {isExpanded ? (
              <SvgIcon icon="Drop_Up" width="23px" height="23px" />
            ) : (
              <SvgIcon icon="Drop_Down" width="23px" height="23px" />
            )}
          </View>
        </TouchableOpacity>
        {isExpanded && (
          <View style={{alignSelf: 'stretch'}}>
            <SectionCategoryHeaderView
              title="Provider"
              month_labels={month_labels}
            />
            <CategoriesView categories={category_items} />
            <FooterView title="Sub Total:" data={sub_totals} />
          </View>
        )}
      </View>
    </View>
  );
};

const SectionView = props => {
  const {item} = props;
  const sectionTitle = item.section_title;
  const {section_categories} = item;
  return (
    <View style={[styles.container, props.style]}>
      <View style={[styles.headerContainer, {marginBottom: 16}]}>
        <Text style={styles.headerTitleText}>{sectionTitle}</Text>
      </View>
      {section_categories.map((sectionCategory, index) => {
        return (
          <ExpandableCategoryView
            item={sectionCategory}
            key={'category' + index}
            style={{marginBottom: 20}}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  headerContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    borderBottomWidth: 2,
    paddingHorizontal: 12,
    borderBottomColor: whiteLabel().fieldBorder,
    paddingVertical: 4,
  },
  expandableHeaderContainer: {
    alignSelf: 'stretch',
    flexDirection: 'column',
    paddingVertical: 4,
  },
  headerTitleText: {
    fontSize: 12,
    fontFamily: Fonts.primaryRegular,
    color: whiteLabel().mainText,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 12,
    fontFamily: Fonts.primaryRegular,
    color: whiteLabel().mainText,
    textAlign: 'center',
    fontWeight: '500',
  },
  cellText: {
    fontSize: 12,
    fontFamily: Fonts.primaryRegular,
    color: whiteLabel().helpText,
    textAlign: 'center',
  },
  rowContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: whiteLabel().lineSeperator,
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
});

export default SectionView;
