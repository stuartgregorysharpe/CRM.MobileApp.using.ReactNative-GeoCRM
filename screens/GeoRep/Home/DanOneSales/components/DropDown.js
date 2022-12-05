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

const Dropdown = ({ label, data, onSelect }) => {
    const DropdownButton = useRef();
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(undefined);
    const [dropdownTop, setDropdownTop] = useState(0);
    const [dropdownLeft, setDropdownLeft] = useState(0);
    const [dropdownWidth, setDropDownWidth] = useState(0);

    const toggleDropdown = () => {
        visible ? setVisible(false) : openDropdown();
    };

    const openDropdown = () => {
        DropdownButton.current.measure((_fx, _fy, w, h, px, py) => {
            setDropdownTop(py + h - 20);
            setDropdownLeft(px);
            setDropDownWidth(w);
        });
        setVisible(true);
    };

    const onItemPress = (item) => {
        setSelected(item);
        onSelect(item);
        setVisible(false);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
            <AppText
                type="secondaryMedium"
                title={item.label}
                color={whiteLabel().mainText}
                style={{ fontSize: 12 }}></AppText>
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
        backgroundColor: PRIMARY_COLOR,
        height: 45,
        zIndex: 1,
        borderRadius: 7
    },
    buttonText: {
        flex: 1,
        color: whiteLabel().actionFullButtonText,
        textAlign: 'center',
        fontSize: 12
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
        backgroundColor: '#00000055'
    },
    item: {
        paddingVertical: 10,
        alignItems: 'center',
        borderWidth: 1, borderColor: PRIMARY_COLOR,
    },
});

export default Dropdown;