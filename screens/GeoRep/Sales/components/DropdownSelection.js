import { StyleSheet, Text, View , TouchableOpacity} from 'react-native'
import React , { useEffect, useState } from 'react'
import { Colors, Fonts } from '../../../../constants'
import { whiteLabel } from '../../../../constants/Colors'
import { AppText } from '../../../../components/common/AppText'
import SvgIcon from '../../../../components/SvgIcon'
import { boxShadow, style } from '../../../../constants/Styles'

const DropdownSelection = (props) => {

	const { title , items, selectedItem , selectedCurrency } = props;
	const [ isExpanded, setIsExpanded] = useState(false);

	useEffect(() => {		
		if(selectedCurrency != undefined){
			setIsExpanded(false)
		}
	}, [selectedCurrency])

	return (
		
			<View style={styles.refreshBox}>
				<View
					style={[style.card, boxShadow , {flexDirection:'column'}]}
					>

					<TouchableOpacity 
						onPress={() => {		
							setIsExpanded(!isExpanded)		
						}}
						style={{flexDirection:'row', alignItems:'center'}}>
						<Text style={styles.shadowBoxText}>{title}</Text>

						<View style={{ flex:1, marginLeft: 10, marginRight: 10 }}>					
							{
								selectedItem != '' &&
								<View style={styles.button}>
									<AppText title={selectedItem} ></AppText>
								</View>
							}
							
						</View>

						<SvgIcon icon={isExpanded ? 'Drop_Up' : "Drop_Down"} width="23px" height="23px" />
					</TouchableOpacity>
					
					{
						isExpanded && 
						<View style={{marginTop:10,alignSelf:'stretch'}}>	
							{props.children}
						</View>						
					}

				</View>  

				
				
			</View>
		
	)

}

export default DropdownSelection

const styles = StyleSheet.create({

	refreshBox: {		
		alignSelf:'stretch',
		flexDirection: 'column',
		alignItems: 'center',
		marginBottom: 0,
	},

	shadowBoxText: {
		fontSize: 13,
		color: Colors.textColor,
		fontFamily: Fonts.secondaryMedium,
		marginRight:10
	},

	button: {		
		backgroundColor: whiteLabel().itemSelectedBackground + '31',
		paddingTop: 5,
		paddingBottom: 5,
		paddingLeft: 5,
		paddingRight: 5,
		minWidth: 60,
		textAlign: 'center',
		borderRadius: 7,
		alignItems:'center'
	},


})