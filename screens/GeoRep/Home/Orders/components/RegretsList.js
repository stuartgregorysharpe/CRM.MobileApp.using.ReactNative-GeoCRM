import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {AppText} from '../../../../../components/common/AppText';
import {Fonts, Values} from '../../../../../constants';
import {whiteLabel} from '../../../../../constants/Colors';
import RegretItem from './RegretItem';

const RegretsList = props => {
  const {items} = props;
  const loadMoreData = () => {
    console.log('regretslist load more data');
    if (props.loadMoreData) {
      props.loadMoreData();
    }
  };
  const renderItem = (item, index) => {
    const isLast = index == items.length - 1;
    return (
      <RegretItem
        item={item}
        key={index + 'item'}
        onItemAction={props.onItemAction}
        isLast={isLast}
      />
    );
  };
  const renderFooter = () => {
    if (!props.isLoading) {
      return <View style={{height: 50, alignSelf: 'stretch'}} />;
    }
    return (
      <View style={styles.footer}>
        <TouchableOpacity>
          <AppText
            type=""
            color={whiteLabel().mainText}
            size="small"
            title="Load More ..."></AppText>

          <ActivityIndicator color="white" style={{marginLeft: 8}} />
        </TouchableOpacity>
        <View style={{height: 50, alignSelf: 'stretch'}} />
      </View>
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
        <Text style={styles.title}>Order Details</Text>
      </View>
      <FlatList
        data={items}
        renderItem={({item, index}) => renderItem(item, index)}
        keyExtractor={(item, index) => index.toString()}
        extraData={this.props}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => {
          return renderFooter();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    marginHorizontal: 8,
  },
  title: {
    fontSize: Values.fontSize.small,
    fontFamily: Fonts.primaryBold,
    color: whiteLabel().mainText,
    fontWeight: 'bold',
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RegretsList;
