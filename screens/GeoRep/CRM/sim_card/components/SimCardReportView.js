import { Dimensions, StyleSheet, Text, View , Platform } from 'react-native'
import React , { useState } from 'react'
import Carousel from 'react-native-reanimated-carousel';
import {
	BaseButton,
	GestureHandlerRootView
  } from 'react-native-gesture-handler';
import NetworkItem from './NetworkItem';
import TableView from './TableView';
import SvgIcon from '../../../../../components/SvgIcon';

const PAGE_WIDTH = Dimensions.get("screen").width;
const COUNT = 3;

const SimCardReportView = (props) => {

  	const { monthLabels , data , networks } = props;

	const [selectedIndex, setSelectedIndex] = useState(0);

  	const baseOptions = {
		vertical: false,
		width: ( PAGE_WIDTH - 40) / COUNT,
		height: 50,
		style: {
			width: PAGE_WIDTH - 40,
		},
	};

	return (
		<View>
			<View style={{flexDirection:'row', alignItems:'center'}}>
				<GestureHandlerRootView>      
					<Carousel
						{ ...baseOptions }
						loop					
						data={networks}					
						onSnapToItem={(index) => {						
						}}
						renderItem={({ index }) => (			
							<NetworkItem 
								key={index}
								onItemSelected={(index) => {
									setSelectedIndex(index);
								}}
								item={networks[index]} index={index} selectedIndex={selectedIndex} />						
						)}
					/>						
				</GestureHandlerRootView>
				<SvgIcon icon="Angle_Left_form" width='15' height='15' style={{marginLeft:5, marginRight:5}} />
			</View>

			<TableView monthLabels = {monthLabels} data={data}  networks={networks} selectedIndex={selectedIndex} />

		</View>
  )

}

export default SimCardReportView

const styles = StyleSheet.create({})