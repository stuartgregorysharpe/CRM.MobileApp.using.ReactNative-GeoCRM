import { View, Text, Image, Dimensions ,ScrollView , FlatList, TouchableOpacity} from 'react-native'
import React , { useEffect , useRef , useState , useCallback } from 'react'
import { style } from '../../../constants/Styles';
import { Constants, Strings } from '../../../constants';
import GetRequestProductsList from '../../../DAO/sales/GetRequestProductsList';
import { useDispatch } from 'react-redux';
import { expireToken } from '../../../constants/Helper';
import ProductSalesContainer from './containers/ProductSalesContainer';
import { getJsonData, storeJsonData } from '../../../constants/Storage';


export default function ProductSales(props) {

	const [settings, setSettings] = useState(null);
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [page, setPage] = useState(0);	
	
	const dispatch = useDispatch()	
	useEffect(() => {
		if (props.screenProps) {
		props.screenProps.setOptions({
			headerTitle: () => {
			return (
				<TouchableOpacity
					onPress={() => {
						
					}}>
					<View style={style.headerTitleContainerStyle}>				
						<Text style={style.headerTitle}>Sales</Text>
					</View>
				</TouchableOpacity>
			);
			},
		});
		}
	});

	const getParamData = (data) => {
		var postParam = {
			page_no: 0,
			transaction_type: data.transaction_type,
			currency_id: data.currency_id ? data.currency_id.id : '',
			warehouse_id : data.warehouse_id ? data.warehouse_id.map(item => item.id).join(',')  : '',			
			filters: '',			
		}
		return postParam;
	}
		
	const getProductLists = async(data , search_text , pageNumber) => {		
		if(data != undefined){			
			storeJsonData("@setup", data);
			const param = getParamData(data);
			await storeJsonData("@sale_product_parameter", param);
			getApiData('', 0);
		}		
	}

	const getProductListsByFilter = async (data) => {
		var paramData = await getJsonData("@sale_product_parameter");
		paramData["filters"] = data;
		await storeJsonData("@sale_product_parameter", paramData);		
		getApiData('' , 0);
	}

	const getApiData = async (search_text, pageNumber) => {

		setIsLoading(true);
		var paramData = await getJsonData("@sale_product_parameter");				
		if(paramData != null){				
			paramData["page_no"] = pageNumber;
			if(search_text != ''){
				paramData["search_text"] = search_text;
			}
			storeJsonData("@sale_product_parameter", paramData);			
			GetRequestProductsList.find(paramData).then((res) => {
				if(res.status == Strings.Success){
					setSettings(res.settings);				
					if(pageNumber == 0){
						setItems(res.items);
					}else{
						setItems([...items, ...res.items]);
					}				
					setPage(pageNumber + 1);
					//console.log("api response" , JSON.stringify(res));
				}
				setIsLoading(false)
			}).catch((e) => {
				expireToken(dispatch, e);
				setIsLoading(false)
			})

		}		
		
	}

	return (
		<View style={{paddingTop:20, alignSelf:'stretch', flex:1}}>			

			<ProductSalesContainer 
				getProductLists={getProductLists}
				getProductListsByFilter={getProductListsByFilter}
				items={items}
				settings={settings}
				page={page}
				isLoading={isLoading}
				loadMoreData={(pageNumber , searchText) => {
					console.log("load more api ", pageNumber, searchText)
					getApiData( searchText , pageNumber);
				}}
				{...props}
				/>
			
		</View>
	)
}  