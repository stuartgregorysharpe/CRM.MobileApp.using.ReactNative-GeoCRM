import { View, Text, Image, Dimensions ,ScrollView , FlatList, TouchableOpacity} from 'react-native'
import React , { useEffect , useRef , useState } from 'react'
import Images from '../../../constants/Images';
import { style } from '../../../constants/Styles';
import SetupFieldModal from './modal/SetupFieldModal';
import { Constants, Strings } from '../../../constants';
import ProductGroupModal from './modal/ProductGroupModal';
import GetRequestProductsList from '../../../DAO/sales/GetRequestProductsList';
import { useDispatch } from 'react-redux';
import { expireToken } from '../../../constants/Helper';
import ProductItem from '../../../components/shared/PosCapture/components/ProductItem';
import ProductGroupItem from './components/items/ProductGroupItem';

export default function ProductSales(props) {

	const setupFieldModalRef = useRef(null);
	const productGroupModalRef = useRef(null);
	const navigation = props.navigation;
	const [selectedGroupTitle , setSelectedGroupTitle] = useState("");
	const [settings, setSettings] = useState(null);
	const [items, setItems] = useState([]);
	const dispatch = useDispatch()

	useEffect(() => {
		setupFieldModalRef.current.showModal();				
	},[]);

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			setupFieldModalRef.current.showModal();
		});    
		return unsubscribe;
	}, [navigation]);

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

	const onSetupFieldModalClosed = ({ type, value}) => {
		if(type === Constants.actionType.ACTION_CLOSE){		
			setupFieldModalRef.current.hideModal();			
			getProductLists(value);
		}
	}
		
	const getProductLists = (data , search_text) => {
		
		const param = {
			page_no: 1,
			transaction_type: data.transaction_type,
			currency_id: data.currency_id ? data.currency_id.id : '',
			warehouse_id : data.warehouse_id ? data.warehouse_id[0].id : '',
			search_text: search_text,
			filters: ''			
		}
		GetRequestProductsList.find(param).then((res) => {
			if(res.status == Strings.Success){
				setSettings(res.settins);
				setItems(res.items);
			}
		}).catch((e) => {
			expireToken(dispatch, e);
		})
	}

	const renderItem = (item, index) => {
		if(item.count  === 1){
			return (
				<ProductItem key={index} item={item} />
			)
		}
		if(item.count > 1){
			return (
				<ProductGroupItem key={index} item={item} />
			)
		}
	}

	return (
		<View style={{paddingTop:20}}>

			<SetupFieldModal 
				title="Define Setup"
				hideClear
				backButtonDisabled={true}
				closableWithOutsideTouch={false}
				ref={setupFieldModalRef}
				hideDivider={true}
				modalType={Constants.modalType.MODAL_TYPE_CENTER}
				onButtonAction={onSetupFieldModalClosed}
			/>

			<ProductGroupModal 
				title={selectedGroupTitle}
				hideClear
				backButtonDisabled={true}
				closableWithOutsideTouch={false}
				ref={productGroupModalRef}
				hideDivider={true}
				modalType={Constants.modalType.MODAL_TYPE_CENTER}
				onButtonAction={onSetupFieldModalClosed}
			/>

			<FlatList
                    data={items}
                    renderItem={({item, index}) => renderItem(item, index)}
                    keyExtractor={(item, index) => index.toString()}
                    extraData={this.props}
                />
			
		</View>
	)
}