import { StyleSheet, View  , ActivityIndicator, ScrollView, Platform } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image';
import { SubmitButton } from '../../../../components/shared/SubmitButton';
import { Title } from 'react-native-paper';
import { Colors, Fonts, Values } from '../../../../constants';

const GuideInfoView = (props) => {

	const { isShowTitle , isLoading , isShowText, isShowImage , imageHeight , info} = props;

	return (
		<View style={styles.container}>			
			<ScrollView contentContainerStyle={{flexGrow:1}} style={{width: Values.deviceWidth}}>
				{isShowTitle && (
					<View style={styles.sliderHeader}>
						<Title style={{ fontFamily: Fonts.primaryBold }}>
							{info.title}
						</Title>
					</View>
				)}

				{!isLoading && isShowImage && (
					<View style={{ alignItems: 'center' , marginBottom: 5 }}>
					<FastImage
						style={[styles.imageContainer, { height: imageHeight && imageHeight != undefined ? parseInt(imageHeight) : 300 }]}
						source={{ uri: info.image }}				
					/>
					</View>
				)}
				{isLoading && <ActivityIndicator size={'small'} color={Colors.primaryColor} />}
				{isShowText && (
					<Title style={{ fontFamily: Fonts.primaryRegular, fontSize: 14, paddingRight:10 , paddingLeft:10 }}>
					{info.text}
					</Title>
				)}								
			</ScrollView>
			<SubmitButton
				style={{marginHorizontal:10, marginTop:10}}
				onSubmit={() => {
				if(props.onModalClose){
					props.onModalClose()
				}
			}}
			title="Close"></SubmitButton>
		</View>
		
	)
}

export default GuideInfoView

const styles = StyleSheet.create({
	container: {		
		paddingBottom:Platform.OS == 'android' ? 10 : 30,		
		flex:1,
		maxHeight: Values.modalHeight
	},
	sliderHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 10,
		marginHorizontal: 10
	  },
	imageContainer: {
		width: '80%',
	},

})