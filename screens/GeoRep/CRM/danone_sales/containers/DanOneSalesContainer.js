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
            <View style={{ marginTop: 10, }}>
                <CTabSelector
                    hidePrevNext={true}
                    items={tabs}
                    selectedIndex={tabIndex}
                    onSelectTab={(item, index) => {
                        setTabIndex(index);
                    }}
                    containerStyle={{ height: 40, }}
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
