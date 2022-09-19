import {View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect, useMemo} from 'react';
import {Colors, Fonts} from '../../../constants';
import {whiteLabel} from '../../../constants/Colors';
import {AppText} from '../../../components/common/AppText';
import SvgIcon from '../../SvgIcon';

import {style} from '../../../constants/Styles';
import SingleSelectList from './components/SingleSelectList';

export default function ExpandableSingleSelect(props) {
  const {
    header,
    hasError,
    checkedValue,
    items,
    onItemSelected,
    renderDropdownItem,
    idFieldName,
    labelFieldName = 'label',
  } = props;
  const [isShown, setIsShown] = useState(false);
  const selectedItem = useMemo(() => {
    if (!items) return null;
    if (items) {
      return items.find(x => x[idFieldName] == checkedValue);
    }
  });
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
                {!(selectedItem && selectedItem != undefined) && (
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
                )}
                {selectedItem && selectedItem != undefined && (
                  <AppText
                    title={
                      selectedItem != null ? selectedItem[labelFieldName] : ''
                    }
                    size="medium"
                    color={Colors.mainText}></AppText>
                )}
              </View>
            </View>

            <View style={{marginRight: 10}}>
              <SvgIcon icon={'Drop_Down'} width="23px" height="23px" />
            </View>
          </TouchableOpacity>
        )}

        {isShown && (
          <SingleSelectList
            items={items}
            idFieldName={idFieldName}
            checkedValue={checkedValue}
            onItemAction={({type, item, value}) => {
              onItemSelected(item);
              setIsShown(!isShown);
            }}
            renderItem={renderDropdownItem}
          />
        )}
      </View>
    </View>
  );
}
