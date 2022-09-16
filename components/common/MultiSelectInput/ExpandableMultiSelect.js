import {View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors, Fonts} from '../../../constants';
import {whiteLabel} from '../../../constants/Colors';
import {AppText} from '../../../components/common/AppText';
import SvgIcon from '../../SvgIcon';

import {style} from '../../../constants/Styles';
import MultiSelectList from './components/MultiSelectList';

export default function ExpandableMultiSelect(props) {
  const {
    header,
    hasError,
    checkedValueList,
    items,
    onItemSelected,
    renderDropdownItem,
    idFieldName,
  } = props;
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    let isMount = true;
    if (isMount && items.length == 0) {
      setIsShown(false);
    }
    return () => {
      isMount = false;
    };
  }, [items]);

  return (
    <View>
      <AppText
        title={header}
        size="medium"
        type="secondaryBold"
        color={whiteLabel().mainText}
        style={{marginBottom: 5}}></AppText>

      <View
        style={[
          style.card,
          {
            alignItems: 'flex-start',
            flexDirection: 'column',
            borderWidth: hasError ? 1 : 0,
            borderColor: hasError ? Colors.redColor : '',
          },
        ]}>
        {!isShown && (
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => {
              if (items && items.length > 0) {
                setIsShown(!isShown);
              }
            }}>
            <View style={{flex: 1}}>
              <View style={{flexDirection: 'row'}}>
                <AppText
                  style={{flex: 1}}
                  title={'Please select'}
                  size="medium"
                  type="secondaryMedium"
                  color={
                    items && items.length > 0
                      ? Colors.blackColor
                      : Colors.disabledColor
                  }></AppText>
              </View>
            </View>

            <View style={{marginRight: 10}}>
              <SvgIcon icon={'Drop_Down'} width="23px" height="23px" />
            </View>
          </TouchableOpacity>
        )}

        {isShown && (
          <MultiSelectList
            items={items}
            idFieldName={idFieldName}
            checkedValueList={checkedValueList}
            onItemAction={({type, item, value}) => {
              onItemSelected(item);
            }}
            renderItem={renderDropdownItem}
          />
        )}
      </View>
    </View>
  );
}
