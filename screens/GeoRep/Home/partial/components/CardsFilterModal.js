import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { getApiRequest } from '../../../../../actions/api.action';
import CModal from '../../../../../components/common/CModal';
import FilterButton from '../../../../../components/FilterButton';
import { Constants, Fonts } from '../../../../../constants';
import { BG_COLOR, whiteLabel } from '../../../../../constants/Colors';
import { isKeyExistInObject } from '../../../../../constants/Utils';
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
            if (isKeyExistInObject(response.filters, 'region'))
                data.push(response.filters.region);
            if (isKeyExistInObject(response.filters, 'group'))
                data.push(response.filters.group);
            if (isKeyExistInObject(response.filters, 'manager'))
                data.push(response.filters.manager);
            if (isKeyExistInObject(response.filters, 'user'))
                data.push(response.filters.user);
            setFilterOptions(data);
        }).catch(e => {
            setIsLoading(false);
        });
    }

    const onButtonAction = data => {
        if (props.onButtonAction) {
            props.onButtonAction(data);
        }
        if (ref) {
            ref.current.hideModal();
        }
    };

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
                onButtonAction([]);
            }}
            {...props}>
            <View style={{ alignSelf: 'stretch', flex: 1, marginHorizontal: 10, marginBottom: 10,marginTop:20 }}>
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
        backgroundColor: BG_COLOR,
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