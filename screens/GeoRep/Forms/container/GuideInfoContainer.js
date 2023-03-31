import { StyleSheet, View , Dimensions , Image } from 'react-native'
import React , { useEffect , useState } from 'react'
import GuideInfoView from '../components/GuideInfoView';

const GuideInfoContainer = (props) => {

	const { info , visible } = props;

	const isShowTitle = info && info.title != undefined && info.title != '';
	const isShowImage = info && info.image != undefined && info.image != '';
	const isShowText = info && info.text != undefined && info.text != '';
	const [isLoading, setIsLoading] = useState(false);
	const [imageHeight, setImageHeight] = useState(undefined);
  
	useEffect(() => {
	  getImageHeight();
	}, [info]);
  
	const getImageHeight = () => {
	  setIsLoading(true);
	  Image.getSize(info.image, (width, height) => {
		const screenWidth = Dimensions.get('window').width * 0.8;
		const screenHeight = Dimensions.get("window").height;
		const scaleFactor = width / screenWidth;
		var requiredImageHeight = height / scaleFactor;      		
		setImageHeight(requiredImageHeight);
		setIsLoading(false);
	  }, (error) => {
		setIsLoading(false);
		console.log(error);
	  });
	}
		
	return (		
		<View style={{ alignSelf:'stretch' }}>
			<GuideInfoView 
				{...props}
				isShowTitle={isShowTitle}
				isLoading={isLoading} 
				isShowImage={isShowImage}
				imageHeight={imageHeight}
				isShowText={isShowText}
			/>
		</View>
	)
}

export default GuideInfoContainer

const styles = StyleSheet.create({})