import { StyleSheet, Text, View } from 'react-native'
import React , {useState ,useEffect} from 'react'
import SearchBar from '../../../../components/SearchBar'
import DropdownSelection from './DropdownSelection'
import SaleType from './SaleType'
import SearchLocationView from '../../Stock/stock/components/SearchLocationView'
import SearchLocationContainer from '../../Stock/stock/container/SearchLocationContainer'
import LocationInfo from './LocationInfo'
import { useSelector } from 'react-redux'
import { getLocalData } from '../../../../constants/Storage'
import { getLocationInfo } from '../../../../sqlite/DBHelper'
import CurrencyType from './CurrencyType'

const SetupFieldView = (props) => {

	const { transaction_types, currency, warehouse} = props;
	const [isSearchStart, setIsSearchStart] = useState(false)
	const [selectedLocation ,setSelectedLocation] = useState(null)
	const [selectedCurrency , setSelectedCurrency] = useState(null)
	const isCheckin = useSelector(state => state.location.checkIn);
	
	useEffect(() => {
		if(isCheckin){
			getCheckinLocationInfo();
		}
	}, [isCheckin])

	const getCheckinLocationInfo = async () => {
		const  locationId = await getLocalData("@specific_location_id");
		console.log("loca id", locationId)
		const  locInfo = await getLocationInfo(locationId);
		if(locInfo.name != '')
			setSelectedLocation(locInfo);
	}

	const onSubmit = (location, locationId) => {
		console.log(location)
		setIsSearchStart(false);
		setSelectedLocation(location)
	}

	const onStartSearch = (flag) => {
		setIsSearchStart(true)
	}

	const onCurrencyItemSelected = (item) => {
		console.log("currenc" , item)
		setSelectedCurrency(item);
	}

	return (
		<View>
						
			<SearchLocationContainer 
				type="setup"
				onSubmit={onSubmit} 
				onStartSearch={onStartSearch}
				isSkipLocationIdCheck
				{...props} />

			{
				selectedLocation  != null && 
				<LocationInfo 
					onClose={()=>{
						setSelectedLocation(null)
					}}
					location={selectedLocation} /> 
			}
			
			{
				!isSearchStart && 
				<View>
					<SaleType transaction_types={transaction_types} />

					<DropdownSelection
						title = "Currency Type"
						selectedItem={selectedCurrency != null ? selectedCurrency.abbreviation + "(" + selectedCurrency.symbol +  ")" : ''}
						items={currency ? currency.options : []}
					>
						<CurrencyType 
							selectedItem={selectedCurrency}
							onItemSelected={onCurrencyItemSelected}							
							lists={currency ? currency.options : []}></CurrencyType>						
					</DropdownSelection>

					<DropdownSelection
						title = "Warehouse"
						selectedItem="Cape Town Warehouse"
						items={warehouse ? warehouse.options : []}
					>

					</DropdownSelection>

				</View>
			}
		</View>
	)
}

export default SetupFieldView

const styles = StyleSheet.create({})