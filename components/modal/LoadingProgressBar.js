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
		if (notification.loadingBarVisible && notification.loadingBarVisible == true && notification.type == 'loading') {
						
			if(loadingBarRef.current){				
				loadingBarRef.current.showModal();
			}	
		}else {
			if(loadingBarRef.current){
				loadingBarRef.current.hideModal();
			}
		}
	}, [notification.loadingBarVisible]);

  return (
	<LoadingBar 
		backButtonDisabled={true}
		closableWithOutsideTouch={false}
		ref={loadingBarRef}
	/>
  )
}

export default LoadingProgressBar

const styles = StyleSheet.create({})