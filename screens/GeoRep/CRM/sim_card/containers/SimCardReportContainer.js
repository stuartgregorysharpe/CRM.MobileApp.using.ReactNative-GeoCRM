import { Dimensions, StyleSheet, Text, Platform, View } from 'react-native'
import React , { useEffect , useState } from 'react'
import SimCardReportView from '../components/SimCardReportView'
import { ScrollView } from 'react-native-gesture-handler'
import GetRequestMetrics from '../../../../../DAO/sims/GetRequestMetrics'
import { Strings } from '../../../../../constants'

const SimCardReportContainer = (props) => {

	
	const { locationId } = props;

	const [networks, setNetworks] = useState([]);
	const [monthLabels, setMonthLabels] = useState([]);
	const [data, setData] = useState(null);

	useEffect(() => {
		getMetricsData();
	},[]);

	const getMetricsData = () => {
		const postData = {
			location_id : locationId
		}	
		GetRequestMetrics.find(postData).then((res) => {
			if(res.status == Strings.Success){
				console.log("response => ", JSON.stringify(res));
				setNetworks(res.networks);
				setMonthLabels(res.month_labels);
				setData(res.data);
			}
			
		}).catch((e) => {

		})
	}
	
	return (
		<View 
			style={styles.container}>
			{
				data != null && 
				<SimCardReportView
					networks={networks}
					monthLabels={monthLabels}
					data={data}	
				/>
			}
			
		</View>
	)

}

export default SimCardReportContainer

const styles = StyleSheet.create({
	container : {						
		alignSelf:'stretch',
		marginHorizontal:10,			
		marginBottom: Platform.OS == 'android' ? 50 : 75
	}
})