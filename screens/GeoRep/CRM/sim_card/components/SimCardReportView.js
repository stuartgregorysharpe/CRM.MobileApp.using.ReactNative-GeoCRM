import { Dimensions, StyleSheet, View , ScrollView } from 'react-native'
import React , { useState } from 'react'
import NetworkItem from './NetworkItem';
import TableView from './TableView';
import SvgIcon from '../../../../../components/SvgIcon';

const SimCardReportView = (props) => {

  	const { monthLabels , data , networks } = props;
	const [selectedIndex, setSelectedIndex] = useState(0);


	return (
		<View>
			<View style={{flexDirection:'row', alignItems:'center'}}>
				<ScrollView 
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{
						marginTop:12,
						flexGrow: 1,						
					}}
					horizontal={true} >

					{
						networks.map((item, index) => {
							return (
								<NetworkItem 
									key={index}
									onItemSelected={(index) => {
										setSelectedIndex(index);
									}}
									item={item} index={index} selectedIndex={selectedIndex} />		
							)
						})
					}
				</ScrollView>
				<SvgIcon icon="Angle_Left_form" width='15' height='15' style={{marginLeft:5, marginRight:5}} />
			</View>

			<TableView monthLabels = {monthLabels} data={data}  networks={networks} selectedIndex={selectedIndex} />

		</View>
  )

}

export default SimCardReportView

const styles = StyleSheet.create({})