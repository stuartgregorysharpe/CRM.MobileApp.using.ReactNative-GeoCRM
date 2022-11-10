import { StyleSheet, Text, View , TouchableOpacity} from 'react-native'
import React , { useEffect, useState} from 'react'
import { Colors, Fonts } from '../../../../constants'
import { boxShadow, style } from '../../../../constants/Styles'
import { Button } from '../../../../components/shared/Button'

const SaleType = (props) => {

	const { transaction_types } = props;
	const [type , setType] = useState('');

	useEffect(() => {
		if(transaction_types != null){
			setType(transaction_types.default_type);
		}
	}, [transaction_types]);

	return (
		
			<View style={styles.refreshBox}>
				<View
					style={[style.card, boxShadow]}>

					<Text style={styles.shadowBoxText}>{'Sale Type'}</Text>

					<View style={{flex:1 , flexDirection:'row', justifyContent:'flex-end'}}>
						{
							transaction_types != null && transaction_types.options.map((item) => {
								return (
									<Button title={item.type} 
										style={styles.buttonStyle}
										selectedButtonStyle={styles.selectedButtonStyle}
										textStyle={styles.textStyle}
										onTaped={type === item.type} onClick={()=>{
											setType(item.type);
									}} />
								)								
							})
						}												

					</View>
					
				</View>          
			</View>
		
	)

}

export default SaleType

const styles = StyleSheet.create({

	refreshBox: {
		flex: 1,		
		alignSelf:'stretch',
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 0,		
	},

	shadowBoxText: {
		fontSize: 13,
		color: Colors.textColor,
		fontFamily: Fonts.secondaryMedium,
		marginRight:10
	},


	buttonStyle :{
		borderRadius:7,		
		paddingRight:13,
		paddingLeft:13,		
		marginRight:7
	},

	selectedButtonStyle :{
		borderRadius:7,		
		paddingRight:13,
		paddingLeft:13,		
		marginRight:7
	},

	textStyle:{
		fontSize:12
	}

})