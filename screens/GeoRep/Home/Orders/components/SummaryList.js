import React from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {Fonts, Values} from '../../../../../constants';
import {whiteLabel} from '../../../../../constants/Colors';
import {boxShadow, style} from '../../../../../constants/Styles';
import SummaryItem from './SummaryItem';

const SummaryList = props => {
  const {items} = props;
  const loadMoreData = () => {
    if (props.loadMoreData) {
      props.loadMoreData();
    }
  };
  const renderItem = (item, index) => {
    const isLast = index == items.length - 1;
    return (
      <SummaryItem
        item={item}
        key={index + 'item'}
        onItemAction={props.onItemAction}
        isLast={isLast}
      />
    );
  };
  return (
    <View style={[styles.container, props.style]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 40,
          marginBottom: 8,
          borderBottomColor: whiteLabel().actionOutlineButtonBorder,
          borderBottomWidth: 2,
        }}>
        <Text style={[styles.title, {flex: 4}]}>Order Details</Text>
        <Text style={[styles.title, {flex: 1}]}>Status</Text>
      </View>
      <FlatList
        data={items}
        renderItem={({item, index}) => renderItem(item, index)}
        keyExtractor={(item, index) => index.toString()}
        extraData={this.props}
        onEndReached={loadMoreData}
        onEndReachedThreshold={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    marginHorizontal: 8,
    flex: 1,
  },
  title: {
    fontSize: Values.fontSize.small,
    fontFamily: Fonts.primaryBold,
    color: whiteLabel().mainText,
    fontWeight: 'bold',
  },
});

export default SummaryList;
