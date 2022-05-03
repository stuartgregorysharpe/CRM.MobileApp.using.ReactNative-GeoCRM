import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {getApiRequest, postApiRequest} from '../../../../../actions/api.action';
import {AppText} from '../../../../../components/common/AppText';
import {HistoryListItem} from './partial/HistoryListItem';
import {SubmitButton} from '../../../../../components/shared/SubmitButton';
import Colors, {whiteLabel} from '../../../../../constants/Colors';
import {getPostParameter, notifyMsg} from '../../../../../constants/Helper';
import {useDispatch} from 'react-redux';
import {Notification} from '../../../../../components/modal/Notification';
import Fonts from '../../../../../constants/Fonts';
import {useSelector} from 'react-redux';

export default function Activity(props) {
  const dispatch = useDispatch();
  const location_id = props.location_id;
  const [historyItems, setHistoryItems] = useState([]);
  const [comment, setComment] = useState('');
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const [title, setTitle] = useState('');

  useEffect(() => {
    loadHistory(page);
  }, []);

  const loadHistory = pageNumber => {
    if (!isLoading) {
      setIsLoading(true);
      let param = {page: pageNumber, location_id: location_id};

      getApiRequest('locations/location-history', param)
        .then(res => {
          setHistoryItems([...historyItems, ...res.history_items]);
          setPage(pageNumber + 1);
          console.log('results', res);
          setIsLoading(false);
          setTitle(res.location_name);
        })
        .catch(e => {
          setIsLoading(false);
        });
    }
  };

  const submitComment = () => {
    setIsLoading(true);
    var userParam = getPostParameter(currentLocation);
    let postData = {
      location_id: location_id,
      comment: comment,
      user_local_data: userParam.user_local_data,
    };
    postApiRequest('locations/location-add-comment', postData)
      .then(res => {
        if (res.status === 'success') {
          setComment('');
          notifyMsg(dispatch, 'Success');
        }
        setIsLoading(false);
      })
      .catch(e => {
        setIsLoading(false);
      });
  };

  const renderSeparator = () => (
    <View
      style={{
        backgroundColor: '#70707045',
        height: 0.5,
      }}
    />
  );

  const renderItems = (item, index) => {
    return (
      <View key={index}>
        <HistoryListItem
          index={index}
          isStart={index === 0 ? true : false}
          isEnd={historyItems.length - 1 === index ? true : false}
          item={item}></HistoryListItem>
      </View>
    );
  };

  const loadMore = () => {
    loadHistory(page);
  };

  return (
    <View style={styles.container}>
      <Notification />
      <View style={{marginTop: 5, marginBottom: 10}}>
        <AppText size="medium" type="title" title={title}></AppText>
      </View>

      <FlatList
        data={historyItems}
        renderItem={({item, index}) => renderItems(item, index)}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{paddingHorizontal: 7, marginTop: 0}}
        ItemSeparatorComponent={renderSeparator}
      />

      {isLoading && <ActivityIndicator />}

      <View style={{alignItems: 'center', flexDirection: 'column'}}>
        <TouchableOpacity
          style={{marginBottom: 10, marginTop: 10}}
          onPress={() => {
            loadMore();
          }}>
          <AppText
            type=""
            color={whiteLabel().mainText}
            size="small"
            title="Load More ..."></AppText>
        </TouchableOpacity>

        <TextInput
          style={{
            borderWidth: 1,
            borderRadius: 5,
            color: whiteLabel().subText,
            fontFamily: Fonts.secondaryRegular,
            borderColor: whiteLabel().fieldBorder,
            width: '90%',
            padding: 10,
            marginBottom: 10,
          }}
          outlineColor={Colors.primaryColor}
          activeOutlineColor={Colors.disabledColor}
          value={comment}
          placeholder="Add Comment"
          multiline={true}
          numberOfLines={1}
          onChangeText={text => {
            setComment(text);
          }}
        />

        {comment !== '' && (
          <View
            style={{
              marginBottom: 10,
              marginTop: 10,
              width: Dimensions.get('window').width * 0.94,
            }}>
            <SubmitButton
              onSubmit={() => {
                submitComment();
              }}
              title="Add comment"></SubmitButton>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
