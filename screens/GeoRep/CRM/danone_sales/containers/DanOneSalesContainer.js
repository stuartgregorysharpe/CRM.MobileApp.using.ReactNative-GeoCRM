import React, { useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import CTabSelector from '../../../../../components/common/CTabSelector';
import { boxShadow, style } from '../../../../../constants/Styles';
import SalesCategoriesScreen from '../categories/SalesCategoriesScreen';
import SalesOverallScreen from '../overall/SalesOverallScreen';

const DanOneSalesContainer = props => {
    const { locationId } = props;
    const [tabIndex, setTabIndex] = useState(0);
    const tabs = [
        { title: 'Overall', id: 0 },
        { title: 'Categories', id: 1 },
    ];

    return (
        <View style={[styles.container, props.style]}>
            <View style={{ marginTop: 10, marginHorizontal: 10 }}>
                <CTabSelector
                    items={tabs}
                    selectedIndex={tabIndex}
                    onSelectTab={(item, index) => {
                        setTabIndex(index);
                    }}
                    containerStyle={[
                        boxShadow,
                        {
                            height: 40,
                            backgroundColor: 'white',
                            borderRadius: 4,
                        },
                    ]}
                />
            </View>
            {tabIndex === 0 && <SalesOverallScreen {...props} />}
            {tabIndex === 1 && <SalesCategoriesScreen {...props} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        flex: 1,
    },
});

export default DanOneSalesContainer;
