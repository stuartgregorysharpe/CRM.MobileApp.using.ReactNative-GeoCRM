import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { getApiRequest } from '../../../../../actions/api.action';
import CModal from '../../../../../components/common/CModal';
import FilterButton from '../../../../../components/FilterButton';
import { Constants, Fonts } from '../../../../../constants';
import Colors, { whiteLabel } from '../../../../../constants/Colors';
import CardFilterOptionsModal from './CardFilterOptionsModal';

const CardsFilterModal = React.forwardRef((props, ref) => {
    const [filterOptions, setFilterOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState(null);
    const [modaVisible, setModalVisible] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState([]);
    useEffect(() => {
        loadFilters();
    }, []);

    const loadFilters = () => {
        setIsLoading(true);
        getApiRequest('lindtdash/filters').then(response => {
            setIsLoading(false);
            let data = [];
            console.log(response.filters);
            if (isObjectValid(response, 'region'))
                data.push(response.filters.region);

            if (isObjectValid(response, 'group'))
                data.push(response.filters.group);
            if (isObjectValid(response, 'manager'))
                data.push(response.filters.manager);
            if (isObjectValid(response, 'user'))
                data.push(response.filters.user);
            setFilterOptions(data);
        }).catch(e => {
            setIsLoading(false);
        });
    }

    const isObjectValid = (response, key) => {
        let hasKey = response.filters.hasOwnProperty(key);
        console.log(response.filters[key]);
        if (!hasKey)
            return false;
        if (typeof response.filters[key] !== 'object')
            return false
        if (response.filters[key] && response.filters[key].options.length > 0) {
            return true;
        } else {
            return false
        }
    }

    const onButtonAction = data => {
        if (props.onButtonAction) {
            props.onButtonAction(data ? getFilters(data) : null);
        }
        if (ref) {
            ref.current.hideModal();
        }
    };

    const getFilters = (data) => {
        let filters = data;
        let filterObject = {};
        if (filters && filters.length > 0) {
            let userFilter = filters.filter(x => x.type === 'User');
            userFilter = Object.keys(userFilter).map(function (k) { return userFilter[k].id }).join(",");
            if (userFilter) {
                filterObject['users'] = userFilter;
            }

            let region = filters.filter(x => x.type === 'Region');
            region = Object.keys(region).map(function (k) { return region[k].label }).join(",");

            if (region) {
                filterObject['regions'] = region;
            }

            let groupFilter = filters.filter(x => x.type === 'Channel');
            groupFilter = Object.keys(groupFilter).map(function (k) { return groupFilter[k].label }).join(",");

            if (groupFilter) {
                filterObject['groups'] = groupFilter;
            }

            let mangerFilter = filters.filter(x => x.type === 'Manager');
            mangerFilter = Object.keys(mangerFilter).map(function (k) { return mangerFilter[k].id }).join(",");

            if (mangerFilter) {
                filterObject['managers'] = mangerFilter;
            }

            return filterObject
        }
        return null;
    }

    const manageFilters = (item, status, type) => {
        let _filters = [...selectedFilters];
        let canAddItem = false;
        if (_filters && _filters.length == 0) {
            canAddItem = true;
        } else {
            let index = _filters.findIndex(x => x.id && item.id ? (x.id === item.id && x.type === type)
                : (x.label === item && x.type === type));
            if (index != -1) {
                _filters.splice(index, 1);
            } else {
                canAddItem = true;
            }
        }

        if (canAddItem) {
            _filters.push({
                label: typeof item === 'object' ? item.label : item,
                id: typeof item === 'object' ? item.id : null,
                type: type
            })
        }
        setSelectedFilters(_filters);
    }

    const getSubTitle = (item) => {
        let data = selectedFilters.filter(x => x.type === item);
        return data.length > 0 ? `${data.length} Selected` : '';
    }

    return (
        <CModal
            ref={ref}
            modalType={Constants.modalType.MODAL_TYPE_BOTTOM}
            closableWithOutsideTouch
            onClear={() => {
                setSelectedFilters([]);
                onButtonAction(null);
            }}
            title={'Filters'}
            clearText={'Clear Filters'}
            {...props}>
            <View style={{ alignSelf: 'stretch', flex: 1, marginHorizontal: 10, marginBottom: 10, marginTop: 20 }}>
                {filterOptions.map((option, key) => (
                    <FilterButton
                        text={`All ${option.label}s`}
                        key={key}
                        subText={getSubTitle(option.label)}
                        startDate={undefined}
                        endDate={undefined}
                        onPress={() => {
                            setModalVisible(true);
                            setOptions(option);
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
                        onButtonAction(selectedFilters);
                    }}>
                    Apply Filters
                </Button>

                <CardFilterOptionsModal
                    title=""
                    clearTitle="Close"
                    modaVisible={modaVisible}
                    option={options}
                    filters={selectedFilters}
                    selectedType={'form_type'}
                    fieldType={'fieldType'}
                    onClose={() => {
                        setModalVisible(false);
                    }}
                    onValueChanged={(data, value, type) => {
                        manageFilters(data, value, type);
                    }}>

                </CardFilterOptionsModal>
            </View>
        </CModal>
    )
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.bgColor,
        padding: 10,
        alignSelf: 'stretch',
    },
    sliderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
});

export default CardsFilterModal;