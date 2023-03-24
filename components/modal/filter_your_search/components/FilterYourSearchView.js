import { StyleSheet, Text, View , ScrollView , TouchableOpacity } from 'react-native'
import React from 'react'

const FilterYourSearchView = () => {

    
  return (
    
    <ScrollView style={styles.container}>
      {isShowDivider && (
        <TouchableOpacity
          style={{padding: 6}}
          onPress={() => dispatch({type: SLIDE_STATUS, payload: false})}>
          <Divider />
        </TouchableOpacity>
      )}

      <DatetimePickerView
        visible={isDateTimePickerVisible}
        value={''}
        onModalClose={() => {
          setIsDateTimePickerVisible(true);
        }}
        close={value => {
          console.log('dd', value);
          handleScheduleDate(value.replace('/', '-').replace('/', '-'));
        }}></DatetimePickerView>

      <View style={styles.sliderHeader}>
        <Title style={{fontFamily: Fonts.primaryBold}}>
          Filter your search
        </Title>
        <Button
          labelStyle={{
            fontFamily: Fonts.primaryRegular,
            letterSpacing: 0.2,
          }}
          color={Colors.selectedRedColor}
          uppercase={false}
          onPress={async () => {
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
            if (page == 'pipeline') {
              await clearFilterData('@pipeline_filter');
            } else {
              await clearFilterData('@filter');
            }

            if (page == 'map') {
              dispatch({type: MAP_FILTERS, payload: value});
            } else if (page == 'search') {
              dispatch({type: SEARCH_FILTERS, payload: value});
            } else if (page == 'pipeline') {
              dispatch({type: PIPELINE_SEARCH_FILTERS, payload: value});
            }
          }}>
          Clear Filters
        </Button>
      </View>

      {locationFilters.map((locationFilter, key) => (
        <FilterButton
          text={locationFilter.filter_label}
          key={key}
          subText={getSubTitle(key)}
          startDate={getStartDate(key)}
          endDate={getEndDate(key)}
          onPress={() => {
            console.log('locationFilter', locationFilter);
            if (locationFilter.field_type === 'dropdown') {
              initializeSelectedType(key);
              selectFilter(key);
            } else {
              initializeSelectedType(key);
              setIsStartEndDateSelection(true);
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
          console.log('apply filters', filters);
          var cloneFilters = {...filters};
          if (page == 'map') {
            dispatch({type: MAP_FILTERS, payload: cloneFilters});
          } else if (page == 'search') {
            dispatch({type: SEARCH_FILTERS, payload: cloneFilters});
          } else if (page == 'pipeline') {
            dispatch({type: PIPELINE_SEARCH_FILTERS, payload: cloneFilters});
          }
          if (onClose) {
            onClose();
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
        onClose={() => {
          setModalVisible(false);
        }}
        onValueChanged={(id, value) => {
          if (
            selectedType == 'stage' ||
            selectedType == 'outcome' ||
            selectedType == 'pipeline' ||
            selectedType == 'opportunity_status'
          ) {
            saveFilter(id, value);
          } else {
            console.log('save filter', id);
            console.log('save filter', value);
            saveFilter(id, value);
          }
        }}></FilterOptionsModal>

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
            setIsStartEndDateSelection(false);
          }}></StartEndDateSelectionModal>
      </Portal>
    </ScrollView>


  )
}

export default FilterYourSearchView

const styles = StyleSheet.create({})