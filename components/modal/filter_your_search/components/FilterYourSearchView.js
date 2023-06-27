import { StyleSheet, ScrollView } from 'react-native'
import React , { useState  } from 'react'
import { DatetimePickerView } from '../../../DatetimePickerView';
import {Button, Portal } from 'react-native-paper';
import FilterButton from '../../../FilterButton';
import { useSelector } from 'react-redux';
import { Colors, Fonts } from '../../../../constants';
import { whiteLabel } from '../../../../constants/Colors';
import FilterOptionsModal from '../../FilterOptionsModal'; 
import StartEndDateSelectionModal from '../../StartEndDateSelectionModal';
import { useDispatch } from 'react-redux';
import { MAP_FILTERS, PIPELINE_SEARCH_FILTERS, SEARCH_FILTERS } from '../../../../actions/actionTypes';

const FilterYourSearchView = (props) => {

	const { page , customFieldId , filters, options  , fieldType , locationFilters , selectedType , isStartEndDateSelection , startDate, endDate ,modaVisible } = props;

	const dispatch = useDispatch();		
	const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);	
	const [dateType, setDateType] = useState('');				
	
	const getSubTitle = key => {
		if (
		  filters.stage_id !== undefined &&
		  filters.outcome_id !== undefined &&
		  filters.customs !== undefined
		) {
		  if (locationFilters[key].filter_label === 'Pipeline') {
			
			if (filters.pipeline) {
			  var data = [...filters.pipeline];
			  if (data.length != 0) {
				return data.length + ' Selected';
			  }
			}
		  } else if (locationFilters[key].filter_label === 'Stage') {
			if (filters.stage_id) {
			  var data = [...filters.stage_id];
			  if (data.length != 0) {
				return data.length + ' Selected';
			  }
			}
		  } else if (locationFilters[key].filter_label === 'Outcome') {
			if (filters.outcome_id) {
			  var data = [...filters.outcome_id];
			  if (data.length != 0) {
				return data.length + ' Selected';
			  }
			}
		  } else if (locationFilters[key].filter_label === 'Opportunity Status') {
			if (filters.opportunity_status_id) {
			  var data = [...filters.opportunity_status_id];
			  if (data.length != 0) {
				return data.length + ' Selected';
			  }
			}
		  } else if (locationFilters[key].disposition_field_id !== undefined) {
			if (filters.dispositions) {
			  var data = [...filters.dispositions];
			  if (data.length != 0) {
				return data.length + ' Selected';
			  }
			}
		  } else if (locationFilters[key].opportunity_field_id !== undefined) {
			if (filters.opportunity_fields) {
			  var data = [...filters.opportunity_fields];
			  if (data.length != 0) {
				return data.length + ' Selected';
			  }
			}
		  } else if (locationFilters[key].custom_field_id !== undefined) {
			if (filters.customs) {
			  var data = [...filters.customs];
			  var flag = false;
			  data.forEach((element, index) => {
				if (
				  element.custom_field_id === locationFilters[key].custom_field_id
				) {
				  flag = true;
				}
			  });
			  if (flag) {
				return '1 Selected';
			  }			  
			}
		  }
		}
	  };

	return (
		
		<ScrollView style={styles.container}>      
		
			<DatetimePickerView
				visible={isDateTimePickerVisible}
				value={''}
				onModalClose={() => {
				setIsDateTimePickerVisible(true);
				}}
				close={value => {				
					if(props.handleScheduleDate){
						props.handleScheduleDate(value.replace('/', '-').replace('/', '-'));	
					}				
				}}>					
			</DatetimePickerView>

						
			{locationFilters.map((locationFilter, key) => (
				
				<FilterButton
					text={locationFilter.filter_label}
					key={key}
					subText={getSubTitle(key)}
					startDate={props.getStartDate(key)}
					endDate={props.getEndDate(key)}
					onPress={() => {						
						if (locationFilter.field_type === 'dropdown') {
							if(props.initializeSelectedType)
								props.initializeSelectedType(key);
							if(props.selectFilter){
								console.log("select filter", locationFilter, key)
								props.selectFilter(key , locationFilter.custom_field_id);
							}
								
						} else {
							if(props.initializeSelectedType){
								props.initializeSelectedType(key);
							}								
							if(props.changeStartEndDate){
								props.changeStartEndDate(true);
							}							
						}
					}}
				/>
			))}
			
			<Button
				mode="contained"
				color={whiteLabel().actionFullButtonBackground}
				uppercase={false}
				labelStyle={{
				fontSize: 18,
				fontFamily: Fonts.secondaryBold,
				letterSpacing: 0.2,
				color: whiteLabel().actionFullButtonText,
				}}
				onPress={() => {
					console.log('apply filter list', filters);
					var cloneFilters = {...filters};
					if (page == 'map') {
						dispatch({type: MAP_FILTERS, payload: cloneFilters});
					} else if (page == 'search') {
						dispatch({type: SEARCH_FILTERS, payload: cloneFilters});
					} else if (page == 'pipeline') {
						dispatch({type: PIPELINE_SEARCH_FILTERS, payload: cloneFilters});
					}
					if (props.onClose) {
						props.onClose();
					}
				}}>
				Apply Filters
			</Button>
			
			<FilterOptionsModal
				title=""
				clearTitle="Close"
				modaVisible={modaVisible}
				options={options}
				filters={filters}
				selectedType={selectedType}
				fieldType={fieldType}
				customFieldId={customFieldId}
				onClose={() => {
					if(props.hideFilterOptionModal){
						//setModalVisible(false);
						props.hideFilterOptionModal();
					}
				}}
				onValueChanged={(id, value) => {
				if (
					selectedType == 'stage' ||
					selectedType == 'outcome' ||
					selectedType == 'pipeline' ||
					selectedType == 'opportunity_status'
				) {
					if(props.saveFilter){
						props.saveFilter(id, value);
					}					
				} else {
					if(props.saveFilter){
						props.saveFilter(id, value);
					}					
				}
				}}>					
			</FilterOptionsModal>

			<Portal>				
				<StartEndDateSelectionModal
					visible={isStartEndDateSelection}
					startDate={startDate}
					endDate={endDate}
					openDatePicker={type => {
						setIsDateTimePickerVisible(true);
						setDateType(type);
					}}
					onModalClose={() => {
						if(props.changeStartEndDate){
							props.changeStartEndDate(false);
						}						
					}}>					
				</StartEndDateSelectionModal>
			</Portal>
		</ScrollView>

	)
}

export default FilterYourSearchView

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.bgColor,
		padding: 10,
		alignSelf: 'stretch',
	},

})