import React, {useState, useEffect} from 'react';
import {
  View,  
  StyleSheet,  
  ActivityIndicator,  
  FlatList,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {AppText} from '../../../../../components/common/AppText';
import { Strings } from '../../../../../constants';
import {expireToken} from '../../../../../constants/Helper';
import { GetRequestFormSubmissionsDAO } from '../../../../../DAO';
import { FormSubmissionListItem } from './partial/FormSubmissionListItem';
import LoadMore from './partial/LoadMore';

export default function Comments(props) {
  
  const location_id = props.location_id;

  const [lists, setLists] = useState([]);
  const [isLoading , setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [locationName , setLocationName] = useState("");
 
  const dispatch = useDispatch();
  let isMount = true;

  useEffect(() => {

	getFormSubmissions(page);
	return () => {
		isMount = false;
	}
  }, []);

  const getFormSubmissions = pageNumber => {
	  if(!isLoading){
		setIsLoading(true);
		const postData = {
			location_id : location_id,
			page_nr: pageNumber
		}		
		GetRequestFormSubmissionsDAO.find(postData).then((res) => {		
			if(isMount){
				setLocationName(res.location_name);
				if(pageNumber == 0){
					setLists(res.submissions);
				}else{
					setLists([...lists, ...res.submissions]);
				}								
				setPage(pageNumber + 1);
				setIsLoading(false);
			}			
		}).catch((e) => {
			if(isMount){
				expireToken(dispatch , e);
				setIsLoading(false);
			}			
		});

	  }	  
  }
  
  const renderItems = (item, index) => {
    return (
      <View key={index}>
        <FormSubmissionListItem
          index={index}
          isStart={index === 0 ? true : false}
          isEnd={lists.length - 1 === index ? true : false}
          item={item}></FormSubmissionListItem>
      </View>
    );
  };

  const renderSeparator = () => (
    <View
      style={{
        backgroundColor: '#70707045',
        height: 0.5,
      }}
    />
  );

  return (
    <View style={styles.container}>      
		<View style={{marginTop: 5, marginBottom: 10 , marginLeft:5}}>
			<AppText size="medium" type="secondaryBold" title={Strings.CRM.Form_Activity_For + locationName}></AppText>
		</View>
		
		<FlatList
			data={lists}
			renderItem={({item, index}) => renderItems(item, index)}
			keyExtractor={(item, index) => index.toString()}
			contentContainerStyle={{paddingHorizontal: 7, marginTop: 0}}
			ItemSeparatorComponent={renderSeparator}
		/>

		{isLoading && <ActivityIndicator />}

		<LoadMore 
			loadMore={() => {
				getFormSubmissions(page);
			}}
		/>
		
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
	paddingHorizontal: 10
  },
});
