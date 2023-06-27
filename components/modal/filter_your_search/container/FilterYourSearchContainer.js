import { StyleSheet, View } from 'react-native'
import React , { useState, useEffect , useImperativeHandle} from 'react'
import FilterYourSearchView from '../components/FilterYourSearchView'
import { getFilterData, storeFilterData } from '../../../../constants/Storage';
import { useDispatch, useSelector } from 'react-redux';
import { Constants } from '../../../../constants';
import { getPipelineFilters } from '../../../../actions/pipeline.action';

const FilterYourSearchContainer = React.forwardRef((props, ref) => {

    const { page } = props;

    const dispatch = useDispatch()

    const [filters, setFilters] = useState('');
    const [options, setOptions] = useState([]);
    const [originOptions, setOriginOptions] = useState([]);
    const [fieldType, setFieldType] = useState('');
    const [locationFilters, setLocationFilters] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [customId, setCustomId] = useState('');    
    const [dispositionId, setDispositionId] = useState('');

    const [key, setKey] = useState(0);
    const [isStartEndDateSelection, setIsStartEndDateSelection] = useState(false);
    const [startDate, setStartDate] = useState('');
	  const [endDate, setEndDate] = useState('');
    const [modaVisible, setModalVisible] = useState(false);	
    const [opportunityId, setOpportunityId] = useState('');

    const originaLocationlFilterData = useSelector(
		state => state.location.locationFilters,
	);
    
    useImperativeHandle(ref, () => ({
        changeFilters: (value) => {
            setFilters(value);          
        },
    }));

    useEffect(() => {      
        loadFilterDataFromStorage();
        setLocationFilters(originaLocationlFilterData);
    }, [originaLocationlFilterData]);

    const loadFilterDataFromStorage = async () => {
        var filterData =
          page == 'pipeline'
            ? await getFilterData('@pipeline_filter')
            : await getFilterData('@filter');
        setFilters(filterData);
    };

    const handleScheduleDate = date => {
        let datetime = date;
        let time = '';
        setIsDateTimePickerVisible(false);
        if (dateType === 'start') {
            setStartDate(datetime);
        } else {
            setEndDate(datetime);
            setIsStartEndDateSelection(false);
            saveFilter(0, true);
        }
    };
    
    const saveFilter = async (value, isChecked) => {
        if (selectedType == 'stage') {
          var data = [...filters.stage_id];
          var index = data.indexOf(value);
          if (index !== -1) {
            if (!isChecked) {
              data.splice(index, 1);
            }
          } else {
            if (isChecked) {
              data.push(value);
            }
          }
          filters.stage_id = data;
        } else if (selectedType == 'outcome') {
          var data = [...filters.outcome_id];
          var index = data.indexOf(value);
          if (index !== -1) {
            if (!isChecked) {
              data.splice(index, 1);
            }
          } else {
            if (isChecked) {
              data.push(value);
            }
          }
          filters.outcome_id = data;
        } else if (selectedType == 'pipeline') {
          setModalVisible(false);
          dispatch(getPipelineFilters(value));
          filters.pipeline = value;
        } else if (selectedType == 'custom') {
          var data = [...filters.customs];
          console.log('my custom data', data);
          var flag = false;
          var indexOfCustom = -1;
          data.forEach((element, index) => {
            if (element.custom_field_id === customId) {
              flag = true;
              indexOfCustom = index;
              element.field_value = value;
            }
          });
          if (!isChecked && flag) {
            // remove
            data.splice(indexOfCustom, 1);
          }
          if (isChecked && !flag) {
            // add
            if (fieldType == 'date') {
              data.push({
                custom_field_id: customId,
                field_type: fieldType,
                start_date: startDate,
                end_date: endDate,
              });
            } else {
              data.push({
                custom_field_id: customId,
                field_type: fieldType,
                field_value: value,
              });
            }
          }
          filters.customs = data;
        } else if (selectedType == 'disposition') {
          var data = [...filters.dispositions];
          var flag = false;
          var indexOfDisposition = -1;
          data.forEach((element, index) => {
            if (element.disposition_field_id === dispositionId) {
              flag = true;
              indexOfDisposition = index;
              element.field_value = value;
            }
          });
          if (!isChecked && flag) {
            // remove
            data.splice(indexOfDisposition, 1);
          }
          if (isChecked && !flag) {
            if (fieldType == 'date') {
              data.push({
                disposition_field_id: dispositionId,
                field_type: fieldType,
                start_date: startDate,
                end_date: endDate,
              });
            } else {
              data.push({
                disposition_field_id: dispositionId,
                field_type: fieldType,
                field_value: value,
              });
            }
            console.log('data', data);
          } else {
            if (fieldType == 'date') {
              data.push({
                disposition_field_id: dispositionId,
                field_type: fieldType,
                start_date: startDate,
                end_date: endDate,
              });
            }
          }
    
          filters.dispositions = data;
        } else if (selectedType == 'opportunity') {
          var data = [...filters.opportunity_fields];
          var flag = false;
          var indexOfOpportunity = -1;
          data.forEach((element, index) => {
            if (element.opportunity_field_id === opportunityId) {
              flag = true;
              indexOfOpportunity = index;
              element.field_value = value;
            }
          });
          if (!isChecked && flag) {
            // remove
            data.splice(indexOfOpportunity, 1);
          }
          if (isChecked && !flag) {
            if (fieldType == 'date') {
              data.push({
                opportunity_field_id: opportunityId,
                field_type: fieldType,
                start_date: startDate,
                end_date: endDate,
              });
            } else {
              data.push({
                opportunity_field_id: opportunityId,
                field_type: fieldType,
                field_value: value,
              });
            }
          }
          filters.opportunity_fields = data;
        } else if (selectedType == 'opportunity_status') {
          var data = [...filters.opportunity_status_id];
          var index = data.indexOf(value);
          if (index !== -1) {
            if (!isChecked) {
              data.splice(index, 1);
            }
          } else {
            if (isChecked) {
              data.push(value);
            }
          }
          filters.opportunity_status_id = data;
        }
    
        if (filters !== undefined) {
          setFilters(filters);
          if (page == 'pipeline') {
              
            await storeFilterData('@pipeline_filter', filters);
          } else {
            await storeFilterData('@filter', filters);
          }
        }
    
        if (
          locationFilters[key] !== undefined &&
          locationFilters[key].options !== undefined
        ) {
          setOptions([]);
          setOriginOptions(locationFilters[key].options);          
          setOptions(locationFilters[key].options);
        }
    };
    

    const getStartDate = key => {
        if (filters.dispositions !== undefined) {
          if (locationFilters[key].disposition_field_id !== undefined) {
            var data = [...filters.dispositions];
            var start_date = '';
            data.forEach((element, index) => {
              if (
                element.disposition_field_id ===
                locationFilters[key].disposition_field_id
              ) {
                start_date = element.start_date;
              }
            });
            if (start_date != '') {
              return start_date;
            }
          }
        }
      };
    
      const getEndDate = key => {
        if (filters.dispositions !== undefined) {
          if (locationFilters[key].disposition_field_id !== undefined) {
            var data = [...filters.dispositions];
            var end_date = '';
            data.forEach((element, index) => {
              if (
                element.disposition_field_id ===
                locationFilters[key].disposition_field_id
              ) {
                end_date = element.end_date;
              }
            });
            if (end_date != '') {
              return end_date;
            }
          }
        }
      };

      const initializeSelectedType = key => {
        setOriginOptions(locationFilters[key].options);
        setOptions(locationFilters[key].options);
        setFieldType(locationFilters[key].field_type);
    
        if (locationFilters[key].filter_label === 'Stage') {
          setSelectedType('stage');
        } else if (locationFilters[key].filter_label === 'Outcome') {
          setSelectedType('outcome');
        } else if (locationFilters[key].filter_label === 'Pipeline') {
          setSelectedType('pipeline');
        } else if (locationFilters[key].filter_label === 'Opportunity Status') {
          setSelectedType('opportunity_status');
        } else if (locationFilters[key].disposition_field_id !== undefined) {
          setSelectedType('disposition');
          setDispositionId(locationFilters[key].disposition_field_id);
        } else if (locationFilters[key].opportunity_field_id !== undefined) {
          setSelectedType('opportunity');
          setOpportunityId(locationFilters[key].opportunity_field_id);
        } else if (locationFilters[key].custom_field_id !== undefined) {
          setSelectedType('custom');
          setCustomId(locationFilters[key].custom_field_id);
        } else {
          setSelectedType(locationFilters[key].filter_label);
        }
      };

    const selectFilter = (key , custom_field_id) => {
        setKey(key);
        if (filters.stage_id === undefined || filters.customs === undefined) {
          let value = {
              stage_id: [],
              outcome_id: [],
              dispositions: [],
              customs: [],
          };
          if (page == 'pipeline') {
              value.opportunity_status_id = [];
              value.opportunity_fields = [];
              value.campaign_id = '';
          }
          setFilters(value);
        }
        setModalVisible(true);
    };
    

      
    return (
        <View style={{alignSelf:'stretch'}}>
            <FilterYourSearchView 
                {...props}
                saveFilter={saveFilter}
                handleScheduleDate={handleScheduleDate}
                getStartDate={getStartDate}
                getEndDate={getEndDate}
                initializeSelectedType={initializeSelectedType}
                selectFilter={selectFilter}
                filters={filters}
                options={options}
                fieldType={fieldType}
                customFieldId={customId}
                locationFilters={locationFilters}
                selectedType={selectedType}
                isStartEndDateSelection={isStartEndDateSelection}
                modaVisible={modaVisible}
                hideFilterOptionModal={() =>{ 
                    setModalVisible(false)
                }}
                changeStartEndDate = {(flag) => {
                    setIsStartEndDateSelection(flag);
                }}
                onClose={() => {
                    props.onButtonAction({ type: Constants.actionType.ACTION_CLOSE });
                }}
            />
        </View>
    )
});

export default FilterYourSearchContainer

const styles = StyleSheet.create({})