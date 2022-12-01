import { View, Text, Image, Dimensions ,ScrollView , FlatList, TouchableOpacity} from 'react-native'
import React , { useEffect , useRef , useState , useCallback } from 'react'
import { style } from '../../../constants/Styles';
import SetupFieldModal from './modal/SetupFieldModal';
import { Constants, Strings } from '../../../constants';
import ProductGroupModal from './modal/ProductGroupModal';
import GetRequestProductsList from '../../../DAO/sales/GetRequestProductsList';
import { useDispatch } from 'react-redux';
import { expireToken } from '../../../constants/Helper';
import ProductGroupItem from './components/items/ProductGroupItem';
import ProductItem from './components/items/ProductItem';
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
		
	const getProductLists = async(data , search_text , pageNumber) => {

		console.log("getProductLists ==== ")
		if(data != undefined){
			var postParam = {
				page_no: 0,
				transaction_type: data.transaction_type,
				currency_id: data.currency_id ? data.currency_id.id : '',
				warehouse_id : data.warehouse_id ? data.warehouse_id[0].id : '',			
				filters: '',
				location: data.location
			}
			storeJsonData("@setup", postParam);		
			getApiData('', 0);
		}		
	}

	const getProductListsByFilter = async (data) => {
		var paramData = await getJsonData("@setup");
		paramData["filters"] = data;
		storeJsonData("@setup", paramData);
		getApiData('' , 0);
	}

	const getApiData = async (search_text, pageNumber) => {

		setIsLoading(true);
		var paramData = await getJsonData("@setup");		
		paramData["page_no"] = pageNumber;
		if(search_text != ''){
			paramData["search_text"] = search_text;
		}		
		storeJsonData("@setup", paramData);

		console.log("param => ",paramData)
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