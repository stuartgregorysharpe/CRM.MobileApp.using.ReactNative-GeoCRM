import {View, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useImperativeHandle, useState} from 'react';
import {AppText} from '../../../../components/common/AppText';
import {getApiRequest} from '../../../../actions/api.action';
import SearchBar from '../../../../components/SearchBar';
import Colors from '../../../../constants/Colors';
import ActionListHeader from './components/ActionListHeader';
import {useDispatch} from 'react-redux';
import {expireToken} from '../../../../constants/Helper';

const Actions = React.forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    onLoad: () => {
      _onLoad();
    },
  }));

  const [stockLists, setStockLists] = useState([]);
  const [originStockLists, setOriginStockLists] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const {locationId, tabIndex} = props;
  const dispatch = useDispatch();

  useEffect(() => {
    _onLoad();
  }, [locationId]);

  const _onLoad = () => {
    var postData = {};
    if (locationId != undefined) {
      postData = {location_id: locationId};
    }
    getApiRequest('actionsitems/action-items-list', postData)
      .then(res => {
        setOriginStockLists(res.action_items);
        if (tabIndex != undefined) {
          onApplyStatusFilter(res.action_items);
        } else {
          setStockLists(res.action_items);
        }
      })
      .catch(e => {
        expireToken(dispatch, e);
      });
  };

  useEffect(() => {
    onApplyStatusFilter(originStockLists);
  }, [tabIndex]);

  const onApplyStatusFilter = lists => {
    console.log('onApplyStatusFilter');

    var tmp = [];
    if (tabIndex == 0) {
      lists.map((item, index) => {
        if (item.status !== 'Completed') {
          tmp.push(item);
        }
      });
    } else if (tabIndex == 1) {
      lists.map((item, index) => {
        if (item.status !== 'Completed' && item.category === 'task') {
          tmp.push(item);
        }
      });
    } else if (tabIndex == 2) {
      lists.map((item, index) => {
        if (item.status !== 'Completed' && item.category === 'action') {
          tmp.push(item);
        }
      });
    } else {
      lists.map((item, index) => {
        if (item.status === 'Completed') {
          tmp.push(item);
        }
      });
    }
    setStockLists(tmp);
  };

  const onFilter = text => {
    if (text !== '' && text !== undefined) {
      var tmp = [];
      originStockLists.map((item, index) => {
        if (item.action_name.toLowerCase().includes(text.toLowerCase())) {
          tmp.push(item);
        }
      });
      setStockLists(tmp);
    } else {
      setStockLists([...originStockLists]);
    }
  };

  const renderItems = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (props.onPressActionItem) {
            props.onPressActionItem(item);
          }
        }}
        style={{marginHorizontal: 15}}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
            marginBottom: 3,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{flex: 3}}>
            <AppText
              size="big"
              type="secondaryBold"
              title={item.action_name}
              style={{fontSize: 12.5}}></AppText>
            <AppText
              type="secondaryMedium"
              title={item.location_name}
              color={Colors.disabledColor}
              style={{fontSize: 10.4}}></AppText>
          </View>
          <View style={{flex: 2}}>
            <AppText
              type="secondaryMedium"
              title={item.action_item_type}
              color={Colors.disabledColor}
              style={{fontSize: 10.4}}></AppText>
          </View>
          <View style={{flex: 2}}>
            <AppText
              type="secondaryMedium"
              title={item.due_date}
              color={Colors.disabledColor}
              style={{fontSize: 10.4}}></AppText>
          </View>
        </View>
        <View
          style={{height: 1, backgroundColor: Colors.lightGreyColor}}></View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flexDirection: 'column', flex: 1}}>
      <SearchBar
        onSearch={text => {
          onFilter(text);
          setSearchKeyword(text);
        }}
        initVal={searchKeyword}
        isFilter={true}
        animation={() => {}}
      />

      <View style={{flexDirection: 'column'}}>
        <FlatList
          ListHeaderComponent={() => <ActionListHeader />}
          removeClippedSubviews={false}
          initialNumToRender={10}
          data={stockLists}
          renderItem={({item, index}) => renderItems(item, index)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
});

export default Actions;
