import React, { useEffect, useRef, useState } from 'react';
import {
    FlatList,
    StyleSheet,    
    TouchableOpacity,
    Modal,
    View,
    Dimensions,
} from 'react-native';
import { AppText } from '../../../../../components/common/AppText';
import SvgIcon from '../../../../../components/SvgIcon';
import Colors, { whiteLabel } from '../../../../../constants/Colors';

const Dropdown = ({ label, onSelect, initial }) => {
    
    const DropdownButton = useRef();
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(undefined);
    const [dropdownTop, setDropdownTop] = useState(0);
    const [dropdownLeft, setDropdownLeft] = useState(0);
    const [dropdownWidth, setDropDownWidth] = useState(0);

    const [pickerData, setPickerData] = useState([
        {
            label: 'MTD',
            value: 'MTD'
        },
        {
            label: 'QTD',
            value: 'QTD'
        }, {
            label: 'YTD',
            value: 'YTD'
        }

    ]);

    useEffect(() => {
        setSelected(pickerData[0]);
    }, []);

    const toggleDropdown = () => {
        visible ? setVisible(false) : openDropdown();
    };

    const openDropdown = () => {
        DropdownButton.current.measure((_fx, _fy, w, h, px, py) => {
            console.log(px + " : ", py);
            setDropdownTop(py - h);
            setDropdownLeft(px);
            setDropDownWidth(w);
        });
        setVisible(true);
    };

    const itemMoveToTop = (selectedItem) => {
        let data = pickerData.filter(item => item.value !== selectedItem.value);
        data.unshift(selectedItem);
        setPickerData(data);
    }

    const onItemPress = (item) => {
        setSelected(item);
        itemMoveToTop(item);
        onSelect(item);
        setVisible(false);
    };

    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            onPress={() => onItemPress(item)}>
            <View style={[styles.item, {
                backgroundColor: selected && selected.value === item.value ? Colors.primaryColor : Colors.whiteColor,
                borderColor: Colors.primaryColor,
            }]}>
                <AppText
                    type="secondaryMedium"
                    title={item.label}
                    color={selected && selected.value === item.value ? Colors.whiteColor : whiteLabel().mainText}
                    style={{ fontSize: 12,flex:1,textAlign: 'center', }}></AppText>

                {index == 0 ?
                    <SvgIcon
                        color={whiteLabel().mainText}
                        icon={'Bottom_Arrow_White'}
                        width="30"
                        height="30"
                    /> : <View style={{ width: 30, height: 30 }}></View>}
            </View>
            <View style={{ height: index == 0 || index == pickerData.length - 1 ? 0 : 1, backgroundColor: Colors.primaryColor }} />

        </TouchableOpacity>
    );

    const renderDropdown = () => {
        return (
            <Modal visible={visible} transparent animationType="none">
                <TouchableOpacity
                    style={[styles.overlay]}
                    onPress={() => setVisible(false)}>
                    <View style={[styles.dropdown, {
                        top: dropdownTop,
                        left: dropdownLeft,
                        width: dropdownWidth
                    }]}>
                        <FlatList
                            data={pickerData}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    };

    return (
        <TouchableOpacity
            ref={DropdownButton}
            style={styles.button}
            onPress={toggleDropdown}
        >

            {!visible && <View style={styles.button}>
                <AppText
                    type="secondaryMedium"
                    title={(selected && selected.label) || label}
                    color={whiteLabel().mainText}
                    style={styles.buttonText}></AppText>

                <SvgIcon
                    color={whiteLabel().actionOutlineButtonText}
                    icon={'Bottom_Arrow_White'}
                    width="27"
                    height="27"
                />
            </View>}
            {renderDropdown()}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: Colors.primaryColor,
        zIndex: 1,
        borderRadius: 7
    },
    buttonText: {
        color: whiteLabel().actionFullButtonText,
        textAlign: 'center',
        fontSize: 12,
        flex:1
    },
    dropdown: {
        position: 'absolute',
        backgroundColor: Colors.whiteColor,
        borderWidth: 1,
        borderColor: Colors.primaryColor,
        borderRadius: 8
    },
    overlay: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        backgroundColor: '#00000055',
    },
    item: {
        flexDirection: 'row',
        height: 30,
        // justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
    },
});

export default Dropdown;