import { StyleSheet, Text, View } from 'react-native'
import React , { useEffect , useRef } from 'react'
import LoadingBar from '../LoadingView/loading_bar'
import { useSelector , useDispatch } from 'react-redux'
import { clearNotification } from '../../actions/notification.action'

const LoadingProgressBar = () => {

	const notification = useSelector(state => state.notification);
	const dispatch = useDispatch();
	const loadingBarRef = useRef(null);

	useEffect(() => {
		console.log("notification",notification)
		if (notification.loadingBarVisible && notification.loadingBarVisible == true && notification.type == 'loading') {
			if (notification.autoHide === true)
				setTimeout(() => dispatch(clearNotification()), 2000);
			if(loadingBarRef.current){
				console.log("trigger  times");
				loadingBarRef.current.showModal();
			}	
		}else{
			if(loadingBarRef.current){				
				loadingBarRef.current.hideModal();
			}	
		}
	}, [notification]);

  return (
    <View>
        <LoadingBar 
			ref={loadingBarRef}
		/>
    </View>
  )
}

export default LoadingProgressBar

const styles = StyleSheet.create({})