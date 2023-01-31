import React, {useState ,useEffect} from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import SvgIcon from './SvgIcon';
import {boxShadow} from '../constants/Styles';
import Colors, {whiteLabel} from '../constants/Colors';

const SearchBar = props => {
  const {
    isFilter,
    isScan,
    animation,
    initVal,
    isLoading,
    haveFilter,
    placeholder,
    onSearchBoxPress,
  } = props;

  const [text, setText] = useState(initVal);

  useEffect(() => {
    setText(initVal)
  }, [initVal]);

  const onSearch = text => {
    if (props.onSearch) {
      props.onSearch(text);
    }
  };
  const onSuffixButtonPress = () => {
    if (animation) {
      animation();
    }
    if (props.onSuffixButtonPress) {
      props.onSuffixButtonPress();
    }
  };
  const isShowCloseButton = !isFilter && text != '' && text != undefined;
  const suffixButtonIcon = props.suffixButtonIcon || 'Filter';
  const disabledSuffixButtonIcon =
    props.disabledSuffixButtonIcon || 'Filter_GRAY';

  const renderTextInput = () => {
    if (onSearchBoxPress) {
      return (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            onSearchBoxPress();
          }}>
          <View pointerEvents="none">
            <TextInput
              style={[styles.searchInput, boxShadow]}
              placeholder={placeholder ? placeholder : "Search....."}
              placeholderTextColor={whiteLabel().helpText}
            />
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <TextInput
        style={[styles.searchInput, boxShadow]}
        placeholderTextColor={whiteLabel().helpText}
        placeholder={placeholder ? placeholder : "Search....."}
        value={text}
        onChangeText={text => {
          setText(text);
          onSearch(text);
        }}
      />
    );
  };
  return (
    <View
      style={[styles.searchBox, props.style]}
      keyboardShouldPersistTaps="handled">
      {renderTextInput()}
      <FontAwesomeIcon
        style={styles.searchIcon}
        size={16}
        color={whiteLabel().inactiveIcon}
        icon={faSearch}
      />

      {
        isScan && (
          <TouchableOpacity  
            onPress={() => {
              if(props.onScan){
                props.onScan();
              }
            }}
            style={styles.scanImageButton}>
              {
                !isLoading && <SvgIcon icon={"Scan_Icon"} width="30px" height="30px" />
              }
			        {
                isLoading && <SvgIcon icon={"Scan_Icon_Gray"} width="30px" height="30px" />
              }            
          </TouchableOpacity>
        )
      }
      {isFilter && (
        <TouchableOpacity
          style={styles.filterImageButton}
          onPress={onSuffixButtonPress}>
          {!isLoading && (
            <SvgIcon icon={suffixButtonIcon} width="30px" height="30px" />
          )}
          {isLoading && (
            <SvgIcon
              icon={disabledSuffixButtonIcon}
              width="30px"
              height="30px"
            />
          )}
          {haveFilter && (
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: Colors.redColor,
                borderRadius: 10,
                position: 'absolute',
                left: -8,
                top: -8,
              }}></View>
          )}
        </TouchableOpacity>
      )}
      {isShowCloseButton && (
        <TouchableOpacity
          style={styles.closeButtonStyle}
          onPress={() => {
            setText('');
            onSearch('');
          }}>
          <SvgIcon icon="Close" width="20px" height="20px" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBox: {
    position: 'relative',
    padding: 10,
  },
  searchInput: {
    paddingLeft: 36,
    paddingRight: 50,
    color: '#5d5d5d',
    fontSize: 12,
    backgroundColor: '#fff',
    borderRadius: 7,
    fontFamily: 'Gilroy-Medium',
    height: 45,
  },
  searchIcon: {
    position: 'absolute',
    top: 24,
    left: 20,
    zIndex: 1,
  },

  filterImageButton: {
    position: 'absolute',
    top: 18,
    right: 20,
    zIndex: 1,
    elevation: 1,
  },

  scanImageButton: {
    position: 'absolute',
    top: 18,
    right: 60,
    zIndex: 1,
    elevation: 1,
  },

  closeButtonStyle: {
    position: 'absolute',
    top: 12,
    right: 10,
    zIndex: 1,
    elevation: 1,
    padding: 10,
  },
});

export default SearchBar;
