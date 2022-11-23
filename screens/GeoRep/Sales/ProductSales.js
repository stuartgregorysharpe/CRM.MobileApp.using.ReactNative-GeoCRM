import { View, Text, Image, Dimensions ,ScrollView , BackHandler, TouchableOpacity} from 'react-native'
import React , { useEffect , useRef } from 'react'
import Images from '../../../constants/Images';
import { style } from '../../../constants/Styles';
import SetupFieldModal from './modal/SetupFieldModal';
import { Constants } from '../../../constants';

export default function ProductSales(props) {

	const setupFieldModalRef = useRef(null);
	const navigation = props.navigation;

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
			setupFieldModalRef.current.hideModal()
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

			<Image        
				style={{width: Dimensions.get("window").width, height:Dimensions.get("window").width * 1.65 }}
				source={Images.tmpSale}
			/>
			
		</View>
	)
}