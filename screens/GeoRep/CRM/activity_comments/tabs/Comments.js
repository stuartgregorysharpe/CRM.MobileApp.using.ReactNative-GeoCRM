import React, {useState, useEffect , useRef} from 'react';
import {
  View,  
  StyleSheet,  
  ActivityIndicator,  
  FlatList,
  Platform,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {AppText} from '../../../../../components/common/AppText';
import { Constants, Strings } from '../../../../../constants';
import {expireToken} from '../../../../../constants/Helper';
import { GetRequestFormSubmissionsDAO, PostRequestDAO } from '../../../../../DAO';
import { FormSubmissionListItem } from './partial/FormSubmissionListItem';
import LoadMore from './partial/LoadMore';
import FormQuestionModal from '../../add_lead/modal/FormQuestionModal';
import { clearNotification, showNotification } from '../../../../../actions/notification.action';
import { getFormSubmissionPostJsonData } from '../../../Forms/questions/helper';
import { useSelector } from 'react-redux';
import AlertModal from '../../../../../components/modal/AlertModal';
import LoadingBar from '../../../../../components/LoadingView/loading_bar';

export default function Comments(props) {
  
  	const location_id = props.location_id;
	const [lists, setLists] = useState([]);
	const [isLoading , setIsLoading] = useState(false);
	const [page, setPage] = useState(0);
	const [locationName , setLocationName] = useState("");
	const formQuestionModalRef = useRef(null);
	const alertModalRef = useRef();
	const loadingBarRef = useRef();
	const [form, setForm] = useState({});

	const currentLocation = useSelector(state => state.rep.currentLocation);
	const dispatch = useDispatch();
	let isMount = true;

	useEffect(() => {
		isMount = true;
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
					if(res.status == Strings.Success){
						setLocationName(res.location_name);
						if(pageNumber == 0){
							setLists(res.submissions);
						}else{
							setLists([...lists, ...res.submissions]);
						}								
						setPage(pageNumber + 1);
					}else{
						dispatch(showNotification({type: Strings.Success , message: res.message , buttonText:'Ok', buttonAction:() => {
							dispatch(clearNotification());
						}}))
					}									
				}	
				setIsLoading(false);		
			}).catch((e) => {
				if(isMount){
					expireToken(dispatch , e);					
				}
				setIsLoading(false);
			});
		}
	}

	const editFormQuestion = async (form_answers, files) => {			
		showLoadingBar();
		const postDataJson = await getFormSubmissionPostJsonData(form.submission_id, location_id , currentLocation, form_answers, files , "edit" );
		setTimeout(() => {			
			PostRequestDAO.find(location_id, postDataJson , 'form_submission', 'forms/forms-submission' 
			, form.form_name , '' , null , null ).then( async(res) => {									
				hideLoadingBar();
				if(res.status === Strings.Success){								
					showMessage(res.message, 'Ok');
				}
			}).catch((e) => {
				hideLoadingBar();
				expireToken(dispatch, e , alertModalRef);
			});
		}, 1000);
	}

  	const onFormQuestionModalClosed = ({type, value}) => {
		if (type == Constants.actionType.ACTION_CLOSE) {
			formQuestionModalRef.current.hideModal();
		}
		if (type == Constants.actionType.ACTION_DONE) {
			if (value.form_answers != undefined && value.files != undefined) {						
				formQuestionModalRef.current.hideModal();
				
				editFormQuestion(value.form_answers, value.files);
				
								
			}
		}
	};

	const showLoadingBar = () => {
		if(loadingBarRef.current){
			loadingBarRef.current.showModal();
		}
	}
	const hideLoadingBar = () => {
		if(loadingBarRef.current){
			loadingBarRef.current.hideModal();
		}
	}
	const showMessage = (message) => {
		const delay = Platform.OS == 'ios' ? 500 : 0;
		setTimeout(() => {
			if(alertModalRef.current){
				alertModalRef.current.alert(message);
			}
		}, delay);
		
	}


	const renderItems = (item, index) => {
		return (
			<View key={index}>
				<FormSubmissionListItem
					onItemPress={(item) => {				
						setForm({submission_id: item.submission_id, form_name: item.form_name , location_id: location_id});
						if(formQuestionModalRef.current){
							formQuestionModalRef.current.showModal();
						}
					}}
					index={index}
					isStart={index === 0 ? true : false}
					isEnd={lists.length - 1 === index ? true : false}
					item={item}>
				</FormSubmissionListItem>
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

		<AlertModal 
			onModalClose={(res) => {
				setPage(0);
				getFormSubmissions(0);									
			}}
			ref={alertModalRef} /> 
		<LoadingBar ref={loadingBarRef} />

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
				
		<FormQuestionModal
				ref={formQuestionModalRef}
				hideClear={true}
				title=""
				form={form}
				submissionType={"edit"}				
				onButtonAction={onFormQuestionModalClosed}
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
