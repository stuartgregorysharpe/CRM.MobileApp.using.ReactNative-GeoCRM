import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React , {useState ,useEffect} from 'react'
import DropdownSelection from './DropdownSelection'
import SaleType from './SaleType'
import SearchLocationContainer from '../../Stock/stock/container/SearchLocationContainer'
import LocationInfo from './LocationInfo'
import { useSelector } from 'react-redux'
import { getJsonData, getLocalData, storeJsonData } from '../../../../constants/Storage'
import { getLocationInfo } from '../../../../sqlite/DBHelper'
import CurrencyType from './CurrencyType'
import Warehouse from './Warehouse'
import { AppText } from '../../../../components/common/AppText'
import { Colors, Fonts, Values } from '../../../../constants'
import { whiteLabel } from '../../../../constants/Colors'

const SetupFieldView = (props) => {

	const { isClear, isLoading,  transaction_types, currency, warehouse} = props;
	const features = useSelector(
		state => state.selection.payload.user_scopes.geo_rep.features,
	);
	const [isSearchStart, setIsSearchStart] = useState(false)
	const [selectedLocation ,setSelectedLocation] = useState(null)
	const [selectedSaleType, setSelectedSaleType] = useState(null);
	const [selectedCurrency , setSelectedCurrency] = useState(null)
	const [warehouseRequired, setWarehouseRequired] = useState(false)
	const [selectedWarehouse, setSelectedWarehouse] = useState([])	
	const isCheckin = useSelector(state => state.location.checkIn);

	useEffect(() => {
		initializeLocation();
	}, [isCheckin]);

	useEffect(() => {
		if(isClear){
			clearSetup();
			if(props.updateClear){
				props.updateClear(false)
			}
		}
	}, [isClear]);

	useEffect(() => {		
		initializeSetupData();
	}, [ currency, warehouse,   transaction_types]);

	const clearSetup = async() => {
		console.log("clear upset")
		storeJsonData("@setup", null);
		initializeSetupData();
		initializeLocation();
	}
	
	const getCheckinLocationInfo = async () => {
		const  locationId = await getLocalData("@specific_location_id");		
		const  locInfo = await getLocationInfo(locationId);
		console.log(locationId, locInfo)
		if(locInfo.name != ''){
			setSelectedLocation({...locInfo , location_id: locationId});
		}			
	}

	const initializeLocation = async() => {
		var data = await getJsonData("@setup");
		if(data != null){
			setSelectedLocation(data.location);	
		}else if(isCheckin){
			getCheckinLocationInfo();
		}else{
			setSelectedLocation(null)
		}
	}

	const initializeSetupData = async() => {

		var data = await getJsonData("@setup");
		if(data != null){
			
			setSelectedSaleType(data.transaction_type);
			setSelectedCurrency(data.currency_id);	
			setSelectedLocation(data.location);
			
			if(data.transaction_type != ''){
				onWarehouseRequired(data.transaction_type.warehouse_required);
			}
			if(data.warehouse_id != ''){				
				setSelectedWarehouse(data.warehouse_id);
			}

		}else{
			if(transaction_types != null && transaction_types.default_type != ''){				
				const transactionType = transaction_types.options.find(item => item.type === transaction_types.default_type);			
				setSelectedSaleType(transactionType);
				if(transactionType  != undefined){				
					onWarehouseRequired(transactionType.warehouse_required);
				}
			}
			if(currency != undefined && currency.default_currency != ''){
				const defaultCurrency = currency.options.find(item =>  item.id === currency.default_currency);
				setSelectedCurrency(defaultCurrency);
				
			}
	
			if( warehouse != undefined && warehouse.default_warehouse != ''){
				const options = warehouse.options ?  warehouse.options : [];
				const item = options.find(element => element.id === warehouse.default_warehouse);
				if(item != undefined){
					//onWarehouseItemSelected(item, false);
					setSelectedWarehouse([item]);	
				}				
			}
		}
		
	}

	const onSearch = (location, locationId) => {		
		
		setIsSearchStart(false);
		setSelectedLocation(location)
	}

	const onStartSearch = (flag) => {
		setIsSearchStart(flag)
	}

	const onCurrencyItemSelected = (item) => {				
		setSelectedCurrency(item);
	}

	const onWarehouseItemSelected = (item , isChecked) => {		
		if(item.id === 0){
			if(isChecked){
				setSelectedWarehouse([])
			}else{
				setSelectedWarehouse([{id:0, label: 'all'} , ...warehouse.options]);
			}
		}else{
			if(isChecked){
				const tmp = selectedWarehouse.filter(element => element.id != item.id && element.id != 0);
				setSelectedWarehouse(tmp)				
			}else{
				setSelectedWarehouse([...selectedWarehouse , item]);	
			}	
		}					
	}

	const onSelectedSaleType =(type) => {
		setSelectedSaleType(type);
	}

	const onWarehouseRequired = (required) => {		
		if(features.includes("product_multiple_warehouse")){
			setWarehouseRequired(required === "1" ? true: false);
		}		
	}

	const renderWarehouseTitle = () => {
		const allSelected = selectedWarehouse.find(item => item.id == 0);
		if(allSelected  != undefined){
			return "ALL SELECTED"
		}
		if(selectedWarehouse.length == 1){
			return selectedWarehouse[0].label;
		}else if(selectedWarehouse.length > 1){
			return selectedWarehouse.length + " SELECTED";
		}
		return "";
	}

	const isValidate = () => {		
				
		var flag = false;
		if(
			!isLoading &&
			selectedLocation != null &&
			selectedSaleType != null &&
			selectedCurrency != null &&
			( warehouseRequired && selectedWarehouse.length != 0 || !warehouseRequired )
			){
				flag = true;			
		}
		
		if(props.updateOutSideTouchStatus) {		
			props.updateOutSideTouchStatus(flag);
		}
		return flag;
	}

	const onContinue = () => {
		if(isValidate()){			
			props.onContinue({
				transaction_type: selectedSaleType,
				currency_id: selectedCurrency,
				warehouse_id: selectedWarehouse,
				location: selectedLocation
			})
		}
	}

	const onClear = () => {
		console.log("cc" , props)
		if (props.updateClear) {			
		  props.updateClear(true);
		}
	};

	return (
		<View style={styles.container}>

			<View
                  style={[
                    styles.titleContainer,
                    {marginTop: 5},
                  ]}>
                  <View
                    style={{
                      flex: 1,
                      marginRight: 50,
                      alignItems:
                        props.headerType === 'center' ? 'center' : 'flex-start',
                    }}>
                    {props.title && (
						<AppText title={props.title} size="big" type="secondaryBold" style={{marginBottom:5}} />                    
                    )}
                  </View>

                  {true && (
                    <TouchableOpacity
                      style={styles.clearButtonContainer}
                      onPress={onClear}>
                      <Text style={styles.clearText}>
                        {'Clear'}
                      </Text>
                    </TouchableOpacity>
                  )}                  
            </View>

			<SearchLocationContainer 
				type="setup"
				onSubmit={onSearch} 
				onStartSearch={onStartSearch}
				isSkipLocationIdCheck				
				style={[isSearchStart ? styles.bgColor : {}]} //
			{...props} />
			
			{/* <View style={{height:55}}></View> */}

			{
				selectedLocation  != null && !isSearchStart &&
				<LocationInfo 				
					onClose={()=>{
						setSelectedLocation(null)
					}}
					location={selectedLocation} /> 
			}
			
			{
				!isSearchStart && 
				<View style={{alignSelf:'stretch'}}>

					<SaleType 
						transaction_types={transaction_types} 
						selectedSaleType={selectedSaleType}
						onSelectedSaleType={onSelectedSaleType}						
						onWarehouseRequired={onWarehouseRequired}
						/>

					<DropdownSelection
						title = "Currency Type"
						selectedItem={selectedCurrency != null ? selectedCurrency.abbreviation + "(" + selectedCurrency.symbol +  ")" : ''}
						selectedCurrency={selectedCurrency}
						items={currency ? currency.options : []}
					>
						<CurrencyType
							selectedItem={selectedCurrency}
							onItemSelected={onCurrencyItemSelected}
							lists={currency ? currency.options : []}></CurrencyType>						
					</DropdownSelection>
					
					{
						warehouseRequired &&
						<DropdownSelection
							title = "Warehouse"
							selectedItem={renderWarehouseTitle()}
							items={warehouse ? warehouse.options : []}
						>
							<Warehouse 
								selectedItem={selectedWarehouse}
								onItemSelected={onWarehouseItemSelected}
								warehouse={warehouse}								
							/>
						</DropdownSelection>
					}
					
					<View style={{height:1, backgroundColor:Colors.greyColor, marginHorizontal:-10, marginTop:10, marginBottom:10}}>
					</View>

					<View style={{alignItems:'center', paddingVertical:5}}>
						<TouchableOpacity 
							style={{alignSelf:'stretch', alignItems:'center'}}
							disabled={!isValidate()}
							onPress={() => onContinue()}>
							<AppText title="Continue" size="big" color={!isValidate() ? Colors.disabledColor : Colors.primaryColor}></AppText>	
						</TouchableOpacity>						
					</View>

				</View>
			}
		</View>
	)
}

export default SetupFieldView

const styles = StyleSheet.create({
	bgColor:{
		backgroundColor:Colors.whiteColor,		
		borderRadius:5,
	},
	container:{
		marginHorizontal:10,
		marginTop:10, 
		backgroundColor:'white' ,
		minHeight:250, 
		maxHeight:400, 
		padding:10,
		borderRadius:5 ,
		alignSelf:'stretch' 
	},
	titleContainer: {
		flexDirection: 'row',
		alignSelf: 'stretch',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 5,
		paddingLeft: 5,
		paddingRight: 15,
		//paddingRight: 50,
	},
	titleIcon: {
		width: 16,
		height: 16,
		marginRight: 8,
	},
	clearText: {
		fontSize: Values.fontSize.small,
		fontFamily: Fonts.secondaryRegular,
		color: Colors.redColor,
	},
})