import React, { useState, useEffect , useRef } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  Dimensions,
  ActivityIndicator,
  Platform,
  Keyboard,  
} from 'react-native';
import {getApiRequest, postApiRequest} from '../../../../../actions/api.action';
import {AppText} from '../../../../../components/common/AppText';
import {HistoryListItem} from './partial/HistoryListItem';
import {SubmitButton} from '../../../../../components/shared/SubmitButton';
import Colors, {whiteLabel} from '../../../../../constants/Colors';
import {expireToken, getPostParameter, notifyMsg} from '../../../../../constants/Helper';
import {useDispatch} from 'react-redux';
import Fonts from '../../../../../constants/Fonts';
import {useSelector} from 'react-redux';
import LoadMore from './partial/LoadMore';
import AlertDialog from '../../../../../components/modal/AlertDialog';
import LoadingBar from '../../../../../components/LoadingView/loading_bar';
import { Strings } from '../../../../../constants';

export default function Activity(props) {

  const location_id = props.location_id;
    
  const [historyItems, setHistoryItems] = useState([]);
  const [comment, setComment] = useState('');
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);  
  const [isSubmit, setIsSubmit] = useState(false);
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const [title, setTitle] = useState('');
  const loadingBarRef = useRef(null);
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();  

  useEffect(() => {    
    loadHistory(page);    
  }, []);

  const loadHistory = pageNumber => {
    if (!isLoading) {
      setIsLoading(true);
      let param = {page: pageNumber, location_id: location_id};
      getApiRequest('locations/location-history', param)
        .then(res => {
          
            if(pageNumber == 0){
              setHistoryItems(res.history_items);
            }else{
              setHistoryItems([...historyItems, ...res.history_items]);
            }          
            setPage(pageNumber + 1);
            setIsLoading(false);
            setTitle(res.location_name);
                    
        })
        .catch(e => {
          
            setIsLoading(false);
            expireToken(dispatch, e);
                    
        });        
    }
  };

  const submitComment = () => {

    if(!isLoading &&  !isSubmit){
      setIsSubmit(true);
      loadingBarRef.current.showModal();
      var userParam = getPostParameter(currentLocation);
      let postData = {
        location_id: location_id,
        comment: comment,
        user_local_data: userParam.user_local_data,
      };
  
      postApiRequest('locations/location-add-comment', postData)
        .then(res => {
          hideLoadingBar();
          if (res.status === Strings.Success) {
            setComment('');
            showConfirmModal(res.message); 
          }
          setIsSubmit(false);
          loadHistory(0);          
        })
        .catch(e => {
          hideLoadingBar();
          setIsSubmit(false);          
          expireToken(dispatch ,e);
      });

    }        
  };

  const hideLoadingBar = () => {
    if(loadingBarRef.current){
      loadingBarRef.current.hideModal();
    }
  }

  const showConfirmModal = (message) => {
    setMessage(message);
    if(Platform.OS == 'android'){
      setIsConfirmModal(true);
    }else{
      setTimeout(() => {
        setIsConfirmModal(true);
      }, 500);
    }
  }
 
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
                  
      <AlertDialog
          visible={isConfirmModal}
          message={message}
          onModalClose={() => {
            setIsConfirmModal(false)
          }}></AlertDialog>

      <LoadingBar 
        backButtonDisabled={true}
        ref={loadingBarRef}  />

      <View style={{marginTop: 5, marginBottom: 10}}>
        <AppText size="medium" type="secondaryMedium" title={title}></AppText>
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

        <LoadMore 
          loadMore={() => {
            loadMore();
          }}
        />

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
                
                Keyboard.dismiss();
                var time = 0;
                if(Platform.OS == 'ios'){
                  time = 500;
                }
                setTimeout(() => {
                  submitComment();
                }, time);

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
