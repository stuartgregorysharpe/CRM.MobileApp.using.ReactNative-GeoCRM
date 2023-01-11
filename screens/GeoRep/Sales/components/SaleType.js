import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, Fonts } from '../../../../constants'
import { boxShadow, style } from '../../../../constants/Styles'
import { Button } from '../../../../components/shared/Button'

const SaleType = (props) => {

	const { transaction_types ,  selectedSaleType, onSelectedSaleType,  onWarehouseRequired } = props;

	return (
		
			<View style={styles.refreshBox}>
				<View
					style={[style.card, boxShadow]}>

					<Text style={styles.shadowBoxText}>{'Sale Type'}</Text>

					<View style={{flex:1 , paddingLeft:10, flexDirection:'row', justifyContent:'flex-start'}}>
						{
							transaction_types != null && transaction_types.options.map((item, index) => {
								return (
									<Button title={item.type} 
										key={index}
										style={styles.buttonStyle}
										selectedButtonStyle={styles.selectedButtonStyle}
										textStyle={styles.textStyle}
										onTaped={selectedSaleType != undefined && selectedSaleType.type === item.type} 
										onClick={()=>{											
											onSelectedSaleType(item);							
											onWarehouseRequired(item.warehouse_required);
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