import React, { useRef, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    Modal,
    View,
} from 'react-native';
import { AppText } from '../../../../../components/common/AppText';
import SvgIcon from '../../../../../components/SvgIcon';
import Colors, { PRIMARY_COLOR, whiteLabel } from '../../../../../constants/Colors';

const Dropdown = ({ label, data, onSelect, initial }) => {
    const DropdownButton = useRef();
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(initial ? initial : undefined);
    const [dropdownTop, setDropdownTop] = useState(0);
    const [dropdownLeft, setDropdownLeft] = useState(0);
    const [dropdownWidth, setDropDownWidth] = useState(0);

    const toggleDropdown = () => {
        visible ? setVisible(false) : openDropdown();
    };

    const openDropdown = () => {
        DropdownButton.current.measure((_fx, _fy, w, h, px, py) => {
            setDropdownTop(py - h);
            setDropdownLeft(px);
            setDropDownWidth(w);
        });
        setVisible(true);
    };

    const itemMoveToTop = (selectedItem) => {
        data = data.filter(item => item.value !== selectedItem.value);
        data.unshift(selectedItem);
    }

    const onItemPress = (item) => {
        setSelected(item);
        itemMoveToTop(item);
        onSelect(item, data);
        setVisible(false);
    };

    const renderItem = ({ item, index }) => (
        console.log(item),
        <TouchableOpacity style={[styles.item, {
            backgroundColor: selected && selected.value === item.value ? PRIMARY_COLOR : Colors.whiteColor,
            borderRadius: index == 0 || index === data.length - 1 ? 4 : 0,
            // borderTopLeftRadius:
            borderBottomWidth: selected && selected.value === item.value ? 0 : 1,
        }]}
            onPress={() => onItemPress(item)}>
            <AppText
                type="secondaryBold"
                title={item.label}
                color={selected && selected.value === item.value ? Colors.whiteColor : whiteLabel().mainText}
                style={{ fontSize: 12 }}></AppText>

            {index == 0 ?
                <SvgIcon
                    color={whiteLabel().actionFullButtonIcon}
                    icon={'Bottom_Arrow'}
                    width="30"
                    height="30"
                /> : <View style={{ width: 30, height: 30 }}></View>}
        </TouchableOpacity>
    );

    const renderDropdown = () => {
        return (
            <Modal visible={visible} transparent animationType="none">
                <TouchableOpacity
                    style={styles.overlay}
                    onPress={() => setVisible(false)}>
                    <View style={[styles.dropdown, { top: dropdownTop, left: dropdownLeft, width: dropdownWidth }]}>
                        <FlatList
                            style={{ borderRadius: 5, borderWidth: 1 }}
                            data={data}
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
            {renderDropdown()}
            <AppText
                type="secondaryBold"
                title={(selected && selected.label) || label}
                color={whiteLabel().mainText}
                style={styles.buttonText}></AppText>

            <SvgIcon
                color={whiteLabel().actionFullButtonIcon}
                icon={'Bottom_Arrow'}
                width="30"
                height="30"
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: PRIMARY_COLOR,
        zIndex: 1,
        borderRadius: 7
    },
    buttonText: {
        color: whiteLabel().actionFullButtonText,
        textAlign: 'center',
        fontSize: 12,
    },
    dropdown: {
        position: 'absolute',
        backgroundColor: Colors.whiteColor,
        shadowColor: Colors.blackColor,
        shadowRadius: 4,
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.5,
        borderWidth: 1,
        borderColor: PRIMARY_COLOR,
        borderRadius: 7
    },
    overlay: {
        width: '100%',
        height: '100%',
        backgroundColor: '#00000055',
    },
    item: {
        flexDirection: 'row',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Dropdown;